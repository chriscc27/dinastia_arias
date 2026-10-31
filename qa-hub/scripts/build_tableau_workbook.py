"""Genera el libro de trabajo de Tableau del Área de Calidad (5 dashboards) a partir de dataset_calidad.csv.

Salidas:
  qa-hub/tableau/AITECH_Calidad.twb           -> apunta al CSV de qa-hub/data (para abrir en esta PC)
  public/docs/AITECH_Calidad_Dashboards.twbx  -> libro empaquetado con el CSV (descargable desde la página)

Uso:  python qa-hub/scripts/build_tableau_workbook.py
"""

import csv
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
CSV = ROOT / 'qa-hub' / 'data' / 'dataset_calidad.csv'
TWB = ROOT / 'qa-hub' / 'tableau' / 'AITECH_Calidad.twb'
TWBX = ROOT / 'public' / 'docs' / 'AITECH_Calidad_Dashboards.twbx'
HYPER = ROOT / 'qa-hub' / 'tableau' / 'dataset_calidad.hyper'

USER_NS = 'http://www.tableausoftware.com/xml/user'
ET.register_namespace('user', USER_NS)
DS = 'federated.aitechcalidad'
DS_CAPTION = 'dataset_calidad'

# Tipos de las columnas del CSV
RAW = {
    'id_herramienta': 'integer', 'nombre_herramienta': 'string', 'herramienta_base': 'string',
    'categoria_herramienta': 'string', 'categoria_esperada': 'string', 'categoria_consistente': 'string',
    'responsable': 'string', 'rol_responsable': 'string', 'criticidad': 'string', 'nivel_criticidad': 'integer',
    'estado_gestion': 'string', 'fecha_ultima_revision': 'string', 'resultado_revision': 'string', 'revisada': 'string',
    'dias_desde_revision': 'integer', 'revision_vigente': 'string', 'dias_creacion_a_revision': 'integer',
    'fecha_creacion': 'string', 'fecha_modificacion': 'string', 'anio_creacion': 'integer',
    'trimestre_revision': 'string', 'riesgo_operativo': 'string',
}

# Nombres legibles de los campos en los encabezados de Tableau
CAPTIONS = {
    'id_herramienta': 'Herramientas', 'nombre_herramienta': 'Herramienta (instancia)', 'herramienta_base': 'Herramienta',
    'categoria_herramienta': 'Categoría registrada', 'responsable': 'Responsable', 'rol_responsable': 'Rol responsable',
    'criticidad': 'Criticidad', 'estado_gestion': 'Estado de gestión', 'fecha_ultima_revision': 'Última revisión',
    'resultado_revision': 'Resultado de revisión', 'revision_vigente': 'Revisión vigente',
    'dias_desde_revision': 'Días desde la revisión', 'trimestre_revision': 'Trimestre de revisión',
}

