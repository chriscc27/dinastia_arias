import ToolPageLayout, { ToolSection } from '../components/tools/ToolPageLayout';
import HubStatusBar from '../components/tools/HubStatusBar';
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

function Arquitectura() {
  return (
    <div className="tl-arch" role="img" aria-label="Arquitectura del QA Hub: la página consulta la API, que habla con Zabbix y Weka">
      <div className="tl-arch-col">
        <span className="tl-arch-label">Internet</span>
        <div className="tl-arch-box web">
          <strong>Página web</strong>
          <span>GitHub Pages · React</span>
        </div>
        <div className="tl-arch-box tableau">
          <strong>Tableau Public</strong>
          <span>Dashboards del dataset</span>
        </div>
      </div>
      <div className="tl-arch-arrow"><span>HTTPS · fetch</span></div>
      <div className="tl-arch-col">
        <span className="tl-arch-label">Puente</span>
        <div className="tl-arch-box tunnel">
          <strong>Cloudflare Tunnel</strong>
          <span>URL pública sin abrir puertos</span>
        </div>
      </div>
      <div className="tl-arch-arrow"><span>:8787</span></div>
      <div className="tl-arch-col wide">
        <span className="tl-arch-label">Servidor QA Hub · docker compose</span>
        <div className="tl-arch-box api">
          <strong>QA Hub API (Node 20)</strong>
          <span>/kpis · /weka · /zabbix · CORS limitado</span>
        </div>
        <div className="tl-arch-row">
          <div className="tl-arch-box zbx">
            <strong>Zabbix 7.0</strong>
            <span>server · web · PostgreSQL · agent 2</span>
          </div>
          <div className="tl-arch-box weka">
            <strong>Weka 3.8.6</strong>
            <span>Java 17 · CLI</span>
          </div>
          <div className="tl-arch-box data">
            <strong>Dataset</strong>
            <span>CSV · ARFF</span>
          </div>
        </div>
        <p className="tl-arch-note">La API consulta Zabbix por JSON-RPC y, a la vez, Zabbix consulta la API cada minuto para convertir los KPIs en ítems y triggers.</p>
      </div>
    </div>
  );
}

export default function MonitoreoPage() {
  const recurso = useHubResource('/api/zabbix/summary', zabbixSnapshot, { pollMs: 30000 });
  const z = recurso.data;
  const cpu = z.servidor.find((s) => s.clave === 'system.cpu.util');
  const uptime = z.servidor.find((s) => s.clave === 'system.uptime');

  return (
    <ToolPageLayout data={monitoreoData} videos={relatedVideosData.monitoreo}>
      <ToolSection badge="ARQUITECTURA DE CONEXIÓN" title="Cómo se conecta Zabbix con la página" lead="GitHub Pages solo sirve archivos estáticos, así que las herramientas viven en un servidor propio, el QA Hub: un docker compose que corre en una PC del laboratorio o en una VPS y se publica con Cloudflare Tunnel. La página nunca ve las credenciales de Zabbix: solo habla con la API.">
        <Arquitectura />
      </ToolSection>

      <ToolSection badge="DEMOSTRACIÓN · ZABBIX EN VIVO" title="Panel de monitoreo del Área de Calidad" lead={`Problemas, KPIs vigilados y estado del servidor según Zabbix ${z.zabbix_version}. Con el servidor conectado, este panel se actualiza solo cada 30 segundos.`} id="panel">
        <HubStatusBar resource={recurso} fuente={`Zabbix ${z.zabbix_version} vía API JSON-RPC`} actualizado={z.generado} />

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

      <ToolSection badge="PUESTA EN MARCHA" title="Levantar el QA Hub" lead="Todo está en la carpeta qa-hub del repositorio; Zabbix se configura solo por API, así cualquier integrante puede reproducirlo.">
        <ol className="tl-commands">
          {monitoreoData.pasos.map((p) => (
            <li key={p.comando}>
              <code>{p.comando}</code>
              <span>{p.detalle}</span>
            </li>
          ))}
        </ol>
      </ToolSection>
    </ToolPageLayout>
  );
}
