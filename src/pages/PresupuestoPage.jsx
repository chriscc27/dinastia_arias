import { Link } from 'react-router-dom';
import ToolPageLayout, { ToolSection } from '../components/tools/ToolPageLayout';
import { ChartCard, HBarChart, Legend, StatTile, fmt } from '../components/charts/Charts';
import { computePresupuesto } from '../lib/presupuesto';
import { presupuestoTheory } from '../data/tools/presupuestoTheory';
import { relatedVideosData } from '../data/relatedVideosData';
import presupuesto from '../data/presupuestoData.json';
import kpisSnapshot from '../data/generated/datasetKpis.json';

const BASE = import.meta.env.BASE_URL;
const bs = (n) => `Bs ${fmt(n, 2)}`;
// Paleta categórica (identidad de cada rubro), en orden fijo
const RUBROS = [
  { clave: 'manoDeObra', label: 'Mano de obra', color: '#2a78d6' },
  { clave: 'equipo', label: 'Equipo', color: '#eb6834' },
  { clave: 'materiales', label: 'Materiales (licencias)', color: '#1baf7a' },
  { clave: 'administrativos', label: 'Administrativos + soporte externo', color: '#eda100' },
];

function TablaRubro({ titulo, color, items, filas, total, cantidadLabel = 'Cant.' }) {
  return (
    <div className="tl-budget-block">
      <h4 style={{ borderColor: color }}>{titulo}</h4>
      <div className="viz-table-wrap">
        <table className="viz-table tl-budget">
          <thead><tr><th>Ítem</th><th>{cantidadLabel}</th><th>Costo mes</th><th>Sub total mes</th></tr></thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.item} title={i.justificacion}>
                <td>{i.item}<small>{i.justificacion}</small></td>
                <td>{i.cantidad}</td>
                <td>{bs(i.costoMes)}</td>
                <td>{bs(i.subtotal)}</td>
              </tr>
            ))}
            {filas.map(([etiqueta, monto]) => (
              <tr key={etiqueta} className="tl-budget-sub"><td colSpan={3}>{etiqueta}</td><td>{bs(monto)}</td></tr>
            ))}
            <tr className="tl-budget-total"><td colSpan={3}>TOTAL {titulo.toUpperCase()}</td><td>{bs(total)}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PresupuestoPage() {
  const p = computePresupuesto(presupuesto);
  const { noCalidad } = presupuestoTheory;
  const resultados = Object.fromEntries(kpisSnapshot.resultados.map((r) => [r.nombre, r.valor]));
  const costoHora = p.costoPersonaMes / noCalidad.horasLaboralesMes;
  const horasRetrabajo = resultados['No conforme'] * noCalidad.horasNoConforme + resultados['Con observaciones'] * noCalidad.horasConObservaciones;
  const costoNoCalidad = horasRetrabajo * costoHora;
  const partes = RUBROS.map((r) => ({ ...r, monto: r.clave === 'administrativos' ? p.administrativos.subtotal : p[r.clave].total }));

  return (
    <ToolPageLayout data={presupuestoTheory} videos={relatedVideosData.presupuesto}>
      <ToolSection badge="RESUMEN" title="Presupuesto mensual del Área de Calidad" lead={`${presupuesto.departamento}. Montos en bolivianos; ${presupuesto.tipoCambioNota}`}>
        <div className="viz-stats">
          <StatTile label="Total presupuesto mensual" value={bs(p.total)} sub={`≈ USD ${fmt(p.usd, 0)} al mes`} />
          <StatTile label="Total anual" value={bs(p.anual)} sub="12 meses, sin incrementos" />
          <StatTile label="Mano de obra" value={`${fmt((p.manoDeObra.total / p.total) * 100, 1)} %`} sub={`${p.manoDeObra.items.length} cargos del organigrama`} />
          <StatTile label="Soporte externo" value={bs(p.administrativos.soporte)} sub={`${presupuesto.soporteExterno.length} contratos`} />
        </div>
        <div className="tl-downloads">
          <a className="tl-btn" href={`${BASE}docs/Presupuesto_Area_Calidad_AITECH.xlsx`} download>Descargar presupuesto en Excel (template de la cátedra)</a>
          <Link className="tl-btn ghost" to="/soporte-externo">Ver detalle de los contratos de soporte externo →</Link>
        </div>

        <ChartCard wide title="Composición del presupuesto mensual" subtitle="Cada rubro con sus cargas, depreciación e imprevistos ya aplicados"
          table={{ columns: ['Rubro', 'Monto mensual', '% del total'], rows: partes.map((r) => [r.label, bs(r.monto), `${fmt((r.monto / p.total) * 100, 1)} %`]) }}>
          <div className="viz-seg tl-budget-seg">
            {partes.map((r) => (
              <div key={r.clave} className="viz-seg-part" style={{ flexGrow: r.monto, background: r.color }} title={`${r.label}: ${bs(r.monto)}`} />
            ))}
          </div>
          <Legend items={partes.map((r) => ({ label: r.label, color: r.color, value: `${bs(r.monto)} · ${fmt((r.monto / p.total) * 100, 1)} %` }))} />
        </ChartCard>
      </ToolSection>

      <ToolSection badge="DETALLE · TEMPLATE DE LA CÁTEDRA" title="Costos operativos" lead="Mismos rubros, factores y fórmulas que el template: cargas sociales 60 %, depreciación 15 % e imprevistos 10 %. Pasa el cursor sobre un ítem para ver su justificación.">
        <TablaRubro titulo="Mano de obra" color={RUBROS[0].color} items={p.manoDeObra.items}
          filas={[['SUB TOTAL', p.manoDeObra.subtotal], ['Cargas sociales, aguinaldos, Gestora, salud (60 %)', p.manoDeObra.cargas], ['Imprevistos 10 %', p.manoDeObra.imprevistos]]}
          total={p.manoDeObra.total} />
        <TablaRubro titulo="Equipo" color={RUBROS[1].color} items={p.equipo.items}
          filas={[['SUB TOTAL', p.equipo.subtotal], ['Depreciación 15 %', p.equipo.depreciacion], ['Imprevistos 10 %', p.equipo.imprevistos]]}
          total={p.equipo.total} />
        <TablaRubro titulo="Materiales" color={RUBROS[2].color} items={p.materiales.items} cantidadLabel="Licencias"
          filas={[['SUB TOTAL', p.materiales.subtotal], ['Imprevistos 10 %', p.materiales.imprevistos]]}
          total={p.materiales.total} />
        <p className="tl-small">{presupuesto.materiales.nota}</p>

        <div className="tl-budget-block">
          <h4 style={{ borderColor: RUBROS[3].color }}>Costos administrativos</h4>
          <div className="viz-table-wrap">
            <table className="viz-table tl-budget">
              <tbody>
                {p.administrativos.items.map((a) => <tr key={a.item}><td>{a.item}</td><td>{bs(a.monto)}</td></tr>)}
                <tr><td>Contratos de soporte externo ({presupuesto.soporteExterno.length})</td><td>{bs(p.administrativos.soporte)}</td></tr>
                <tr className="tl-budget-sub"><td>SUB TOTAL</td><td>{bs(p.administrativos.subtotal)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="tl-budget-grand">
          <div><span>TOTAL MANO DE OBRA</span><strong>{bs(p.manoDeObra.total)}</strong></div>
          <div><span>TOTAL EQUIPO</span><strong>{bs(p.equipo.total)}</strong></div>
          <div><span>TOTAL MATERIALES</span><strong>{bs(p.materiales.total)}</strong></div>
          <div><span>COSTOS ADMINISTRATIVOS</span><strong>{bs(p.administrativos.subtotal)}</strong></div>
          <div className="is-total"><span>TOTAL PRESUPUESTO MENSUAL</span><strong>{bs(p.total)}</strong></div>
        </div>
      </ToolSection>

      <ToolSection badge="COSTO DE CALIDAD" title="¿En qué se va el dinero según el modelo PAF?" lead="Cada línea del presupuesto está clasificada como prevención, evaluación o fallas internas. Un área madura invierte más en prevenir que en corregir.">
        <div className="viz-grid-2">
          <ChartCard title="Presupuesto mensual por categoría de costo de calidad" subtitle="Bs por mes, con cargas e imprevistos prorrateados a cada línea"
            table={{ columns: ['Categoría', 'Bs / mes', '%'], rows: p.coq.map((c) => [c.categoria, bs(c.monto), `${fmt((c.monto / p.total) * 100, 1)} %`]) }}>
            <HBarChart rows={[...p.coq].sort((a, b) => b.monto - a.monto).map((c) => ({ label: c.categoria, value: c.monto, detail: `${fmt((c.monto / p.total) * 100, 1)} % del total` }))} format={(v) => bs(v)} />
          </ChartCard>
          <div className="tl-coq">
            {presupuestoTheory.coq.map((c) => (
              <article key={c.categoria}>
                <h4>{c.categoria}</h4>
                <p>{c.descripcion}</p>
                <small>{c.ejemplo}</small>
              </article>
            ))}
          </div>
        </div>

        <div className="tl-callout">
          <strong>Costo estimado de la no calidad, desde el dataset:</strong> {resultados['No conforme']} revisiones No conformes × {noCalidad.horasNoConforme} h + {resultados['Con observaciones']} con observaciones × {noCalidad.horasConObservaciones} h = {fmt(horasRetrabajo)} h de retrabajo × {bs(costoHora)} por hora ≈ <strong>{bs(costoNoCalidad)}</strong> en {noCalidad.mesesPeriodo} meses (≈ {bs(costoNoCalidad / noCalidad.mesesPeriodo)} al mes). Es solo la falla <em>interna</em>: una herramienta crítica No conforme que deja pasar un defecto al hospital (falla externa) puede costar más que todo el presupuesto anual.
          <p className="tl-small">{noCalidad.nota}</p>
        </div>
      </ToolSection>
    </ToolPageLayout>
  );
}
