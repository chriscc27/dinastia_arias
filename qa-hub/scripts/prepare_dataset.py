"""ETL del dataset del Área de Calidad.

Convierte `Dataset_Gestion_Calidad (1).xlsx` en:
  - qa-hub/data/dataset_calidad.csv   -> fuente para Tableau y para la API (KPIs)
  - qa-hub/data/dataset_calidad.arff  -> fuente para Weka (clasificación, clustering, asociación)
  - public/data/dataset_calidad.csv   -> copia descargable desde la página web

Uso:  python qa-hub/scripts/prepare_dataset.py
Requiere: pip install openpyxl
"""

import csv
import re
import shutil
from datetime import date, datetime
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'Dataset_Gestion_Calidad (1).xlsx'
OUT_DIR = ROOT / 'qa-hub' / 'data'
PUBLIC_DIR = ROOT / 'public' / 'data'

# Fecha de corte del análisis: fin del periodo cubierto por el dataset (última revisión: 2026-04-26).
FECHA_CORTE = date(2026, 4, 30)
# Política interna (ISO 13485 §7.4 / IEC 62304 SOUP): toda herramienta se revisa al menos una vez al año.
DIAS_VIGENCIA_REVISION = 365

# Categoría que le corresponde a cada herramienta según su naturaleza técnica.
CATEGORIA_ESPERADA = {
    'SonarQube Enterprise Code Scanner': 'Análisis de Código',
    'Snyk Open Source Security QA': 'Análisis de Código',
    'OWASP ZAP Dynamic QA Suite': 'Análisis de Código',
    'Postman Pro Automation API': 'Automatización de Pruebas',
    'Tricentis Tosca Automation': 'Automatización de Pruebas',
    'Playwright Regression Suite': 'Automatización de Pruebas',
    'Selenium Grid Hub Clínico': 'Automatización de Pruebas',
    'Cypress E2E Testing Suite': 'Automatización de Pruebas',
    'Jira Software QA Defect Tracking': 'Gestión de Bugs',
    'TestRail Test Management': 'Gestión de Bugs',
    'Allure Reporting Service': 'Gestión de Bugs',
    'Apache JMeter Cluster Pruebas Carga': 'Pruebas de Rendimiento',
    'k6 Performance Runner': 'Pruebas de Rendimiento',
    'Gatling Stress Test Gateway': 'Pruebas de Rendimiento',
    'Locust Distributed Load Server': 'Pruebas de Rendimiento',
}

CAMPOS = [
    'id_herramienta', 'nombre_herramienta', 'herramienta_base', 'categoria_herramienta',
    'categoria_esperada', 'categoria_consistente', 'responsable', 'rol_responsable',
    'criticidad', 'nivel_criticidad', 'estado_gestion', 'fecha_ultima_revision',
    'resultado_revision', 'revisada', 'dias_desde_revision', 'revision_vigente',
    'dias_creacion_a_revision', 'fecha_creacion', 'fecha_modificacion', 'anio_creacion',
    'trimestre_revision', 'riesgo_operativo',
]

NIVEL_CRITICIDAD = {'Baja': 1, 'Media': 2, 'Alta': 3, 'Crítica': 4}


def parse_date(value):
    if not value:
        return None
    return datetime.strptime(str(value)[:10], '%Y-%m-%d').date()


