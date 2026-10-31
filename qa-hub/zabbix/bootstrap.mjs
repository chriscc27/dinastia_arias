// Configura Zabbix 7.0 para el Área de Calidad usando su API (idempotente: se puede correr varias veces).
//
// Crea:
//  - Grupo "AITECH Calidad"
//  - Host "aitech-qa-kpis": un ítem HTTP que consulta la QA Hub API cada minuto + ítems dependientes (JSONPath)
//    con los KPIs del dataset, y triggers que convierten las metas de calidad en alertas con severidad.
//  - Escenarios web: disponibilidad del sitio público y de la API.
//  - Reapunta el host "Zabbix server" al contenedor zabbix-agent (CPU, RAM, disco del servidor QA Hub).

const URL_API = process.env.ZABBIX_URL || 'http://localhost:8080/api_jsonrpc.php';
const USER = process.env.ZABBIX_USER || 'Admin';
const PASSWORD = process.env.ZABBIX_PASSWORD || 'zabbix';
const QA_HUB = process.env.QA_HUB_INTERNAL_URL || 'http://qa-hub-api:8787';
const SITIO = process.env.PUBLIC_SITE_URL || 'https://chriscc27.github.io/dinastia_arias/';

const HOST = 'aitech-qa-kpis';
const GRUPO = 'AITECH Calidad';

let token = null;
let rpcId = 1;

