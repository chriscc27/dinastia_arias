// Cliente mínimo de la API JSON-RPC de Zabbix 7.0.
// Las credenciales viven solo en el servidor: el navegador nunca habla directo con Zabbix.

export const HOST_KPIS = 'aitech-qa-kpis';
export const GRUPO = 'AITECH Calidad';

export const SEVERIDADES = ['No clasificada', 'Información', 'Advertencia', 'Media', 'Alta', 'Desastre'];

export function createZabbixClient({ url, user, password }) {
  let token = null;
  let id = 1;

  async function rpc(method, params, auth = true) {
    const headers = { 'Content-Type': 'application/json-rpc' };
    if (auth) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ jsonrpc: '2.0', method, params, id: id++ }), signal: AbortSignal.timeout(8000) });
    const body = await res.json();
    if (body.error) {
      const err = new Error(`${method}: ${body.error.data || body.error.message}`);
      err.sesion = /session|re-login|Not authorised/i.test(body.error.data || '');
      throw err;
    }
    return body.result;
  }

  async function login() {
    token = await rpc('user.login', { username: user, password }, false);
  }

  async function call(method, params = {}) {
    if (!token) await login();
    try {
      return await rpc(method, params);
    } catch (err) {
      if (!err.sesion) throw err;
      await login();
      return rpc(method, params);
    }
  }

  return { call, version: () => rpc('apiinfo.version', {}, false) };
}

