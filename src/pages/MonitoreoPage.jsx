import ToolPageLayout, { ToolSection } from '../components/tools/ToolPageLayout';
import { ChartCard, LineArea, fmt } from '../components/charts/Charts';
import { useHubResource } from '../lib/qaHub';
import { monitoreoData } from '../data/tools/monitoreoData';
import { relatedVideosData } from '../data/relatedVideosData';
import zabbixSnapshot from '../data/generated/zabbixSnapshot.json';

const SEVERIDAD = {
  Desastre: { clase: 'critical', icono: '✕' },
  Alta: { clase: 'serious', icono: '▲' },
  Media: { clase: 'warning', icono: '!' },
  Advertencia: { clase: 'notice', icono: 'i' },
  Información: { clase: 'notice', icono: 'i' },
};

// Umbral de cada KPI según los triggers configurados por qa-hub/zabbix/bootstrap.mjs
const UMBRALES = {
  'qa.kpi.tasa_conformidad': { meta: '≥ 75 %', mal: (v) => v < 75 },
  'qa.kpi.sin_revision_vigente_pct': { meta: '≤ 50 %', mal: (v) => v > 50 },
  'qa.kpi.criticas_no_conformes_en_uso': { meta: '= 0', mal: (v) => v > 0 },
  'qa.kpi.criticas_sin_revision': { meta: '= 0', mal: (v) => v > 0 },
  'qa.kpi.categoria_inconsistente_pct': { meta: '≤ 10 %', mal: (v) => v > 10 },
  'qa.kpi.en_uso_no_conforme': { meta: 'informativo', mal: () => false },
  'qa.kpi.total_herramientas': { meta: 'informativo', mal: () => false },
};

const hace = (iso) => {
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 60) return `hace ${min} min`;
  if (min < 1440) return `hace ${Math.round(min / 60)} h`;
  return `hace ${Math.round(min / 1440)} días`;
};

export default function MonitoreoPage() {
  const recurso = useHubResource('/api/zabbix/summary', zabbixSnapshot, { pollMs: 30000 });
  const z = recurso.data;
  const cpu = z.servidor.find((s) => s.clave === 'system.cpu.util');
  const uptime = z.servidor.find((s) => s.clave === 'system.uptime');

  return (
    <ToolPageLayout data={monitoreoData} videos={relatedVideosData.monitoreo}>
      <ToolSection badge="DEMOSTRACIÓN · MONITOREO" title="Panel de monitoreo del Área de Calidad" lead="Problemas, KPIs vigilados y estado de disponibilidad según las métricas y reglas de calidad." id="panel">
        <div className="tl-hosts">
          {z.hosts.map((h) => (
            <div key={h.host} className="tl-host">
              <span className={`viz-status-dot ${h.disponibilidad === 'No disponible' ? 'critical' : 'good'}`} aria-hidden="true" />
              <div>
                <strong>{h.nombre}</strong>
                <span>{h.host} · {h.disponibilidad}</span>
              </div>
            </div>
          ))}
          {z.escenarios_web.map((e) => (
            <div key={e.nombre} className="tl-host">
              <span className={`viz-status-dot ${e.ok === false ? 'critical' : e.ok ? 'good' : 'neutral'}`} aria-hidden="true" />
              <div>
                <strong>Escenario web · {e.nombre}</strong>
                <span>{e.ok === null ? 'Sin datos aún' : e.ok ? `HTTP 200 · ${fmt(e.tiempo_respuesta_ms)} ms` : 'Falla'}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="viz-grid-2">
          <ChartCard title={`Problemas activos (${z.problemas.length})`} subtitle="Triggers en estado PROBLEMA, ordenados por severidad">
            <ul className="tl-problems">
              {z.problemas.length === 0 && <li className="tl-problem none">Sin problemas activos ✓</li>}
              {z.problemas.map((p) => {
                const s = SEVERIDAD[p.severidad] || SEVERIDAD.Información;
                return (
                  <li key={p.id} className={`tl-problem ${s.clase}`}>
                    <span className="tl-sev"><span aria-hidden="true">{s.icono}</span>{p.severidad}</span>
                    <div>
                      <strong>{p.descripcion}</strong>
                      <span>{p.host} · {hace(p.desde)}</span>
                      {p.comentario && <em>{p.comentario}</em>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </ChartCard>

          <ChartCard title="KPIs de calidad vigilados por Zabbix" subtitle="Ítems dependientes del ítem HTTP que consulta la QA Hub API cada minuto"
            table={{ columns: ['Ítem', 'Clave', 'Último valor', 'Meta'], rows: z.kpis.map((k) => [k.nombre, k.clave, k.valor === null ? '—' : `${fmt(k.valor, 1)} ${k.unidad}`, UMBRALES[k.clave]?.meta || '']) }}>
            <div className="tl-kpi-list">
              {z.kpis.map((k) => {
                const u = UMBRALES[k.clave];
                const mal = k.valor !== null && u?.mal(k.valor);
                return (
                  <div key={k.clave} className={`tl-kpi ${mal ? 'is-bad' : ''}`}>
                    <span>{k.nombre}</span>
                    <strong>{k.valor === null ? '—' : `${fmt(k.valor, k.unidad === '%' ? 1 : 0)}${k.unidad === '%' ? ' %' : ''}`}</strong>
                    <em>{mal ? '✕ fuera de meta' : '✓'} · meta {u?.meta}</em>
                  </div>
                );
              })}
            </div>
          </ChartCard>
        </div>

        <ChartCard wide title="CPU del servidor QA Hub" subtitle={`system.cpu.util · último valor ${fmt(cpu?.valor, 1)} % · uptime ${uptime ? fmt(uptime.valor / 3600, 1) : '—'} h`}>
          <LineArea points={z.historial_cpu} />
        </ChartCard>
      </ToolSection>

      <ToolSection badge="QUÉ MONITOREA CALIDAD" title="Tres capas de monitoreo" lead="No basta con saber si el servidor está encendido: lo que le importa al área es si las herramientas con las que validamos software médico están en regla.">
        <div className="tl-layers">
          {monitoreoData.capas.map((c) => (
            <article key={c.capa} className="tl-layer">
              <h4>{c.capa}</h4>
              <p>{c.fuente}</p>
              <ul>{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </article>
          ))}
        </div>
        <h3 className="tl-h3">De la meta de calidad al trigger</h3>
        <div className="viz-table-wrap">
          <table className="viz-table">
            <thead><tr><th>Severidad</th><th>Regla (expresión)</th><th>Qué significa para el área</th></tr></thead>
            <tbody>
              {monitoreoData.triggers.map((t) => {
                const s = SEVERIDAD[t.severidad];
                return (
                  <tr key={t.regla}>
                    <td><span className={`tl-sev inline ${s.clase}`}><span aria-hidden="true">{s.icono}</span>{t.severidad}</span></td>
                    <td><code>{t.regla}</code></td>
                    <td>{t.significado}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ToolSection>
    </ToolPageLayout>
  );
}