# Campos calculados: (id, caption, tipo, rol, fórmula, formato)
CALCS = [
    ('Calculation_1', 'Es revisada', 'integer', 'measure', "IIF([revisada] = 'Sí', 1, 0)", None),
    ('Calculation_2', 'Es conforme', 'integer', 'measure', "IIF([resultado_revision] = 'Conforme', 1, 0)", None),
    ('Calculation_3', 'Es no conforme', 'integer', 'measure', "IIF([resultado_revision] = 'No conforme', 1, 0)", None),
    ('Calculation_4', 'Sin revisión vigente', 'integer', 'measure', "IIF([revision_vigente] = 'No', 1, 0)", None),
    ('Calculation_5', 'Tasa de conformidad', 'real', 'measure', 'SUM([Calculation_2]) / SUM([Calculation_1])', 'p0.0%'),
    ('Calculation_6', '% sin revisión vigente', 'real', 'measure', 'SUM([Calculation_4]) / COUNT([id_herramienta])', 'p0.0%'),
    ('Calculation_7', 'Riesgo crítico', 'boolean', 'dimension', "[estado_gestion] = 'En uso' AND [resultado_revision] = 'No conforme' AND [criticidad] = 'Crítica'", None),
    ('Calculation_8', 'Tasa NC', 'real', 'measure', 'SUM([Calculation_3]) / SUM([Calculation_1])', 'p0.0%'),
    ('Calculation_9', 'Promedio NC del área (LOD)', 'real', 'measure', '{ FIXED : SUM([Calculation_3]) / SUM([Calculation_1]) }', 'p0.0%'),
    ('Calculation_10', 'Posición vs promedio', 'string', 'dimension', "IIF([Calculation_8] > MIN([Calculation_9]), 'Sobre el promedio', 'En o bajo el promedio')", None),
    ('Calculation_11', 'Es riesgo crítico', 'integer', 'measure', 'IIF([Calculation_7], 1, 0)', None),
    ('Calculation_12', 'Crítica nunca revisada', 'integer', 'measure', "IIF([criticidad] = 'Crítica' AND [revisada] = 'No', 1, 0)", None),
    ('Calculation_13', '% categoría correcta', 'real', 'measure', "SUM(IIF([categoria_consistente] = 'Sí', 1, 0)) / COUNT([id_herramienta])", 'p0.0%'),
]
CALC_BY_ID = {c[0]: c for c in CALCS}
AGG_CALCS = {'Calculation_5', 'Calculation_6', 'Calculation_8', 'Calculation_10', 'Calculation_13'}

COLORES_RESULTADO = {
    'Conforme': '#0ca30c', 'Con observaciones': '#fab219', 'No conforme': '#d03b3b', 'Sin revisión': '#bdbcb4',
}
COLORES_POSICION = {'Sobre el promedio': '#d03b3b', 'En o bajo el promedio': '#445e5f'}
COLORES_VIGENCIA = {'Sí': '#0ca30c', 'No': '#d03b3b'}
# Ajuste de cada hoja dentro de su dashboard
ZOOM = {'Mapa de vigencia': 'entire-view', 'Tabla de riesgo crítico': 'fit-width'}


def sub(parent, tag, attrs=None, text=None):
    el = ET.SubElement(parent, tag, {k: str(v) for k, v in (attrs or {}).items()})
    if text is not None:
        el.text = text
    return el


# ---------- Referencias a campos (column-instances) ----------
class Ref:
    """Instancia de campo en una vista: dimensión (none), agregación (sum/cnt/avg) o cálculo agregado (usr)."""

    def __init__(self, field, deriv):
        self.field = field
        self.deriv = deriv
        calc = CALC_BY_ID.get(field)
        dim_types = ('string', 'boolean')
        es_dim = deriv == 'none' and (RAW.get(field) in dim_types or (calc and calc[3] == 'dimension'))
        if field == 'Calculation_10':
            self.prefix, self.suffix, self.tipo = 'usr', 'nk', 'nominal'
        elif deriv == 'usr':
            self.prefix, self.suffix, self.tipo = 'usr', 'qk', 'quantitative'
        elif es_dim:
            self.prefix, self.suffix, self.tipo = 'none', 'nk', 'nominal'
        else:
            self.prefix, self.suffix, self.tipo = deriv, 'qk', 'quantitative'
        self.name = f'[{self.prefix}:{field}:{self.suffix}]'
        self.full = f'[{DS}].{self.name}'

    @property
    def derivation(self):
        return {'none': 'None', 'sum': 'Sum', 'cnt': 'Count', 'avg': 'Avg', 'min': 'Min', 'usr': 'User'}[self.prefix]


def dim(f):
    return Ref(f, 'none')


def usr(f):
    return Ref(f, 'usr')


def agg(f, how):
    return Ref(f, how)


