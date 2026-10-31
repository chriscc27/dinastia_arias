import { useState } from 'react';
import ToolPageLayout, { ToolSection } from '../components/tools/ToolPageLayout';
import HubStatusBar from '../components/tools/HubStatusBar';
import { ChartCard, HBarChart, fmt } from '../components/charts/Charts';
import { hubFetch, useHubResource } from '../lib/qaHub';
import { wekaData } from '../data/tools/wekaData';
import { relatedVideosData } from '../data/relatedVideosData';
import wekaSnapshot from '../data/generated/wekaResults.json';

const ARFF_MUESTRA = `@relation aitech_herramientas_calidad

@attribute herramienta_base {'Allure Reporting Service', ... ,'k6 Performance Runner'}
@attribute categoria_herramienta {'Análisis de Código','Automatización de Pruebas','Gestión de Bugs','Pruebas de Rendimiento'}
@attribute rol_responsable {'Performance Eng','QA Auditor','QA Lead', ...}
@attribute criticidad {Alta,Baja,Crítica,Media}
@attribute estado_gestion {'En revisión','En uso',Retirado,Suspendido}
@attribute revision_vigente {No,Sí}
@attribute nivel_criticidad numeric
@attribute dias_desde_revision numeric
@attribute resultado_revision {Conforme,'Con observaciones','No conforme','Sin revisión'}

@data
'Snyk Open Source Security QA','Pruebas de Rendimiento',...,'Crítica','En revisión','Sí',4,...,202,'Conforme'`;

const PERFILES = [
  { nombre: 'En remediación', tono: 'warning' },
  { nombre: 'Núcleo crítico conforme', tono: 'good' },
  { nombre: 'Operación estándar', tono: 'good' },
  { nombre: 'Brecha de control', tono: 'critical' },
];

const ETIQUETAS_ATRIBUTO = {
  criticidad: 'Criticidad (moda)',
  estado_gestion: 'Estado (moda)',
  nivel_criticidad: 'Nivel de criticidad (1–4)',
  dias_creacion_a_revision: 'Días de creación a revisión',
  dias_desde_revision: 'Días desde la última revisión',
  resultado_revision: 'Resultado (moda)',
};

function SalidaWeka({ texto }) {
  return (
    <details className="tl-weka-raw">
      <summary>Ver salida original de Weka</summary>
      <pre>{texto}</pre>
    </details>
  );
}

