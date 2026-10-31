"""Llena `Template Presupuesto.xlsx` con el presupuesto mensual del Área de Calidad.

Fuente única de datos: src/data/presupuestoData.json (la misma que muestra la página /presupuesto).
Se respetan las fórmulas del template (cargas sociales 60 %, depreciación 15 %, imprevistos 10 %);
solo se agrega la fila de contratos de soporte externo en costos administrativos y dos hojas de anexo.

Uso:  python qa-hub/scripts/build_presupuesto.py
Salida: public/docs/Presupuesto_Area_Calidad_AITECH.xlsx
"""

import json
from copy import copy
from pathlib import Path

import openpyxl
from openpyxl.styles import Alignment, Font, PatternFill

ROOT = Path(__file__).resolve().parents[2]
DATOS = json.loads((ROOT / 'src' / 'data' / 'presupuestoData.json').read_text(encoding='utf-8'))
TEMPLATE = ROOT / 'Template Presupuesto.xlsx'
SALIDA = ROOT / 'public' / 'docs' / 'Presupuesto_Area_Calidad_AITECH.xlsx'

MONEDA = '#,##0.00'


def copiar_estilo(origen, destino):
    destino.font = copy(origen.font)
    destino.fill = copy(origen.fill)
    destino.border = copy(origen.border)
    destino.alignment = copy(origen.alignment)


def llenar_bloque(ws, fila_inicial, items, etiqueta_cantidad):
    for i, it in enumerate(items):
        fila = fila_inicial + i
        nombre = it['item'] if it['cantidad'] == 1 else f"{it['item']} ({etiqueta_cantidad} {it['cantidad']})"
        ws[f'A{fila}'] = nombre
        ws[f'B{fila}'] = it['costoMes']
        ws[f'C{fila}'] = f'=B{fila}*{it["cantidad"]}'
        ws[f'B{fila}'].number_format = MONEDA
        ws[f'C{fila}'].number_format = MONEDA


def hoja_principal(wb):
    ws = wb.active
    ws.title = 'Presupuesto'
    ws['B3'] = DATOS['departamento']
    ws['A1'] = 'AITECH — Presupuesto mensual del Área de Calidad (Bs)'
    ws['A1'].font = Font(bold=True, size=13)
    ws['A6'] = 'Columna "Costo Mes" = costo unitario mensual; "Sub Total Mes" = costo unitario × cantidad.'
    ws['A6'].font = Font(italic=True, size=9, color='FF595959')

    llenar_bloque(ws, 10, DATOS['manoDeObra']['items'], '×')
    llenar_bloque(ws, 24, DATOS['equipo']['items'], '×')
    llenar_bloque(ws, 39, DATOS['materiales']['items'], '×')

    # Costos administrativos: se mantienen los 3 del template y se agrega el anexo de soporte externo.
    for i, adm in enumerate(DATOS['administrativos']):
        ws[f'A{56 + i}'] = adm['item']
        ws[f'B{56 + i}'] = adm['monto']
    estilo_etiqueta, estilo_valor = copy(ws['A58']), copy(ws['B58'])
    estilo_total_a, estilo_total_b = copy(ws['A61']), copy(ws['B61'])
    for celda in ('A59', 'B59', 'A61', 'B61'):
        ws[celda] = None

    total_soporte = len(DATOS['soporteExterno']) + 2
    ws['A59'] = 'Contratos de soporte externo (hoja Soporte Externo)'
    ws['B59'] = f"='Soporte Externo'!C{total_soporte}"
    ws['A60'] = 'SUB TOTAL'
    ws['B60'] = '=SUM(B56:B59)'
    ws['A62'] = 'TOTAL PRESUPUESTO MENSUAL'
    ws['B62'] = '=+B60+B53+B52+B51'
    for fila in (59, 60):
        copiar_estilo(estilo_etiqueta, ws[f'A{fila}'])
        copiar_estilo(estilo_valor, ws[f'B{fila}'])
    copiar_estilo(estilo_total_a, ws['A62'])
    copiar_estilo(estilo_total_b, ws['B62'])
    ws['A61'].fill = PatternFill(fill_type=None)
    ws['B61'].fill = PatternFill(fill_type=None)

    ws['A63'] = 'TOTAL PRESUPUESTO ANUAL'
    ws['B63'] = '=B62*12'
    copiar_estilo(estilo_total_a, ws['A63'])
    copiar_estilo(estilo_total_b, ws['B63'])
    ws['A64'] = 'Equivalente mensual en USD'
    ws['B64'] = f'=B62/{DATOS["tipoCambio"]}'

    for fila in list(range(17, 21)) + list(range(31, 35)) + list(range(46, 49)) + list(range(51, 54)) + list(range(56, 65)):
        for col in 'BC':
            ws[f'{col}{fila}'].number_format = MONEDA
    ws.column_dimensions['A'].width = 58
    ws.column_dimensions['B'].width = 20
    ws.column_dimensions['C'].width = 18