def column_def(parent, field):
    if field in CALC_BY_ID:
        cid, caption, dtype, role, formula, fmt = CALC_BY_ID[field]
        attrs = {'caption': caption, 'datatype': dtype, 'name': f'[{cid}]', 'role': role,
                 'type': 'quantitative' if role == 'measure' else 'nominal'}
        if fmt:
            attrs['default-format'] = fmt
        col = sub(parent, 'column', attrs)
        sub(col, 'calculation', {'class': 'tableau', 'formula': formula})
        return
    dtype = RAW[field]
    role = 'dimension' if dtype == 'string' else 'measure'
    attrs = {'datatype': dtype, 'name': f'[{field}]', 'role': role, 'type': 'nominal' if role == 'dimension' else 'quantitative'}
    if field in CAPTIONS:
        attrs = {'caption': CAPTIONS[field], **attrs}
    sub(parent, 'column', attrs)


def dependencias(field):
    """Campos de los que depende un cálculo (para declararlos en la vista)."""
    if field not in CALC_BY_ID:
        return {field}
    formula = CALC_BY_ID[field][4]
    deps = {field}
    for nombre in list(RAW) + list(CALC_BY_ID):
        if f'[{nombre}]' in formula:
            deps |= dependencias(nombre)
    return deps


# ---------- Hojas ----------
class Sheet:
    def __init__(self, name, title, mark, rows=(), cols=(), color=None, text=None, label=None, size=None,
                 sort=None, filters=(), label_size=None, show_labels=False, color_map=None):
        self.name, self.title, self.mark = name, title, mark
        self.rows, self.cols = list(rows), list(cols)
        self.color, self.text, self.label, self.size = color, text, label, size
        self.sort, self.filters = sort, list(filters)
        self.label_size, self.show_labels = label_size, show_labels

    def refs(self):
        out = self.rows + self.cols + [r for r in (self.color, self.text, self.label) if r]
        if self.sort:
            out += [self.sort[0], self.sort[1]]
        out += [f[0] for f in self.filters]
        return out

    def to_xml(self, parent):
        ws = sub(parent, 'worksheet', {'name': self.name})
        lo = sub(ws, 'layout-options')
        title = sub(lo, 'title')
        ft = sub(title, 'formatted-text')
        sub(ft, 'run', {'bold': 'true', 'fontsize': '13'}, self.title)

        table = sub(ws, 'table')
        view = sub(table, 'view')
        dss = sub(view, 'datasources')
        sub(dss, 'datasource', {'caption': DS_CAPTION, 'name': DS})
        deps = sub(view, 'datasource-dependencies', {'datasource': DS})
        campos = set()
        for r in self.refs():
            campos |= dependencias(r.field)
        for f in sorted(campos):
            column_def(deps, f)
        vistas = {}
        for r in self.refs():
            vistas[r.name] = r
        for r in vistas.values():
            sub(deps, 'column-instance', {'column': f'[{r.field}]', 'derivation': r.derivation, 'name': r.name,
                                          'pivot': 'key', 'type': r.tipo})
        for ref, valores, excluir in self.filters:
            fil = sub(view, 'filter', {'class': 'categorical', 'column': ref.full})
            gf = sub(fil, 'groupfilter', {'function': 'except' if excluir else 'union',
                                          f'{{{USER_NS}}}ui-domain': 'database',
                                          f'{{{USER_NS}}}ui-enumeration': 'exclusive' if excluir else 'inclusive',
                                          f'{{{USER_NS}}}ui-marker': 'enumerate'})
            if excluir:
                sub(gf, 'groupfilter', {'function': 'level-members', 'level': ref.name})
                miembros = sub(gf, 'groupfilter', {'function': 'union'}) if len(valores) > 1 else gf
            else:
                miembros = gf
            for v in valores:
                sub(miembros, 'groupfilter', {'function': 'member', 'level': ref.name, 'member': v})
        if self.sort:
            col, using, direction = self.sort
            sub(view, 'sort', {'class': 'computed', 'column': col.full, 'direction': direction, 'using': using.full})
        if self.filters:
            slices = sub(view, 'slices')
            for ref, _, _ in self.filters:
                sub(slices, 'column', text=ref.full)
        sub(view, 'aggregation', {'value': 'true'})

        style = sub(table, 'style')
        if self.mark == 'Text' and self.label_size:
            rule = sub(style, 'style-rule', {'element': 'cell'})
            sub(rule, 'format', {'attr': 'font-size', 'value': str(self.label_size)})
            sub(rule, 'format', {'attr': 'font-weight', 'value': 'bold'})
            sub(rule, 'format', {'attr': 'color', 'value': '#222f30'})
            sub(rule, 'format', {'attr': 'text-align', 'value': 'center'})
            sub(rule, 'format', {'attr': 'vertical-align', 'value': 'center'})

        panes = sub(table, 'panes')
        pane = sub(panes, 'pane', {'selection-relaxation-option': 'selection-relaxation-allow'})
        pv = sub(pane, 'view')
        sub(pv, 'breakdown', {'value': 'auto'})
        sub(pane, 'mark', {'class': self.mark})
        enc = sub(pane, 'encodings')
        if self.color:
            sub(enc, 'color', {'column': self.color.full})
        if self.text:
            sub(enc, 'text', {'column': self.text.full})
        if self.label:
            sub(enc, 'text', {'column': self.label.full})
        pst = sub(pane, 'style')
        rule = sub(pst, 'style-rule', {'element': 'mark'})
        if self.show_labels or self.label:
            sub(rule, 'format', {'attr': 'mark-labels-show', 'value': 'true'})
            sub(rule, 'format', {'attr': 'mark-labels-cull', 'value': 'true'})
        sub(table, 'rows', text=' / '.join(r.full for r in self.rows) or None)
        sub(table, 'cols', text=' / '.join(r.full for r in self.cols) or None)


