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