def hoja_soporte(wb):
    ws = wb.create_sheet('Soporte Externo')
    ws.append(['Contrato de soporte externo', 'Modalidad contractual', 'Costo Mes (Bs)', 'Costo de calidad (COQ)'])
    for c in ws[1]:
        c.font = Font(bold=True)
        c.fill = PatternFill('solid', fgColor='FFA8D08D')
    for s in DATOS['soporteExterno']:
        ws.append([s['item'], s['modalidad'], s['monto'], s['coq']])
    fila_total = len(DATOS['soporteExterno']) + 2
    ws[f'A{fila_total}'] = 'TOTAL SOPORTE EXTERNO'
    ws[f'C{fila_total}'] = f'=SUM(C2:C{fila_total - 1})'
    ws[f'A{fila_total}'].font = Font(bold=True)
    for fila in range(2, fila_total + 1):
        ws[f'C{fila}'].number_format = MONEDA
    for col, ancho in zip('ABCD', (58, 38, 16, 22)):
        ws.column_dimensions[col].width = ancho


def hoja_supuestos(wb):
    ws = wb.create_sheet('Supuestos y justificación')
    ws.append(['Rubro', 'Ítem', 'Cant.', 'Costo unitario (Bs)', 'COQ', 'Justificación / vínculo con el dataset'])
    for c in ws[1]:
        c.font = Font(bold=True)
        c.fill = PatternFill('solid', fgColor='FFD9E2F3')
    for rubro, clave in (('Mano de obra', 'manoDeObra'), ('Equipo', 'equipo'), ('Materiales (licencias)', 'materiales')):
        for it in DATOS[clave]['items']:
            detalle = it['justificacion']
            if it.get('responsableDataset') and it['responsableDataset'] != '—':
                detalle += f" Responsable en el dataset: {it['responsableDataset']}."
            if it.get('herramientaDataset') and it['herramientaDataset'] != '—':
                detalle += f" Herramienta del dataset: {it['herramientaDataset']} (≈ USD {it['usdMes']}/mes c/u)."
            ws.append([rubro, it['item'], it['cantidad'], it['costoMes'], it['coq'], detalle])
    ws.append([])
    for nota in (
        DATOS['tipoCambioNota'],
        'Cargas sociales 60 % (template): aguinaldo, aportes patronales a la Gestora Pública, Caja de Salud, previsión de indemnización y vacaciones.',
        'Depreciación de equipo 15 % e imprevistos 10 % según el template de la cátedra.',
        DATOS['materiales']['nota'],
        'Precios de licencias: listas públicas de los fabricantes (2025-2026), referenciales y sujetos a cotización formal.',
    ):
        ws.append(['Supuesto', nota])
    for fila in ws.iter_rows(min_row=2):
        fila[3].number_format = MONEDA
        fila[5].alignment = Alignment(wrap_text=True, vertical='top')
        fila[1].alignment = Alignment(wrap_text=True, vertical='top')
    for col, ancho in zip('ABCDEF', (22, 48, 7, 18, 16, 90)):
        ws.column_dimensions[col].width = ancho


def main():
    wb = openpyxl.load_workbook(TEMPLATE)
    hoja_principal(wb)
    hoja_soporte(wb)
    hoja_supuestos(wb)
    SALIDA.parent.mkdir(parents=True, exist_ok=True)
    wb.save(SALIDA)
    print(f'Presupuesto generado -> {SALIDA}')


if __name__ == '__main__':
    main()