resultado = dim('resultado_revision')
SHEETS = [
    # Dashboard 1
    Sheet('KPI Total', 'Herramientas en inventario', 'Text', text=agg('id_herramienta', 'cnt'), label_size=30),
    Sheet('KPI Conformidad', 'Tasa de conformidad (meta 75 %)', 'Text', text=usr('Calculation_5'), label_size=30),
    Sheet('KPI Sin vigente', '% sin revisión vigente', 'Text', text=usr('Calculation_6'), label_size=30),
    Sheet('KPI Críticas NC', 'Críticas en uso y No conformes', 'Text', text=agg('Calculation_11', 'sum'), label_size=30),
    Sheet('KPI Críticas sin revisión', 'Críticas nunca revisadas', 'Text', text=agg('Calculation_12', 'sum'), label_size=30),
    Sheet('Resultado de revisión', 'Resultado de la última revisión (n.º de herramientas)', 'Bar',
          rows=[resultado], cols=[agg('id_herramienta', 'cnt')], color=resultado, label=agg('id_herramienta', 'cnt'),
          sort=(resultado, agg('id_herramienta', 'cnt'), 'DESC')),
    # Dashboard 2
    Sheet('NC por herramienta', 'Tasa de No conformidad por herramienta (promedio del área: 9,3 %)', 'Bar',
          rows=[dim('herramienta_base')], cols=[usr('Calculation_8')], color=Ref('Calculation_10', 'usr'),
          label=usr('Calculation_8'), sort=(dim('herramienta_base'), usr('Calculation_8'), 'DESC')),
    Sheet('NC por responsable', 'Tasa de No conformidad por rol responsable', 'Bar',
          rows=[dim('rol_responsable')], cols=[usr('Calculation_8')], label=usr('Calculation_8'),
          sort=(dim('rol_responsable'), usr('Calculation_8'), 'DESC')),
    # Dashboard 3
    Sheet('Mapa de vigencia', '% sin revisión vigente: criticidad × estado de gestión', 'Square',
          rows=[dim('criticidad')], cols=[dim('estado_gestion')], color=usr('Calculation_6'), label=usr('Calculation_6'),
          sort=(dim('criticidad'), agg('nivel_criticidad', 'min'), 'DESC')),
    Sheet('Vigencia por criticidad', 'Herramientas con revisión vigente (verde) y vencida o inexistente (rojo)', 'Bar',
          rows=[dim('criticidad')], cols=[agg('id_herramienta', 'cnt')], color=dim('revision_vigente'),
          label=agg('id_herramienta', 'cnt'), sort=(dim('criticidad'), agg('nivel_criticidad', 'min'), 'DESC')),
    # Dashboard 4
    Sheet('Revisiones por trimestre', 'Revisiones por trimestre (verde: conforme · amarillo: con observaciones · rojo: no conforme)', 'Bar',
          rows=[agg('id_herramienta', 'cnt')], cols=[dim('trimestre_revision')], color=resultado,
          filters=[(resultado, ['&quot;Sin revisión&quot;'], True)]),
    Sheet('Conformidad por trimestre', 'Tasa de conformidad por trimestre de revisión', 'Line',
          rows=[usr('Calculation_5')], cols=[dim('trimestre_revision')], label=usr('Calculation_5'),
          filters=[(resultado, ['&quot;Sin revisión&quot;'], True)]),
    # Dashboard 5
    Sheet('Tabla de riesgo crítico', 'Críticas en uso con revisión No conforme (acción inmediata)', 'Text',
          rows=[dim('nombre_herramienta'), dim('responsable'), dim('fecha_ultima_revision')],
          text=agg('dias_desde_revision', 'min'), filters=[(dim('Calculation_7'), ['true'], False)]),
    Sheet('Categoría correcta', '% de registros con la categoría correcta', 'Bar',
          rows=[dim('categoria_herramienta')], cols=[usr('Calculation_13')], label=usr('Calculation_13')),
]

