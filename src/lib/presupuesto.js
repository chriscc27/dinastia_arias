// Reproduce las fórmulas del template de presupuesto (las mismas que quedan en el .xlsx generado).

const conSubtotal = (items) => items.map((i) => ({ ...i, subtotal: i.costoMes * i.cantidad }));
const suma = (items, k = 'subtotal') => items.reduce((s, i) => s + i[k], 0);

export function computePresupuesto(datos) {
  const mo = conSubtotal(datos.manoDeObra.items);
  const moSub = suma(mo);
  const manoDeObra = {
    items: mo,
    subtotal: moSub,
    cargas: moSub * datos.manoDeObra.cargasSociales,
    imprevistos: moSub * datos.manoDeObra.imprevistos,
  };
  manoDeObra.total = manoDeObra.subtotal + manoDeObra.cargas + manoDeObra.imprevistos;

  const eq = conSubtotal(datos.equipo.items);
  const eqSub = suma(eq);
  const equipo = { items: eq, subtotal: eqSub, depreciacion: eqSub * datos.equipo.depreciacion, imprevistos: eqSub * datos.equipo.imprevistos };
  equipo.total = equipo.subtotal + equipo.depreciacion + equipo.imprevistos;

  const mat = conSubtotal(datos.materiales.items);
  const matSub = suma(mat);
  const materiales = { items: mat, subtotal: matSub, imprevistos: matSub * datos.materiales.imprevistos };
  materiales.total = materiales.subtotal + materiales.imprevistos;

  const soporte = suma(datos.soporteExterno, 'monto');
  const administrativos = { items: datos.administrativos, soporte, subtotal: suma(datos.administrativos, 'monto') + soporte };

  const total = manoDeObra.total + equipo.total + materiales.total + administrativos.subtotal;

  // Distribución por categoría de costo de calidad, con los factores de cada rubro aplicados a sus líneas
  const factorMo = manoDeObra.total / moSub;
  const factorEq = equipo.total / eqSub;
  const factorMat = materiales.total / matSub;
  const coq = {};
  const sumar = (cat, monto) => { coq[cat] = (coq[cat] || 0) + monto; };
  mo.forEach((i) => sumar(i.coq, i.subtotal * factorMo));
  eq.forEach((i) => sumar(i.coq, i.subtotal * factorEq));
  mat.forEach((i) => sumar(i.coq, i.subtotal * factorMat));
  datos.soporteExterno.forEach((s) => sumar(s.coq, s.monto));
  sumar('Gastos generales', suma(datos.administrativos, 'monto'));

  return {
    manoDeObra,
    equipo,
    materiales,
    administrativos,
    total,
    anual: total * 12,
    usd: total / datos.tipoCambio,
    costoPersonaMes: manoDeObra.total / mo.length,
    coq: Object.entries(coq).map(([categoria, monto]) => ({ categoria, monto })),
  };
}
