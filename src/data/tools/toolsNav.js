// Las cinco páginas de herramientas de gestión del Área de Calidad (menú, home y navegación entre ellas).
export const toolsNav = [
  {
    to: '/tableau',
    id: 'tableau',
    label: 'Tableau',
    title: 'Datos en Tableau',
    desc: 'Tablero de indicadores del inventario de 1.200 herramientas de QA: conformidad, vigencia y riesgo.',
    tag: 'VISUALIZACIÓN',
  },
  {
    to: '/weka',
    id: 'weka',
    label: 'Weka',
    title: 'Patrones con Weka',
    desc: 'J48, K-Means y Apriori ejecutados sobre el dataset en el servidor QA Hub.',
    tag: 'MINERÍA DE DATOS',
  },
  {
    to: '/monitoreo',
    id: 'monitoreo',
    label: 'Monitoreo',
    title: 'Monitoreo con Zabbix',
    desc: 'Las metas de calidad convertidas en triggers: problemas en vivo desde Zabbix 7.0.',
    tag: 'OBSERVABILIDAD',
  },
  {
    to: '/presupuesto',
    id: 'presupuesto',
    label: 'Presupuesto',
    title: 'Presupuesto del área',
    desc: 'Template de la cátedra con cargos, equipo y licencias del dataset, clasificado por costo de calidad.',
    tag: 'FINANZAS',
  },
  {
    to: '/soporte-externo',
    id: 'soporte-externo',
    label: 'Soporte externo',
    title: 'Soporte externo y contratos',
    desc: 'Proveedores, tipos de contrato, SLA y matriz de escalamiento según la criticidad.',
    tag: 'PROVEEDORES',
  },
];
