import { ChartCard, Heatmap, HBarChart, RESULT_COLORS, SegmentedBar, StackedColumns, StatTile, fmt } from '../charts/Charts';

const RESULTADOS_REVISADOS = ['Conforme', 'Con observaciones', 'No conforme'];
const ESTADOS = ['En uso', 'En revisión', 'Suspendido', 'Retirado'];
const corto = (nombre) => nombre.replace(/ (Enterprise Code Scanner|Open Source Security QA|Software QA Defect Tracking|Pro Automation API|Regression Suite|Grid Hub Clínico|E2E Testing Suite|Reporting Service|Test Management|Performance Runner|Cluster Pruebas Carga|Stress Test Gateway|Distributed Load Server|Dynamic QA Suite|Automation)$/, '');

// Tablero del inventario de herramientas: mismas vistas que el libro de Tableau, alimentado por la QA Hub API.
export default function QualityDashboard({ data }) {
  const { kpis, resultados, por_herramienta: herramientas, por_trimestre: trimestres, matriz_vigencia: matriz, por_rol: roles, top_riesgo: riesgo, categorias } = data;
  const celda = (criticidad, estado) => matriz.find((m) => m.criticidad === criticidad).celdas.find((c) => c.estado === estado);

  return (
    <div className="viz-dashboard">
      <div className="viz-stats">
        <StatTile label="Herramientas en inventario" value={fmt(kpis.total_herramientas)} sub={`${fmt(kpis.revisadas)} revisadas al menos una vez`} />
        <StatTile label="Tasa de conformidad" value={`${fmt(kpis.tasa_conformidad, 1)} %`} sub="Meta del plan: 75 %" status="serious" />
        <StatTile label="Sin revisión vigente" value={`${fmt(kpis.sin_revision_vigente_pct, 1)} %`} sub={`${fmt(kpis.sin_revision_vigente)} sin revisar en el último año`} status="critical" />
        <StatTile label="En uso y No conformes" value={fmt(kpis.en_uso_no_conforme)} sub={`${kpis.criticas_no_conformes_en_uso} de criticidad Crítica`} status="critical" />
        <StatTile label="Críticas nunca revisadas" value={fmt(kpis.criticas_sin_revision)} sub="Herramientas SOUP sin evidencia" status="warning" />
      </div>

      <ChartCard
        wide
        title="Resultado de la última revisión"
        subtitle={`${fmt(kpis.total_herramientas)} herramientas · fecha de corte ${data.meta.fecha_corte}`}
        table={{ columns: ['Resultado', 'Herramientas', '%'], rows: resultados.map((r) => [r.nombre, fmt(r.valor), `${fmt(r.pct, 1)} %`]) }}
      >
        <SegmentedBar parts={resultados.map((r) => ({ label: r.nombre, value: r.valor, color: RESULT_COLORS[r.nombre] }))} />
      </ChartCard>

      <div className="viz-grid-2">
        <ChartCard
          title="Tasa de No conformidad por herramienta"
          subtitle="% de revisiones No conformes sobre las revisadas · ordenado de mayor a menor"
          table={{ columns: ['Herramienta', 'Revisadas', 'No conformes', 'Tasa NC'], rows: herramientas.map((h) => [h.nombre, h.total - h.sin_revision, h.no_conforme, `${fmt(h.tasa_no_conformidad, 1)} %`]) }}
        >
          <HBarChart
            rows={herramientas.map((h) => ({ label: corto(h.nombre), value: h.tasa_no_conformidad, detail: `${h.no_conforme} No conformes de ${h.total - h.sin_revision} revisadas` }))}
            format={(v) => `${fmt(v, 1)} %`}
            reference={{ value: kpis.tasa_no_conformidad, label: 'Promedio del área' }}
            highlight={(r) => r.value > kpis.tasa_no_conformidad}
            legend={[{ label: 'Sobre el promedio', color: '#d03b3b' }, { label: 'En o bajo el promedio', color: '#445e5f' }]}
          />
        </ChartCard>

        <ChartCard
          title="% sin revisión vigente por criticidad y estado"
          subtitle="Revisión vencida (> 365 días) o inexistente · cuanto más oscuro, peor"
          table={{ columns: ['Criticidad', ...ESTADOS], rows: matriz.map((m) => [m.criticidad, ...m.celdas.map((c) => `${fmt(c.pct, 1)} % (${c.sin_vigente}/${c.total})`)]) }}
        >
          <Heatmap rows={matriz.map((m) => m.criticidad)} cols={ESTADOS} cell={celda} rowLabel="Criticidad" legendLabel="herramientas sin revisión vigente" />
          <div className="viz-subnote">
            <strong>Responsable con mayor tasa de No conformidad:</strong> {roles[0].responsable} ({roles[0].nombre}) — {fmt(roles[0].tasa_no_conformidad, 1)} %
          </div>
        </ChartCard>
      </div>

      <ChartCard
        wide
        title="Revisiones realizadas por trimestre"
        subtitle="Cuántas revisiones se hicieron y con qué resultado: el ritmo cae desde 2025-T4"
        table={{ columns: ['Trimestre', ...RESULTADOS_REVISADOS, 'Total'], rows: trimestres.map((t) => [t.trimestre, ...RESULTADOS_REVISADOS.map((r) => t[r]), RESULTADOS_REVISADOS.reduce((s, r) => s + t[r], 0)]) }}
      >
        <StackedColumns data={trimestres} xKey="trimestre" keys={RESULTADOS_REVISADOS.map((k) => ({ key: k, color: RESULT_COLORS[k] }))} />
      </ChartCard>

      <div className="viz-grid-2">
        <ChartCard title="Acción inmediata: Críticas en uso con revisión No conforme" subtitle={`${kpis.criticas_no_conformes_en_uso} instancias · las más recientes primero`}>
          <div className="viz-table-wrap">
            <table className="viz-table compact">
              <thead><tr><th>#</th><th>Herramienta</th><th>Responsable</th><th>Revisión</th></tr></thead>
              <tbody>
                {riesgo.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.herramienta}</td>
                    <td>{r.responsable}</td>
                    <td>{r.fecha_ultima_revision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        <ChartCard
          title="Calidad del dato: categoría registrada correctamente"
          subtitle={`Solo el ${fmt(100 - kpis.categoria_inconsistente_pct, 1)} % de los registros tiene la categoría que corresponde a la herramienta`}
          table={{ columns: ['Categoría', 'Registradas', 'Correctas', '% correcto'], rows: categorias.map((c) => [c.nombre, c.declaradas, c.correctas, `${fmt((c.correctas / c.declaradas) * 100, 1)} %`]) }}
        >
          <HBarChart
            rows={categorias.map((c) => ({ label: c.nombre, value: (c.correctas / c.declaradas) * 100, detail: `${c.correctas} de ${c.declaradas} registros correctos` }))}
            format={(v) => `${fmt(v, 1)} %`}
            max={100}
          />
        </ChartCard>
      </div>
    </div>
  );
}