function Clasificacion({ r }) {
  const j48 = r.modelos[1];
  return (
    <>
      <div className="viz-table-wrap">
        <table className="viz-table">
          <thead><tr><th>Modelo</th><th>Exactitud (CV 10)</th><th>Kappa</th><th>Correctas</th></tr></thead>
          <tbody>
            {r.modelos.map((m) => (
              <tr key={m.nombre}><td>{m.nombre}</td><td>{fmt(m.exactitud, 2)} %</td><td>{fmt(m.kappa, 3)}</td><td>{m.correctas} / {m.instancias}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="tl-weka-split">
        <div>
          <h5>Árbol J48 resultante</h5>
          <pre className="tl-tree">{j48.arbol}</pre>
          <p className="tl-small">{j48.hojas} hoja(s): el árbol podado no encontró ninguna división que mejore la predicción.</p>
        </div>
        <div>
          <h5>Matriz de confusión (J48)</h5>
          <table className="viz-table compact">
            <thead><tr><th>Real ↓ / Predicho →</th>{j48.matriz_confusion.map((f) => <th key={f.clase}>{f.clase}</th>)}</tr></thead>
            <tbody>{j48.matriz_confusion.map((f) => <tr key={f.clase}><td>{f.clase}</td>{f.valores.map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ArbolNoConformes({ r }) {
  return (
    <>
      <div className="tl-metrics-row">
        <span><strong>{fmt(r.exactitud, 1)} %</strong> exactitud</span>
        <span><strong>{fmt(r.kappa, 3)}</strong> Kappa</span>
        <span><strong>{r.hojas}</strong> hojas</span>
      </div>
      <div className="tl-branches">
        {r.ramas.map((b) => (
          <div key={b.herramienta} className={`tl-branch ${b.prediccion === 'No conforme' ? 'is-nc' : ''}`}>
            <span className="tl-branch-icon" aria-hidden="true">{b.prediccion === 'No conforme' ? '✕' : '✓'}</span>
            <span>{b.herramienta}</span>
            <em>{b.prediccion}</em>
          </div>
        ))}
      </div>
    </>
  );
}

function Ranking({ r }) {
  return (
    <ChartCard title="Ganancia de información respecto a resultado_revision" subtitle="bits; 0 = el atributo no aporta nada para predecir la clase"
      table={{ columns: ['Atributo', 'Ganancia'], rows: r.ranking.map((a) => [a.atributo, a.ganancia]) }}>
      <HBarChart rows={r.ranking.map((a) => ({ label: a.atributo, value: a.ganancia }))} format={(v) => fmt(v, 4)} />
    </ChartCard>
  );
}

function Clusters({ r }) {
  return (
    <div className="tl-clusters">
      {r.tamanos.map((t, i) => (
        <article key={t.cluster} className={`tl-cluster ${PERFILES[i]?.tono}`}>
          <header>
            <span>Cluster {t.cluster}</span>
            <strong>{PERFILES[i]?.nombre}</strong>
            <em>{t.instancias} herramientas · {t.pct} %</em>
          </header>
          <dl>
            {r.atributos.map((a) => (
              <div key={a.atributo}>
                <dt>{ETIQUETAS_ATRIBUTO[a.atributo] || a.atributo}</dt>
                <dd>{Number.isNaN(Number(a.clusters[i])) ? a.clusters[i] : fmt(Number(a.clusters[i]), 1)}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
      <p className="tl-small">SSE intra-cluster: {fmt(r.sse, 1)} · {r.iteraciones} iteraciones. Los días se imputan con la media cuando la herramienta no tiene revisión.</p>
    </div>
  );
}

function Reglas({ r }) {
  return (
    <div className="viz-table-wrap">
      <table className="viz-table">
        <thead><tr><th>#</th><th>Si…</th><th>Entonces…</th><th>Soporte</th><th>Confianza</th><th>Lift</th></tr></thead>
        <tbody>
          {r.reglas.map((g, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td><code>{g.antecedente}</code></td>
              <td><code>{g.consecuente}</code></td>
              <td>{g.soporte_regla}</td>
              <td>{fmt(g.confianza * 100, 0)} %</td>
              <td>{fmt(g.lift, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const VISTAS = {
  'clasificacion-j48': Clasificacion,
  'j48-no-conformes': ArbolNoConformes,
  'ranking-atributos': Ranking,
  'clustering-kmeans': Clusters,
  'asociacion-apriori': Reglas,
};

export default function WekaPage() {
  const recurso = useHubResource('/api/weka/results', wekaSnapshot);
  const [corridas, setCorridas] = useState({});
  const [estado, setEstado] = useState({});
  const resultados = { ...recurso.data, ...corridas };

  const ejecutar = async (id) => {
    setEstado((e) => ({ ...e, [id]: { cargando: true } }));
    try {
      const r = await hubFetch(recurso.base, `/api/weka/run/${id}`, { method: 'POST', timeout: 120000 });
      setCorridas((c) => ({ ...c, [id]: r }));
      setEstado((e) => ({ ...e, [id]: { mensaje: `Ejecutado en el servidor en ${fmt(r.duracion_ms / 1000, 1)} s` } }));
    } catch (err) {
      setEstado((e) => ({ ...e, [id]: { error: err.message } }));
    }
  };

  const primero = Object.values(resultados)[0];

  return (
    <ToolPageLayout data={wekaData} videos={relatedVideosData.weka}>
      <ToolSection badge="EL REPERTORIO" title="Algoritmos utilizados" lead="Weka no trae un modelo: trae un repertorio. Cada pregunta del Área de Calidad pide una tarea distinta.">
        <div className="viz-table-wrap">
          <table className="viz-table">
            <thead><tr><th>Tarea</th><th>Algoritmo</th><th>Origen</th><th>Idea central</th></tr></thead>
            <tbody>{wekaData.algoritmos.map((a) => <tr key={a.algoritmo}><td>{a.tarea}</td><td><strong>{a.algoritmo}</strong></td><td>{a.autor}</td><td>{a.idea}</td></tr>)}</tbody>
          </table>
        </div>
      </ToolSection>

      <ToolSection badge="PREPROCESAMIENTO" title="Del Excel al archivo ARFF" lead="prepare_dataset.py limpia el Excel, deriva atributos y genera el ARFF. Antes de clasificar se quitan las herramientas sin revisión y el atributo riesgo_operativo, porque se calcula a partir del propio resultado (sería hacer trampa: fuga de información).">
        <pre className="tl-arff"><code>{ARFF_MUESTRA}</code></pre>
      </ToolSection>

      <ToolSection
        badge="DEMOSTRACIÓN · WEKA SOBRE EL DATASET"
        title="Cinco experimentos, resultados reales"
        lead="Cada bloque muestra la configuración exacta, el resultado que devolvió Weka y su lectura para la gestión. Con el servidor conectado, el botón vuelve a ejecutar el experimento en el QA Hub."
        id="experimentos"
      >
        <HubStatusBar resource={recurso} fuente="Weka 3.8.6 ejecutado por la QA Hub API" actualizado={primero?.ejecutado} />
        <div className="tl-experiments">
          {Object.entries(VISTAS).map(([id, Vista], i) => {
            const r = resultados[id];
            if (!r) return null;
            const e = estado[id] || {};
            return (
              <article key={id} className="tl-experiment">
                <header>
                  <span className="tl-exp-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{r.titulo}</h3>
                    <code>{r.algoritmo}</code>
                  </div>
                  {recurso.live && (
                    <button type="button" className="tl-btn" onClick={() => ejecutar(id)} disabled={e.cargando}>
                      {e.cargando ? 'Ejecutando Weka…' : 'Ejecutar en el servidor'}
                    </button>
                  )}
                </header>
                {(e.mensaje || e.error) && <p className={`tl-hub-msg ${e.error ? 'error' : 'ok'}`}>{e.error || e.mensaje}</p>}
                <Vista r={r} />
                <div className="tl-reading">
                  <span>Lectura para la gestión</span>
                  <p>{wekaData.lecturas[id]}</p>
                </div>
                <SalidaWeka texto={r.salida} />
                <p className="tl-small">Ejecutado: {new Date(r.ejecutado).toLocaleString('es-BO')} · {fmt(r.duracion_ms / 1000, 1)} s</p>
              </article>
            );
          })}
        </div>
      </ToolSection>
    </ToolPageLayout>
  );
}
