// QA Hub API – puente entre la página web (GitHub Pages) y las herramientas del Área de Calidad.
//
//   GET  /api/health                 estado de la API y de sus conexiones
//   GET  /api/dataset/kpis           KPIs del dataset (tablero Tableau/página). ?compact=1 -> formato plano para Zabbix
//   GET  /api/weka/results           últimos resultados de los 5 experimentos Weka
//   POST /api/weka/run/:id           vuelve a ejecutar un experimento Weka en el servidor
//   GET  /api/zabbix/summary         hosts, problemas, KPIs vigilados y escenarios web desde Zabbix
import http from 'node:http';
import path from 'node:path';
import { loadDataset } from './lib/dataset.js';
import { computeKpis } from './lib/kpis.js';
import { EXPERIMENT_IDS, runAll, runExperiment } from './lib/weka.js';
import { createZabbixClient, zabbixSummary } from './lib/zabbix.js';

const PORT = Number(process.env.PORT || 8787);
const DATA_DIR = process.env.DATA_DIR || path.resolve('..', 'data');
const WEKA = { cp: process.env.WEKA_CP || path.resolve('..', 'weka', 'lib', '*'), arff: path.join(DATA_DIR, 'dataset_calidad.arff') };
const ORIGENES = (process.env.ALLOWED_ORIGINS || 'http://localhost:6767').split(',').map((o) => o.trim());
const ESPERA_ENTRE_CORRIDAS_MS = 20000;

const zabbix = process.env.ZABBIX_URL
  ? createZabbixClient({ url: process.env.ZABBIX_URL, user: process.env.ZABBIX_USER, password: process.env.ZABBIX_PASSWORD })
  : null;

const wekaResultados = {};
const ultimaCorrida = {};
let cacheZabbix = { t: 0, data: null };

function enviar(req, res, status, cuerpo) {
  const origen = req.headers.origin;
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Vary: 'Origin' };
  if (origen && ORIGENES.includes(origen)) {
    headers['Access-Control-Allow-Origin'] = origen;
    headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
  }
  res.writeHead(status, headers);
  res.end(status === 204 ? undefined : JSON.stringify(cuerpo));
}

function aplanarKpis(resumen) {
  // Formato pensado para el ítem maestro HTTP de Zabbix (preprocesamiento JSONPath $.kpis.<clave>).
  return { kpis: resumen.kpis, fecha_corte: resumen.meta.fecha_corte, generado: resumen.meta.generado };
}

async function zabbixCacheado() {
  if (!zabbix) throw new Error('ZABBIX_URL no configurado');
  if (Date.now() - cacheZabbix.t < 15000) return cacheZabbix.data;
  const data = await zabbixSummary(zabbix);
  cacheZabbix = { t: Date.now(), data };
  return data;
}

const rutas = {
  'GET /api/health': async () => {
    let estadoZabbix = 'no configurado';
    if (zabbix) {
      try { estadoZabbix = `ok (Zabbix ${await zabbix.version()})`; } catch (e) { estadoZabbix = `error: ${e.message}`; }
    }
    return { status: 'ok', servicio: 'AITECH QA Hub', hora: new Date().toISOString(), dataset: `${loadDataset(DATA_DIR).length} registros`, weka: `${Object.keys(wekaResultados).length}/${EXPERIMENT_IDS.length} experimentos listos`, zabbix: estadoZabbix };
  },
  'GET /api/dataset/kpis': async (req, url) => {
    const resumen = computeKpis(loadDataset(DATA_DIR));
    return url.searchParams.get('compact') ? aplanarKpis(resumen) : resumen;
  },
  'GET /api/weka/results': async () => {
    if (Object.keys(wekaResultados).length < EXPERIMENT_IDS.length) Object.assign(wekaResultados, await runAll(WEKA));
    return wekaResultados;
  },
  'GET /api/zabbix/summary': () => zabbixCacheado(),
};

async function manejar(req, res) {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'OPTIONS') return enviar(req, res, 204);

  const correr = url.pathname.match(/^\/api\/weka\/run\/([a-z0-9-]+)$/);
  if (req.method === 'POST' && correr) {
    const id = correr[1];
    if (!EXPERIMENT_IDS.includes(id)) return enviar(req, res, 404, { error: 'Experimento no encontrado' });
    const espera = ESPERA_ENTRE_CORRIDAS_MS - (Date.now() - (ultimaCorrida[id] || 0));
    if (espera > 0) return enviar(req, res, 429, { error: `Espera ${Math.ceil(espera / 1000)} s antes de volver a ejecutarlo`, resultado: wekaResultados[id] });
    ultimaCorrida[id] = Date.now();
    wekaResultados[id] = await runExperiment(id, WEKA);
    return enviar(req, res, 200, wekaResultados[id]);
  }

  const ruta = rutas[`${req.method} ${url.pathname}`];
  if (!ruta) return enviar(req, res, 404, { error: 'Ruta no encontrada' });
  return enviar(req, res, 200, await ruta(req, url));
}

http
  .createServer((req, res) => {
    manejar(req, res).catch((err) => {
      console.error(err);
      enviar(req, res, 502, { error: err.message });
    });
  })
  .listen(PORT, () => {
    console.log(`QA Hub API escuchando en :${PORT} | CORS: ${ORIGENES.join(', ')}`);
    // Precalienta los resultados de Weka para que la primera visita no espere.
    runAll(WEKA).then((r) => Object.assign(wekaResultados, r)).catch((e) => console.error('Weka:', e.message));
  });
