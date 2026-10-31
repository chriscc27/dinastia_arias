import { Link } from 'react-router-dom';
import ToolPageLayout, { ToolSection } from '../components/tools/ToolPageLayout';
import { StatTile, fmt } from '../components/charts/Charts';
import { soporteExternoData as s } from '../data/tools/soporteExternoData';
import { relatedVideosData } from '../data/relatedVideosData';
import presupuesto from '../data/presupuestoData.json';
import kpisSnapshot from '../data/generated/datasetKpis.json';

const bs = (n) => `Bs ${fmt(n, 0)}`;
const SEV_CLASE = { Desastre: 'critical', Alta: 'serious', Media: 'warning', Advertencia: 'notice' };

export default function SoporteExternoPage() {
  const montos = Object.fromEntries(presupuesto.soporteExterno.map((c) => [c.id, c.monto]));
  const totalMensual = presupuesto.soporteExterno.reduce((t, c) => t + c.monto, 0);
  const porCriticidad = Object.fromEntries(kpisSnapshot.matriz_vigencia.map((m) => [m.criticidad, m.celdas.reduce((t, c) => t + c.total, 0)]));

  const { criterios, proveedores } = s.evaluacion;
  const puntajes = proveedores
    .map((p) => ({ ...p, total: p.puntajes.reduce((t, v, i) => t + (v * criterios[i].peso) / 100, 0) }))
    .sort((a, b) => b.total - a.total);

  return (
    <ToolPageLayout data={s} videos={relatedVideosData.soporteExterno}>
      <ToolSection badge="CONTRATOS VIGENTES DEL ÁREA" title="Qué tercerizamos y por qué" lead="Cuatro contratos de soporte externo respaldan los procesos del Área de Calidad. Sus montos están en el presupuesto mensual, en la fila «Contratos de soporte externo».">
        <div className="viz-stats">
          <StatTile label="Contratos de soporte externo" value={presupuesto.soporteExterno.length} sub="más el soporte incluido en las licencias" />
          <StatTile label="Costo mensual" value={bs(totalMensual)} sub={`${bs(totalMensual * 12)} al año`} />
          <StatTile label="Herramientas bajo SLA Crítico" value={fmt(porCriticidad['Crítica'])} sub="respuesta en 1 h, según el dataset" status="critical" />
        </div>
        <div className="tl-contracts">
          {s.contratos.map((c) => (
            <article key={c.id} className="tl-contract">
              <header>
                <span className="tl-chip dark">{c.tipo}</span>
                <strong>{bs(montos[c.id])}<small>/mes</small></strong>
              </header>
              <h4>{c.proveedor}</h4>
              <p>{c.alcance}</p>
              <dl>
                {c.sla.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
              <p className="tl-contract-foot"><strong>Penalidad:</strong> {c.penalidad}</p>
              <p className="tl-contract-foot"><strong>Cómo se mide:</strong> {c.medicion}</p>
            </article>
          ))}
        </div>
        <h3 className="tl-h3">Soporte incluido en las licencias (sin costo adicional)</h3>
        <ul className="tl-included">
          {s.incluidos.map((i) => <li key={i.proveedor}><strong>{i.proveedor}</strong><span>{i.soporte}</span></li>)}
        </ul>
        <div className="tl-downloads">
          <Link className="tl-btn ghost" to="/presupuesto">Ver estos montos en el presupuesto →</Link>
        </div>
      </ToolSection>

      <ToolSection badge="MATRIZ DE ESCALAMIENTO" title="La criticidad del dataset decide el SLA" lead="Cada herramienta del inventario tiene una criticidad. Esa misma criticidad define la severidad del trigger en Zabbix, el tiempo de respuesta exigido al proveedor y quién escala.">
        <div className="viz-table-wrap">
          <table className="viz-table">
            <thead><tr><th>Criticidad</th><th>Herramientas</th><th>Severidad Zabbix</th><th>Respuesta</th><th>Resolución</th><th>Ruta de escalamiento</th></tr></thead>
            <tbody>
              {s.escalamiento.map((e) => (
                <tr key={e.criticidad}>
                  <td><strong>{e.criticidad}</strong></td>
                  <td>{fmt(porCriticidad[e.criticidad])}</td>
                  <td><span className={`tl-sev inline ${SEV_CLASE[e.zabbix]}`}>{e.zabbix}</span></td>
                  <td>{e.respuesta}</td>
                  <td>{e.resolucion}</td>
                  <td>{e.ruta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ToolSection>

      <ToolSection badge="CICLO DE VIDA DEL PROVEEDOR" title="De la necesidad a la renovación" lead="Proceso de gestión de proveedores alineado con ITIL 4 y con ISO 13485 §7.4 (evaluación, selección, seguimiento y reevaluación).">
        <div className="tl-steps seven">
          {s.ciclo.map((c) => (
            <div key={c.paso} className="tl-step">
              <span>{c.paso}</span>
              <h4>{c.titulo}</h4>
              <p>{c.detalle}</p>
            </div>
          ))}
        </div>
      </ToolSection>

      <ToolSection badge="SELECCIÓN DE PROVEEDOR" title="Matriz de evaluación ponderada: soporte Zabbix" lead="Ejemplo aplicado a la contratación del soporte del QA Hub. Puntaje de 1 a 5 por criterio, multiplicado por su peso.">
        <div className="viz-table-wrap">
          <table className="viz-table">
            <thead>
              <tr><th>Criterio</th><th>Peso</th>{proveedores.map((p) => <th key={p.nombre}>{p.nombre}</th>)}</tr>
            </thead>
            <tbody>
              {criterios.map((c, i) => (
                <tr key={c.criterio}>
                  <td>{c.criterio}</td>
                  <td>{c.peso} %</td>
                  {proveedores.map((p) => <td key={p.nombre}>{p.puntajes[i]}</td>)}
                </tr>
              ))}
              <tr className="tl-budget-total">
                <td colSpan={2}>PUNTAJE PONDERADO</td>
                {proveedores.map((p) => <td key={p.nombre}>{fmt(puntajes.find((x) => x.nombre === p.nombre).total, 2)}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="tl-callout">
          <strong>Decisión:</strong> se adjudica a {puntajes[0].nombre} con {fmt(puntajes[0].total, 2)} / 5. {puntajes[1].nombre} tiene mejor SLA, pero su costo y la falta de soporte local en español lo dejan en segundo lugar ({fmt(puntajes[1].total, 2)}).
        </div>
      </ToolSection>

      <ToolSection badge="CONTRATO MODELO" title="Cláusulas que no pueden faltar" lead="Estructura mínima de los contratos de soporte externo del Área de Calidad.">
        <div className="tl-clauses">
          {s.clausulas.map((c, i) => (
            <article key={c.titulo}>
              <span>Cláusula {i + 1}</span>
              <h4>{c.titulo}</h4>
              <p>{c.texto}</p>
            </article>
          ))}
        </div>
      </ToolSection>
    </ToolPageLayout>
  );
}
