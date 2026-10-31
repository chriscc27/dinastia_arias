// Indicadores del Área de Calidad calculados sobre el inventario de herramientas.
// Es la misma lógica que alimenta el tablero de la página, las vistas de Tableau y los ítems de Zabbix.

export const FECHA_CORTE = '2026-04-30';
export const RESULTADOS = ['Conforme', 'Con observaciones', 'No conforme', 'Sin revisión'];
const CRITICIDADES = ['Crítica', 'Alta', 'Media', 'Baja'];
const ESTADOS = ['En uso', 'En revisión', 'Suspendido', 'Retirado'];

const pct = (parte, total) => (total ? Math.round((parte / total) * 1000) / 10 : 0);

function contar(registros, clave) {
  const mapa = new Map();
  for (const r of registros) {
    const k = typeof clave === 'function' ? clave(r) : r[clave];
    mapa.set(k, (mapa.get(k) || 0) + 1);
  }
  return mapa;
}

function desglosePorResultado(registros, clave) {
  const grupos = new Map();
  for (const r of registros) {
    const k = r[clave];
    if (!grupos.has(k)) grupos.set(k, Object.fromEntries(RESULTADOS.map((x) => [x, 0])));
    grupos.get(k)[r.resultado_revision]++;
  }
  return [...grupos.entries()].map(([nombre, c]) => {
    const total = RESULTADOS.reduce((s, x) => s + c[x], 0);
    const revisadas = total - c['Sin revisión'];
    return {
      nombre,
      total,
      conforme: c.Conforme,
      con_observaciones: c['Con observaciones'],
      no_conforme: c['No conforme'],
      sin_revision: c['Sin revisión'],
      tasa_no_conformidad: pct(c['No conforme'], revisadas),
      tasa_conformidad: pct(c.Conforme, revisadas),
    };
  });
}

export function computeKpis(registros) {
  const total = registros.length;
  const revisadas = registros.filter((r) => r.revisada === 'Sí');
  const porResultado = contar(registros, 'resultado_revision');
  const sinVigente = registros.filter((r) => r.revision_vigente === 'No').length;
  const enUsoNoConforme = registros.filter((r) => r.estado_gestion === 'En uso' && r.resultado_revision === 'No conforme');
  const criticasNcEnUso = enUsoNoConforme.filter((r) => r.criticidad === 'Crítica');
  const criticasSinRevision = registros.filter((r) => r.criticidad === 'Crítica' && r.revisada === 'No').length;
  const inconsistentes = registros.filter((r) => r.categoria_consistente === 'No').length;

  const kpis = {
    total_herramientas: total,
    revisadas: revisadas.length,
    sin_revision: porResultado.get('Sin revisión') || 0,
    tasa_conformidad: pct(porResultado.get('Conforme') || 0, revisadas.length),
    tasa_no_conformidad: pct(porResultado.get('No conforme') || 0, revisadas.length),
    sin_revision_vigente: sinVigente,
    sin_revision_vigente_pct: pct(sinVigente, total),
    en_uso_no_conforme: enUsoNoConforme.length,
    criticas_no_conformes_en_uso: criticasNcEnUso.length,
    criticas_sin_revision: criticasSinRevision,
    categoria_inconsistente: inconsistentes,
    categoria_inconsistente_pct: pct(inconsistentes, total),
    riesgo_alto: registros.filter((r) => r.riesgo_operativo === 'Alto').length,
    riesgo_medio: registros.filter((r) => r.riesgo_operativo === 'Medio').length,
  };

  const resultados = RESULTADOS.map((nombre) => ({ nombre, valor: porResultado.get(nombre) || 0, pct: pct(porResultado.get(nombre) || 0, total) }));

  const porHerramienta = desglosePorResultado(registros, 'herramienta_base')
    .map((h) => ({ ...h, categoria: registros.find((r) => r.herramienta_base === h.nombre).categoria_esperada }))
    .sort((a, b) => b.tasa_no_conformidad - a.tasa_no_conformidad);

  const porRol = desglosePorResultado(registros, 'rol_responsable')
    .map((r) => ({ ...r, responsable: registros.find((x) => x.rol_responsable === r.nombre).responsable }))
    .sort((a, b) => b.tasa_no_conformidad - a.tasa_no_conformidad);

  const trimestres = new Map();
  for (const r of revisadas) {
    if (!trimestres.has(r.trimestre_revision)) trimestres.set(r.trimestre_revision, { trimestre: r.trimestre_revision, Conforme: 0, 'Con observaciones': 0, 'No conforme': 0 });
    trimestres.get(r.trimestre_revision)[r.resultado_revision]++;
  }
  const porTrimestre = [...trimestres.values()].sort((a, b) => a.trimestre.localeCompare(b.trimestre));

  // Matriz criticidad × estado: % de herramientas sin revisión vigente en cada celda.
  const matrizVigencia = CRITICIDADES.map((criticidad) => ({
    criticidad,
    celdas: ESTADOS.map((estado) => {
      const celda = registros.filter((r) => r.criticidad === criticidad && r.estado_gestion === estado);
      const sin = celda.filter((r) => r.revision_vigente === 'No').length;
      return { estado, total: celda.length, sin_vigente: sin, pct: pct(sin, celda.length) };
    }),
  }));

  const categorias = [...contar(registros, 'categoria_esperada').entries()].map(([nombre, esperado]) => ({
    nombre,
    declaradas: registros.filter((r) => r.categoria_herramienta === nombre).length,
    esperadas: esperado,
    correctas: registros.filter((r) => r.categoria_herramienta === nombre && r.categoria_esperada === nombre).length,
  }));

  const topRiesgo = criticasNcEnUso
    .sort((a, b) => (a.fecha_ultima_revision < b.fecha_ultima_revision ? 1 : -1))
    .slice(0, 12)
    .map((r) => ({
      id: r.id_herramienta,
      herramienta: r.nombre_herramienta,
      responsable: `${r.responsable} (${r.rol_responsable})`,
      fecha_ultima_revision: r.fecha_ultima_revision,
      dias_desde_revision: r.dias_desde_revision,
    }));

  return {
    meta: { fuente: 'Dataset_Gestion_Calidad.xlsx', registros: total, fecha_corte: FECHA_CORTE, generado: new Date().toISOString() },
    kpis,
    resultados,
    por_herramienta: porHerramienta,
    por_rol: porRol,
    por_trimestre: porTrimestre,
    matriz_vigencia: matrizVigencia,
    categorias,
    top_riesgo: topRiesgo,
  };
}