async function rpc(method, params, auth = true) {
  const headers = { 'Content-Type': 'application/json-rpc' };
  if (auth) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(URL_API, { method: 'POST', headers, body: JSON.stringify({ jsonrpc: '2.0', method, params, id: rpcId++ }) });
  const body = await res.json();
  if (body.error) throw new Error(`${method}: ${body.error.data || body.error.message}`);
  return body.result;
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function conectar() {
  for (let intento = 1; intento <= 60; intento++) {
    try {
      token = await rpc('user.login', { username: USER, password: PASSWORD }, false);
      console.log(`Conectado a Zabbix ${await rpc('apiinfo.version', {}, false)}`);
      return;
    } catch (e) {
      console.log(`Esperando a Zabbix (${intento}/60): ${e.message}`);
      await esperar(5000);
    }
  }
  throw new Error('Zabbix no respondió a tiempo');
}

// KPIs que Zabbix vigila. La clave JSONPath coincide con /api/dataset/kpis?compact=1
const KPIS = [
  { clave: 'tasa_conformidad', nombre: 'Tasa de conformidad de revisiones', unidad: '%', tipo: 0 },
  { clave: 'sin_revision_vigente_pct', nombre: 'Herramientas sin revisión vigente', unidad: '%', tipo: 0 },
  { clave: 'en_uso_no_conforme', nombre: 'Herramientas en uso con revisión No conforme', unidad: '', tipo: 3 },
  { clave: 'criticas_no_conformes_en_uso', nombre: 'Herramientas CRÍTICAS en uso No conformes', unidad: '', tipo: 3 },
  { clave: 'criticas_sin_revision', nombre: 'Herramientas CRÍTICAS nunca revisadas', unidad: '', tipo: 3 },
  { clave: 'categoria_inconsistente_pct', nombre: 'Registros con categoría inconsistente', unidad: '%', tipo: 0 },
  { clave: 'total_herramientas', nombre: 'Total de herramientas en inventario', unidad: '', tipo: 3 },
];

// Metas del Área de Calidad traducidas a triggers (severidad: 2 advertencia, 3 media, 4 alta, 5 desastre).
const TRIGGERS = [
  { descripcion: 'Herramientas críticas en producción con revisión No conforme', expresion: `last(/${HOST}/qa.kpi.criticas_no_conformes_en_uso)>0`, prioridad: 5,
    comentario: 'IEC 62304 / ISO 13485 §7.4: una herramienta crítica No conforme no debe seguir validando software médico. Suspender o remediar.' },
  { descripcion: 'Herramientas críticas nunca revisadas', expresion: `last(/${HOST}/qa.kpi.criticas_sin_revision)>0`, prioridad: 4,
    comentario: 'Toda herramienta de criticidad Crítica requiere validación antes de su uso (herramienta SOUP).' },
  { descripcion: 'Más del 50% del inventario sin revisión vigente', expresion: `last(/${HOST}/qa.kpi.sin_revision_vigente_pct)>50`, prioridad: 4,
    comentario: 'Política interna: revisión anual de cada herramienta del inventario.' },
  { descripcion: 'Tasa de conformidad por debajo de la meta del 75%', expresion: `last(/${HOST}/qa.kpi.tasa_conformidad)<75`, prioridad: 3,
    comentario: 'Meta del plan de calidad: al menos 3 de cada 4 revisiones conformes.' },
  { descripcion: 'Inventario con más del 10% de categorías inconsistentes', expresion: `last(/${HOST}/qa.kpi.categoria_inconsistente_pct)>10`, prioridad: 2,
    comentario: 'Gobierno de datos: la categoría declarada no coincide con la naturaleza de la herramienta.' },
  { descripcion: 'QA Hub API sin datos durante 5 minutos', expresion: `nodata(/${HOST}/qa.kpis.raw,5m)=1`, prioridad: 4,
    comentario: 'La API que alimenta la página y los KPIs no responde.' },
  { descripcion: 'Sitio web del Área de Calidad no disponible', expresion: `last(/${HOST}/web.test.fail[Sitio web AITECH Calidad])<>0`, prioridad: 4,
    comentario: 'El escenario web no obtuvo HTTP 200 del sitio público.' },
];

async function asegurarGrupo() {
  const [g] = await rpc('hostgroup.get', { output: ['groupid'], filter: { name: [GRUPO] } });
  if (g) return g.groupid;
  return (await rpc('hostgroup.create', { name: GRUPO })).groupids[0];
}

async function asegurarHost(groupid) {
  const [h] = await rpc('host.get', { output: ['hostid'], filter: { host: [HOST] } });
  if (h) return h.hostid;
  const r = await rpc('host.create', {
    host: HOST,
    name: 'AITECH · KPIs del Área de Calidad',
    description: 'Indicadores calculados por la QA Hub API sobre el dataset de herramientas de calidad.',
    groups: [{ groupid }],
    tags: [{ tag: 'area', value: 'calidad' }, { tag: 'fuente', value: 'qa-hub-api' }],
  });
  return r.hostids[0];
}

async function asegurarItems(hostid) {
  const existentes = await rpc('item.get', { output: ['itemid', 'key_'], hostids: [hostid] });
  const buscar = (k) => existentes.find((i) => i.key_ === k)?.itemid;

  let maestro = buscar('qa.kpis.raw');
  if (!maestro) {
    maestro = (await rpc('item.create', {
      hostid, name: 'QA Hub · KPIs (JSON crudo)', key_: 'qa.kpis.raw', type: 19, value_type: 4,
      url: `${QA_HUB}/api/dataset/kpis?compact=1`, delay: '1m', history: '7d', timeout: '10s', status_codes: '200',
      tags: [{ tag: 'componente', value: 'api' }],
    })).itemids[0];
  }
  for (const k of KPIS) {
    const key = `qa.kpi.${k.clave}`;
    if (buscar(key)) continue;
    await rpc('item.create', {
      hostid, name: k.nombre, key_: key, type: 18, master_itemid: maestro, value_type: k.tipo, units: k.unidad, history: '90d',
      preprocessing: [{ type: 12, params: `$.kpis.${k.clave}`, error_handler: 0, error_handler_params: '' }],
      tags: [{ tag: 'componente', value: 'kpi-calidad' }],
    });
  }
}

async function asegurarEscenarios(hostid) {
  const existentes = await rpc('httptest.get', { output: ['name'], hostids: [hostid] });
  const escenarios = [
    { name: 'Sitio web AITECH Calidad', url: SITIO, required: '' },
    { name: 'QA Hub API', url: `${QA_HUB}/api/health`, required: '"status":"ok"' },
  ];
  for (const e of escenarios) {
    if (existentes.some((x) => x.name === e.name)) continue;
    await rpc('httptest.create', {
      name: e.name, hostid, delay: '1m', retries: 2,
      steps: [{ name: 'GET', url: e.url, status_codes: '200', no: 1, required: e.required, timeout: '15s' }],
    });
  }
}

async function asegurarTriggers() {
  const existentes = await rpc('trigger.get', { output: ['description'], host: HOST });
  for (const t of TRIGGERS) {
    if (existentes.some((x) => x.description === t.descripcion)) continue;
    await rpc('trigger.create', { description: t.descripcion, expression: t.expresion, priority: t.prioridad, comments: t.comentario, tags: [{ tag: 'area', value: 'calidad' }] });
  }
}

async function reapuntarServidor(groupid) {
  const [h] = await rpc('host.get', { output: ['hostid'], filter: { host: ['Zabbix server'] }, selectInterfaces: ['interfaceid', 'dns', 'useip'], selectHostGroups: ['groupid'] });
  if (!h) return;
  const iface = h.interfaces[0];
  if (iface && (iface.dns !== 'zabbix-agent' || iface.useip !== '0')) {
    await rpc('hostinterface.update', { interfaceid: iface.interfaceid, useip: 0, dns: 'zabbix-agent' });
  }
  const grupos = new Set(h.hostgroups.map((g) => g.groupid));
  grupos.add(groupid);
  await rpc('host.update', { hostid: h.hostid, name: 'QA Hub · Servidor (Zabbix + API + Weka)', groups: [...grupos].map((g) => ({ groupid: g })) });
}

await conectar();
const groupid = await asegurarGrupo();
const hostid = await asegurarHost(groupid);
await asegurarItems(hostid);
await asegurarEscenarios(hostid);
await asegurarTriggers();
await reapuntarServidor(groupid);
console.log('Zabbix configurado para AITECH | Calidad ✔');