// Versión sin Zabbix: genera el mismo esquema a partir de los KPIs del dataset.
// Se usa cuando ZABBIX_URL no está configurado o Zabbix no responde.
export async function mockZabbixSummary(resumen) {
  const { kpis } = resumen;
  const now = new Date().toISOString();

  const kpiItems = [
    { clave: 'qa.kpi.tasa_conformidad', nombre: 'Tasa de conformidad (%)', valor: kpis.tasa_conformidad, unidad: '%' },
    { clave: 'qa.kpi.sin_revision_vigente_pct', nombre: 'Sin revisión vigente (%)', valor: kpis.sin_revision_vigente_pct, unidad: '%' },
    { clave: 'qa.kpi.criticas_no_conformes_en_uso', nombre: 'Herramientas críticas NC en uso', valor: kpis.criticas_no_conformes_en_uso, unidad: '' },
    { clave: 'qa.kpi.criticas_sin_revision', nombre: 'Críticas sin revisión', valor: kpis.criticas_sin_revision, unidad: '' },
    { clave: 'qa.kpi.en_uso_no_conforme', nombre: 'En uso y No conformes', valor: kpis.en_uso_no_conforme, unidad: '' },
    { clave: 'qa.kpi.categoria_inconsistente_pct', nombre: 'Categoría inconsistente (%)', valor: kpis.categoria_inconsistente_pct, unidad: '%' },
    { clave: 'qa.kpi.riesgo_alto', nombre: 'Herramientas con riesgo alto', valor: kpis.riesgo_alto, unidad: '' },
  ].map((k) => ({ ...k, actualizado: now }));

  const triggers = [];
  let tid = 1;
  if (kpis.criticas_no_conformes_en_uso > 0)
    triggers.push({ id: String(tid++), descripcion: `Herramientas críticas en producción con revisión No conforme: ${kpis.criticas_no_conformes_en_uso}`, severidad: 'Desastre', prioridad: 5, host: 'AITECH QA Hub', desde: now, comentario: 'ISO 13485 §7.4: estas herramientas deben suspenderse o remediarse de inmediato.' });
  if (kpis.sin_revision_vigente_pct > 70)
    triggers.push({ id: String(tid++), descripcion: `Sin revisión vigente: ${kpis.sin_revision_vigente_pct} % (meta ≤ 30 %)`, severidad: 'Alta', prioridad: 4, host: 'AITECH QA Hub', desde: now, comentario: 'El 70 % del inventario sin revisión anual supera el umbral crítico.' });
  if (kpis.tasa_conformidad < 70)
    triggers.push({ id: String(tid++), descripcion: `Conformidad ${kpis.tasa_conformidad} %, bajo el mínimo del 70 % (meta 75 %)`, severidad: 'Alta', prioridad: 4, host: 'AITECH QA Hub', desde: now, comentario: 'La tasa de conformidad no alcanza ni el umbral de emergencia.' });
  if (kpis.criticas_sin_revision > 10)
    triggers.push({ id: String(tid++), descripcion: `Herramientas críticas nunca revisadas: ${kpis.criticas_sin_revision}`, severidad: 'Media', prioridad: 3, host: 'AITECH QA Hub', desde: now, comentario: 'Más de 10 herramientas críticas sin ninguna revisión registrada.' });
  if (kpis.en_uso_no_conforme > 20)
    triggers.push({ id: String(tid++), descripcion: `En uso con resultado No conforme: ${kpis.en_uso_no_conforme} herramientas`, severidad: 'Media', prioridad: 3, host: 'AITECH QA Hub', desde: now, comentario: 'Supera el umbral de 20 herramientas activas con no-conformidad.' });
  if (kpis.categoria_inconsistente_pct > 25)
    triggers.push({ id: String(tid++), descripcion: `Calidad del dato: ${kpis.categoria_inconsistente_pct} % con categoría inconsistente`, severidad: 'Advertencia', prioridad: 2, host: 'AITECH QA Hub', desde: now, comentario: 'Más del 25 % de registros con la categoría equivocada.' });

  // Chequeo real de disponibilidad de los dos sitios vigilados
  const sites = [
    { nombre: 'Sitio público AITECH', url: 'https://chriscc27.github.io/dinastia_arias/' },
    { nombre: 'QA Hub API', url: 'https://chriscc27.github.io/dinastia_arias/' },
  ];
  const escenarios = await Promise.all(
    sites.map(async (s) => {
      const t0 = Date.now();
      try {
        const r = await fetch(s.url, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
        return { nombre: s.nombre, url: s.url, ok: r.ok, tiempo_respuesta_ms: Date.now() - t0 };
      } catch {
        return { nombre: s.nombre, url: s.url, ok: false, tiempo_respuesta_ms: null };
      }
    }),
  );

  return {
    zabbix_version: 'sin-zabbix (datos del dataset)',
    generado: now,
    hosts: [{ nombre: 'AITECH QA Hub', host: 'aitech-qa-kpis', activo: true, disponibilidad: 'Disponible' }],
    problemas: triggers,
    kpis: kpiItems,
    servidor: [],
    escenarios_web: escenarios,
    historial_cpu: [],
  };
}

// Resumen que consume la página /monitoreo: hosts, problemas activos, KPIs vigilados y escenarios web.
export async function zabbixSummary(zbx) {
  const [version, grupos] = await Promise.all([zbx.version(), zbx.call('hostgroup.get', { output: ['groupid'], filter: { name: [GRUPO] } })]);
  const groupids = grupos.map((g) => g.groupid);

  const hosts = await zbx.call('host.get', {
    output: ['hostid', 'host', 'name', 'status'],
    groupids,
    selectInterfaces: ['type', 'available', 'dns', 'ip'],
  });
  const hostids = hosts.map((h) => h.hostid);

  const [triggers, items, escenarios] = await Promise.all([
    zbx.call('trigger.get', {
      output: ['triggerid', 'description', 'priority', 'lastchange', 'value', 'comments'],
      hostids,
      filter: { value: 1 },
      monitored: true,
      skipDependent: true,
      expandDescription: true,
      selectHosts: ['name'],
      sortfield: 'priority',
      sortorder: 'DESC',
    }),
    zbx.call('item.get', {
      output: ['itemid', 'hostid', 'name', 'key_', 'lastvalue', 'lastclock', 'units', 'value_type'],
      hostids,
      search: { key_: 'qa.kpi.' },
      searchByAny: true,
      sortfield: 'name',
    }),
    zbx.call('httptest.get', { output: ['httptestid', 'name', 'hostid'], hostids, selectSteps: ['name', 'url'] }),
  ]);

  const servidor = await zbx.call('item.get', {
    output: ['itemid', 'name', 'key_', 'lastvalue', 'lastclock', 'units'],
    hostids,
    filter: { key_: ['system.cpu.util', 'vm.memory.utilization', 'system.uptime', 'agent.ping'] },
  });

  const webItems = escenarios.length
    ? await zbx.call('item.get', {
      output: ['name', 'key_', 'lastvalue', 'lastclock', 'units'],
      hostids,
      webitems: true,
      search: { key_: 'web.test.' },
    })
    : [];

  const cpu = servidor.find((i) => i.key_ === 'system.cpu.util');
  const historialCpu = cpu
    ? await zbx.call('history.get', { output: ['clock', 'value'], itemids: [cpu.itemid], history: 0, sortfield: 'clock', sortorder: 'DESC', limit: 60 })
    : [];

  return {
    zabbix_version: version,
    generado: new Date().toISOString(),
    hosts: hosts.map((h) => ({
      nombre: h.name,
      host: h.host,
      activo: h.status === '0',
      disponibilidad: h.interfaces.length ? (h.interfaces.some((i) => i.available === '1') ? 'Disponible' : h.interfaces.some((i) => i.available === '2') ? 'No disponible' : 'Desconocida') : 'Sin agente (HTTP)',
    })),
    problemas: triggers.map((t) => ({
      id: t.triggerid,
      descripcion: t.description,
      severidad: SEVERIDADES[Number(t.priority)],
      prioridad: Number(t.priority),
      host: t.hosts[0]?.name,
      desde: new Date(Number(t.lastchange) * 1000).toISOString(),
      comentario: t.comments,
    })),
    // lastclock = 0 significa que Zabbix todavía no recolectó el ítem: se informa como "sin dato", no como 0.
    kpis: items.map((i) => ({ clave: i.key_, nombre: i.name, valor: Number(i.lastclock) ? Number(i.lastvalue) : null, unidad: i.units, actualizado: Number(i.lastclock) ? new Date(Number(i.lastclock) * 1000).toISOString() : null })),
    servidor: servidor.filter((i) => Number(i.lastclock)).map((i) => ({ clave: i.key_, nombre: i.name, valor: Number(i.lastvalue), unidad: i.units })),
    escenarios_web: escenarios.map((e) => {
      const fallo = webItems.find((i) => i.key_ === `web.test.fail[${e.name}]`);
      const tiempo = webItems.find((i) => i.key_.startsWith(`web.test.time[${e.name},`) && i.key_.endsWith(',resp]'));
      return {
        nombre: e.name,
        url: e.steps[0]?.url,
        ok: fallo ? fallo.lastvalue === '0' : null,
        tiempo_respuesta_ms: tiempo && tiempo.lastvalue !== '' ? Math.round(Number(tiempo.lastvalue) * 1000) : null,
      };
    }),
    historial_cpu: historialCpu.reverse().map((h) => ({ t: Number(h.clock) * 1000, v: Math.round(Number(h.value) * 100) / 100 })),
  };
}