DASHBOARDS = [
    ('1 Resumen ejecutivo', 'Resumen ejecutivo de conformidad — AITECH | Área de Calidad',
     [['KPI Total', 'KPI Conformidad', 'KPI Sin vigente', 'KPI Críticas NC', 'KPI Críticas sin revisión'], ['Resultado de revisión']], [30, 70]),
    ('2 No conformidad', 'No conformidad por herramienta y responsable',
     [['NC por herramienta'], ['NC por responsable']], [64, 36]),
    ('3 Vigencia', 'Vigencia de revisiones según criticidad y estado',
     [['Mapa de vigencia'], ['Vigencia por criticidad']], [60, 40]),
    ('4 Tendencia', 'Evolución trimestral de las revisiones',
     [['Revisiones por trimestre'], ['Conformidad por trimestre']], [60, 40]),
    ('5 Riesgo y dato', 'Riesgo crítico y calidad del dato del inventario',
     [[('Tabla de riesgo crítico', 800), 'Categoría correcta']], [100]),
]


def dashboard_xml(parent, name, titulo, filas, alturas):
    db = sub(parent, 'dashboard', {'name': name})
    sub(db, 'style')
    sub(db, 'size', {'maxheight': '700', 'maxwidth': '1320', 'minheight': '700', 'minwidth': '1320'})
    zones = sub(db, 'zones')
    zid = iter(range(3, 100))
    raiz = sub(zones, 'zone', {'h': 100000, 'id': next(zid), 'type-v2': 'layout-basic', 'w': 100000, 'x': 0, 'y': 0})
    vert = sub(raiz, 'zone', {'h': 98000, 'id': next(zid), 'param': 'vert', 'type-v2': 'layout-flow', 'w': 98400, 'x': 800, 'y': 1000})
    tit = sub(vert, 'zone', {'h': 7000, 'id': next(zid), 'type-v2': 'text', 'w': 98400, 'x': 800, 'y': 1000})
    ft = sub(tit, 'formatted-text')
    sub(ft, 'run', {'bold': 'true', 'fontcolor': '#222f30', 'fontsize': '18'}, titulo)
    y = 8000
    for fila, alto in zip(filas, alturas):
        h = int(91000 * alto / 100)
        horz = sub(vert, 'zone', {'h': h, 'id': next(zid), 'param': 'horz', 'type-v2': 'layout-flow', 'w': 98400, 'x': 800, 'y': y})
        w = 98400 // len(fila)
        for i, hoja in enumerate(fila):
            # (nombre, ancho en px) fija el ancho de la hoja dentro del contenedor horizontal
            attrs = {'h': h, 'id': next(zid), 'name': hoja, 'w': w, 'x': 800 + i * w, 'y': y}
            if isinstance(hoja, tuple):
                attrs.update({'name': hoja[0], 'fixed-size': hoja[1], 'is-fixed': 'true'})
            z = sub(horz, 'zone', attrs)
            zs = sub(z, 'zone-style')
            sub(zs, 'format', {'attr': 'border-color', 'value': '#e1e0d9'})
            sub(zs, 'format', {'attr': 'border-style', 'value': 'solid'})
            sub(zs, 'format', {'attr': 'border-width', 'value': '1'})
            sub(zs, 'format', {'attr': 'margin', 'value': '4'})
        y += h