def transformar(fila):
    base = re.sub(r' - Instancia \d+$', '', fila['nombre_herramienta'])
    rol = re.search(r'\(([^)]+)\)', fila['responsable'])
    creada = parse_date(fila['fecha_creacion'])
    revisada = parse_date(fila['fecha_ultima_revision'])
    resultado = fila['resultado_revision'] or 'Sin revisión'
    dias_revision = (FECHA_CORTE - revisada).days if revisada else None
    vigente = dias_revision is not None and dias_revision <= DIAS_VIGENCIA_REVISION

    # Riesgo operativo: herramienta en producción que no pasó la revisión o nunca fue revisada
    # siendo de criticidad Alta/Crítica. Es la regla que también evalúa Zabbix como trigger.
    en_uso = fila['estado_gestion'] == 'En uso'
    alta = fila['criticidad'] in ('Alta', 'Crítica')
    if en_uso and resultado == 'No conforme':
        riesgo = 'Alto'
    elif en_uso and alta and not vigente:
        riesgo = 'Medio'
    else:
        riesgo = 'Bajo'

    esperada = CATEGORIA_ESPERADA[base]
    return {
        'id_herramienta': fila['id_herramienta'],
        'nombre_herramienta': fila['nombre_herramienta'],
        'herramienta_base': base,
        'categoria_herramienta': fila['categoria_herramienta'],
        'categoria_esperada': esperada,
        'categoria_consistente': 'Sí' if esperada == fila['categoria_herramienta'] else 'No',
        'responsable': fila['responsable'].split(' (')[0],
        'rol_responsable': rol.group(1) if rol else '',
        'criticidad': fila['criticidad'],
        'nivel_criticidad': NIVEL_CRITICIDAD[fila['criticidad']],
        'estado_gestion': fila['estado_gestion'],
        'fecha_ultima_revision': revisada.isoformat() if revisada else '',
        'resultado_revision': resultado,
        'revisada': 'Sí' if revisada else 'No',
        'dias_desde_revision': dias_revision if dias_revision is not None else '',
        'revision_vigente': 'Sí' if vigente else 'No',
        'dias_creacion_a_revision': (revisada - creada).days if revisada else '',
        'fecha_creacion': fila['fecha_creacion'],
        'fecha_modificacion': fila['fecha_modificacion'],
        'anio_creacion': creada.year,
        'trimestre_revision': f'{revisada.year}-T{(revisada.month - 1) // 3 + 1}' if revisada else '',
        'riesgo_operativo': riesgo,
    }


def escribir_csv(filas, destino):
    with destino.open('w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=CAMPOS)
        writer.writeheader()
        writer.writerows(filas)


def arff_nominal(valor):
    return "'" + str(valor).replace("'", "\\'") + "'"


def escribir_arff(filas, destino):
    # Weka trabaja mejor sin identificadores ni fechas crudas: se dejan los atributos
    # con poder explicativo y las variables derivadas numéricas.
    nominales = ['herramienta_base', 'categoria_herramienta', 'categoria_consistente',
                 'rol_responsable', 'criticidad', 'estado_gestion', 'revision_vigente',
                 'riesgo_operativo', 'resultado_revision']
    numericos = ['nivel_criticidad', 'anio_creacion', 'dias_creacion_a_revision', 'dias_desde_revision']
    lineas = ['% Dataset Gestión de Calidad - AITECH | Área de Calidad',
              f'% Fecha de corte: {FECHA_CORTE.isoformat()} | Registros: {len(filas)}',
              '@relation aitech_herramientas_calidad', '']
    for campo in nominales[:-1]:
        valores = sorted({f[campo] for f in filas})
        lineas.append(f"@attribute {campo} {{{','.join(arff_nominal(v) for v in valores)}}}")
    for campo in numericos:
        lineas.append(f'@attribute {campo} numeric')
    # La clase va al final (convención de Weka).
    clases = ['Conforme', 'Con observaciones', 'No conforme', 'Sin revisión']
    lineas.append(f"@attribute resultado_revision {{{','.join(arff_nominal(v) for v in clases)}}}")
    lineas += ['', '@data']
    for f in filas:
        valores = [arff_nominal(f[c]) for c in nominales[:-1]]
        valores += [str(f[c]) if f[c] != '' else '?' for c in numericos]
        valores.append(arff_nominal(f['resultado_revision']))
        lineas.append(','.join(valores))
    destino.write_text('\n'.join(lineas) + '\n', encoding='utf-8')


def main():
    hoja = openpyxl.load_workbook(SOURCE, read_only=True).active
    filas = list(hoja.iter_rows(values_only=True))
    encabezado = filas[0]
    registros = [transformar(dict(zip(encabezado, r))) for r in filas[1:] if r[0] is not None]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    escribir_csv(registros, OUT_DIR / 'dataset_calidad.csv')
    escribir_arff(registros, OUT_DIR / 'dataset_calidad.arff')
    shutil.copy(OUT_DIR / 'dataset_calidad.csv', PUBLIC_DIR / 'dataset_calidad.csv')
    shutil.copy(OUT_DIR / 'dataset_calidad.arff', PUBLIC_DIR / 'dataset_calidad.arff')
    print(f'{len(registros)} registros -> {OUT_DIR}')


if __name__ == '__main__':
    main()