def build_hyper():
    """Tableau Public solo abre libros con extracciones: se crea el .hyper con la Hyper API oficial."""
    from tableauhyperapi import (Connection, CreateMode, HyperProcess, Inserter, SqlType, TableDefinition,
                                 TableName, Telemetry)
    tipos = {'integer': SqlType.big_int(), 'string': SqlType.text()}
    tabla = TableDefinition(TableName('Extract', 'Extract'),
                            [TableDefinition.Column(n, tipos[t]) for n, t in RAW.items()])
    with open(CSV, encoding='utf-8') as f:
        filas = [[(int(r[n]) if r[n] else None) if t == 'integer' else r[n] for n, t in RAW.items()]
                 for r in csv.DictReader(f)]
    with HyperProcess(Telemetry.DO_NOT_SEND_USAGE_DATA_TO_TABLEAU) as hyper:
        with Connection(hyper.endpoint, str(HYPER), CreateMode.CREATE_AND_REPLACE) as con:
            con.catalog.create_schema('Extract')
            con.catalog.create_table(tabla)
            with Inserter(con, tabla) as ins:
                ins.add_rows(filas)
                ins.execute()
    return len(filas)


def datasource_xml(parent, directorio, hyper_path):
    ds = sub(parent, 'datasource', {'caption': DS_CAPTION, 'inline': 'true', 'name': DS, 'version': '18.1'})
    con = sub(ds, 'connection', {'class': 'federated'})
    ncs = sub(con, 'named-connections')
    nc = sub(ncs, 'named-connection', {'caption': 'dataset_calidad', 'name': 'textscan.aitechcsv'})
    sub(nc, 'connection', {'class': 'textscan', 'directory': directorio, 'filename': 'dataset_calidad.csv', 'password': '', 'server': ''})
    rel = sub(con, 'relation', {'connection': 'textscan.aitechcsv', 'name': 'dataset_calidad.csv', 'table': '[dataset_calidad#csv]', 'type': 'table'})
    cols = sub(rel, 'columns', {'character-set': 'UTF-8', 'header': 'yes', 'locale': 'es_ES', 'separator': ','})
    for i, (nombre, tipo) in enumerate(RAW.items()):
        sub(cols, 'column', {'datatype': tipo, 'name': nombre, 'ordinal': i})
    sub(ds, 'aliases', {'enabled': 'yes'})
    for campo in CAPTIONS:
        column_def(ds, campo)
    for c in CALCS:
        column_def(ds, c[0])
    for campo, deriv, tipo in (('resultado_revision', 'None', 'none'), ('Calculation_10', 'User', 'usr'), ('revision_vigente', 'None', 'none')):
        sub(ds, 'column-instance', {'column': f'[{campo}]', 'derivation': deriv, 'name': f'[{tipo}:{campo}:nk]',
                                    'pivot': 'key', 'type': 'nominal'})
    ext = sub(ds, 'extract', {'count': '-1', 'enabled': 'true', 'units': 'records'})
    hcon = sub(ext, 'connection', {'access_mode': 'readonly', 'author-locale': 'es_ES', 'class': 'hyper',
                                   'dbname': hyper_path, 'default-settings': 'hyper', 'schema': 'Extract',
                                   'sslmode': '', 'tablename': 'Extract', 'update-time': '10/31/2026 6:00:00 PM',
                                   'username': 'tableau'})
    sub(hcon, 'relation', {'name': 'Extract', 'table': '[Extract].[Extract]', 'type': 'table'})
    sub(ds, 'layout', {'dim-ordering': 'alphabetic', 'dim-percentage': '0.5', 'measure-ordering': 'alphabetic',
                       'measure-percentage': '0.4', 'show-structure': 'true'})
    style = sub(ds, 'style')
    rule = sub(style, 'style-rule', {'element': 'mark'})
    for campo, mapa in (('[none:resultado_revision:nk]', COLORES_RESULTADO), ('[usr:Calculation_10:nk]', COLORES_POSICION),
                        ('[none:revision_vigente:nk]', COLORES_VIGENCIA)):
        enc = sub(rule, 'encoding', {'attr': 'color', 'field': campo, 'type': 'palette'})
        for valor, color in mapa.items():
            m = sub(enc, 'map', {'to': color})
            sub(m, 'bucket', text=f'"{valor}"')


def workbook(directorio, hyper_path):
    wb = ET.Element('workbook', {'original-version': '18.1', 'source-build': '2025.1.0 (20251.25.0213.1408)',
                                 'source-platform': 'win', 'version': '18.1'})
    sub(wb, 'document-format-change-manifest')
    sub(wb, 'preferences')
    dss = sub(wb, 'datasources')
    datasource_xml(dss, directorio, hyper_path)
    wss = sub(wb, 'worksheets')
    for s in SHEETS:
        s.to_xml(wss)
    dbs = sub(wb, 'dashboards')
    for d in DASHBOARDS:
        dashboard_xml(dbs, *d)
    wins = sub(wb, 'windows', {'source-height': '30'})
    for s in SHEETS:
        w = sub(wins, 'window', {'class': 'worksheet', 'hidden': 'true', 'name': s.name})
        cards = sub(w, 'cards')
        izq = sub(sub(cards, 'edge', {'name': 'left'}), 'strip', {'size': '160'})
        for tipo in ('pages', 'filters', 'marks'):
            sub(izq, 'card', {'type': tipo})
        arriba = sub(cards, 'edge', {'name': 'top'})
        for tipo, tam in (('columns', '2147483647'), ('rows', '2147483647'), ('title', '31')):
            sub(sub(arriba, 'strip', {'size': tam}), 'card', {'type': tipo})
    for i, d in enumerate(DASHBOARDS):
        attrs = {'class': 'dashboard', 'name': d[0]}
        if i == 0:
            attrs['maximized'] = 'true'
        w = sub(wins, 'window', attrs)
        vps = sub(w, 'viewpoints')
        for fila in d[2]:
            for hoja in fila:
                hoja = hoja[0] if isinstance(hoja, tuple) else hoja
                vp = sub(vps, 'viewpoint', {'name': hoja})
                sub(vp, 'zoom', {'type': ZOOM.get(hoja, 'entire-view')})
        sub(w, 'active', {'id': '-1'})
        sub(w, 'device-preview', {'visible': 'false'})
    ET.indent(wb)
    return b"<?xml version='1.0' encoding='utf-8' ?>\n" + ET.tostring(wb, encoding='utf-8').replace(b'&amp;quot;', b'&quot;')


def main():
    TWB.parent.mkdir(parents=True, exist_ok=True)
    print(f'{build_hyper()} filas -> {HYPER}')
    TWB.write_bytes(workbook(str(CSV.parent), HYPER.as_posix()))
    TWBX.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(TWBX, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('AITECH_Calidad.twb', workbook('Data', 'Data/Extracts/dataset_calidad.hyper'))
        z.write(CSV, 'Data/dataset_calidad.csv')
        z.write(HYPER, 'Data/Extracts/dataset_calidad.hyper')
    print(f'{TWB}\n{TWBX}')


if __name__ == '__main__':
    main()
