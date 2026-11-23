import { toolsNav } from './tools/toolsNav';

// Las 20 secciones obligatorias del encabezado de navegación en estricto orden de izquierda a derecha.
export const siteNav = [
  // 1. Inicio (Crear página principal Área Trabajo).
  {
    id: 'inicio',
    to: '/',
    label: 'Inicio',
    shortLabel: 'Inicio',
    title: 'Inicio — Área de Trabajo Calidad',
    navGroup: 'estrategia',
    order: 1,
    desc: 'Página principal del Área de Trabajo: visión ejecutiva, indicadores clave de calidad y acceso a todas las especialidades.',
  },
  // 2. Gestión (Gestión de Tecnologías).
  {
    id: 'gestion-tecnologias',
    to: '/gestion-tecnologias',
    label: 'Gestión',
    shortLabel: 'Gestión',
    title: 'Gestión de Tecnologías',
    group: 'estrategia',
    navGroup: 'estrategia',
    order: 2,
    desc: 'Planificación, gobierno tecnológico y mejora continua con PHVA, TQM y estándares internacionales de calidad.',
  },
  // 3. Ciencia, Tecnología e Innovación.
  {
    id: 'ciencia-tecnologia',
    to: '/ciencia-tecnologia-innovacion',
    label: 'Ciencia e Innovación',
    shortLabel: 'Ciencia e Innovación',
    title: 'Ciencia, Tecnología e Innovación',
    group: 'estrategia',
    navGroup: 'estrategia',
    order: 3,
    desc: 'Método científico, investigación aplicada y tecnología para prevenir fallos y elevar la calidad de entrega.',
  },
  // 4. Misión y Visión.
  {
    id: 'mision-vision',
    to: '/mision-vision',
    label: 'Misión y Visión',
    shortLabel: 'Misión y Visión',
    title: 'Misión y Visión',
    group: 'estrategia',
    navGroup: 'estrategia',
    order: 4,
    desc: 'Nuestro propósito, compromiso con la salud digital de AITECH y dirección estratégica hacia 2030.',
  },
  // 5. Organización.
  {
    id: 'organizacion',
    to: '/organizacion',
    label: 'Organización',
    shortLabel: 'Organización',
    title: 'Organización',
    group: 'personas',
    navGroup: 'personas',
    order: 5,
    desc: 'Estructura organizativa, organigrama interactivo de Jefatura y perfiles de los especialistas de Dinastía Arias.',
  },
  // 6. Descripción de Posiciones.
  {
    id: 'descripcion-posiciones',
    to: '/descripcion-posiciones',
    label: 'Descripción de Posiciones',
    shortLabel: 'Posiciones',
    title: 'Descripción de Posiciones',
    navGroup: 'personas',
    order: 6,
    desc: 'Manual de Organización y Funciones (MOF): perfiles de cargo, competencias, relaciones jerárquicas y manual oficial.',
  },
  // 7. MBTI.
  {
    id: 'mbti',
    to: '/mbti',
    label: 'MBTI',
    shortLabel: 'MBTI',
    title: 'MBTI',
    group: 'personas',
    navGroup: 'personas',
    order: 7,
    desc: 'Dimensiones tipológicas de personalidad, perfiles individuales y sinergia colaborativa del equipo.',
  },
  // 8. SCRUM.
  {
    id: 'scrum',
    to: '/scrum',
    label: 'SCRUM',
    shortLabel: 'SCRUM',
    title: 'SCRUM',
    group: 'procesos',
    navGroup: 'metodologia',
    order: 8,
    desc: 'Marco de trabajo ágil: pilares empíricos, 5 valores, roles clave, eventos timeboxed y artefactos con compromisos.',
  },
  // 9. Goals: Objetivos y asignación de personal.
  {
    id: 'goals',
    to: '/goals',
    label: 'Goals: Objetivos y asignación de personal',
    shortLabel: 'Goals',
    title: 'Goals: Objetivos y asignación de personal',
    navGroup: 'metodologia',
    order: 9,
    desc: 'Product Goal estratégico, metas tácticas de cada Sprint, matriz de asignación de personal y tablero Kanban.',
  },
  // 10. Inventarios.
  {
    id: 'inventarios',
    to: '/inventarios',
    label: 'Inventarios',
    shortLabel: 'Inventarios',
    title: 'Inventarios',
    navGroup: 'procesos',
    order: 10,
    desc: 'Registro oficial y auditoría de 1.200 herramientas de QA: control de vigencia, criticidad y centro de descargas.',
  },
  // 11. IDEF0.
  {
    id: 'idef-0',
    to: '/idef-0',
    label: 'IDEF0',
    shortLabel: 'IDEF0',
    title: 'IDEF0',
    group: 'procesos',
    navGroup: 'procesos',
    order: 11,
    desc: 'Modelado funcional del Área de Calidad: entradas (I), controles (C), salidas (O) y mecanismos (M) interactivos.',
  },
  // 12. BPMN.
  {
    id: 'bpmn',
    to: '/bpmn',
    label: 'BPMN',
    shortLabel: 'BPMN',
    title: 'Procesos con BPMN',
    group: 'procesos',
    navGroup: 'procesos',
    order: 12,
    desc: 'Flujo de procesos de evaluación y aprobación de software, recorrido interactivo y descarga del estándar .bpmn.',
  },
  // 13. Datos Tableau.
  {
    id: 'tableau',
    to: '/tableau',
    label: 'Datos Tableau',
    shortLabel: 'Tableau',
    title: 'Datos Tableau',
    navGroup: 'herramientas',
    order: 13,
    desc: 'Cinco dashboards ejecutivos de Tableau: conformidad, vigencia, tendencia, criticidad y calidad del dato.',
  },
  // 14. Patrones Weka.
  {
    id: 'weka',
    to: '/weka',
    label: 'Patrones Weka',
    shortLabel: 'Weka',
    title: 'Patrones Weka',
    navGroup: 'herramientas',
    order: 14,
    desc: 'Minería de datos con Weka 3.8: algoritmos J48, K-Means, reglas de asociación Apriori y hallazgos sistémicos.',
  },
  // 15. Monitoreo.
  {
    id: 'monitoreo',
    to: '/monitoreo',
    label: 'Monitoreo',
    shortLabel: 'Monitoreo',
    title: 'Monitoreo',
    navGroup: 'herramientas',
    order: 15,
    desc: 'Observabilidad técnica en vivo con Zabbix 7.0: triggers automáticos, umbrales de severidad y alertas operativas.',
  },
  // 16. Presupuesto.
  {
    id: 'presupuesto',
    to: '/presupuesto',
    label: 'Presupuesto',
    shortLabel: 'Presupuesto',
    title: 'Presupuesto',
    navGroup: 'herramientas',
    order: 16,
    desc: 'Estructura financiera del área, cargos, equipamiento, licencias y costeo del Cost of Quality (CoQ).',
  },
  // 17. Soporte externo.
  {
    id: 'soporte-externo',
    to: '/soporte-externo',
    label: 'Soporte externo',
    shortLabel: 'Soporte externo',
    title: 'Soporte externo',
    navGroup: 'herramientas',
    order: 17,
    desc: 'Gestión de proveedores externos, contratos SLA/OLA, tiempos de atención y matriz de escalamiento.',
  },
  // 18. Plan de Contingencia.
  {
    id: 'plan-contingencia',
    to: '/plan-contingencia',
    label: 'Plan de Contingencia',
    shortLabel: 'Plan Contingencia',
    title: 'Plan de Contingencia',
    group: 'procesos',
    navGroup: 'cierre',
    order: 18,
    desc: 'Continuidad operativa y recuperación de servicios TIC en La Paz, Bolivia: 10 etapas y tiempos RTO / RPO.',
  },
  // 19. Conclusiones y Recomendaciones.
  {
    id: 'conclusiones-recomendaciones',
    to: '/conclusiones-recomendaciones',
    label: 'Conclusiones y Recomendaciones',
    shortLabel: 'Conclusiones',
    title: 'Conclusiones y Recomendaciones',
    navGroup: 'cierre',
    order: 19,
    desc: 'Aporte integral del equipo Dinastía Arias en AITECH, balance estratégico, técnico y hoja de ruta recomendada.',
  },
  // 20. Contactos.
  {
    id: 'contacto',
    to: '/trabaja-con-nosotros',
    label: 'Contactos',
    shortLabel: 'Contactos',
    title: 'Contactos',
    navGroup: 'cierre',
    order: 20,
    desc: 'Directorio de contacto con los especialistas del Área de Calidad Dinastía Arias en AITECH.',
  },

  // Enlaces de compatibilidad y soporte histórico (nav: false, no aparecen en el encabezado principal)
  {
    id: 'equipo',
    to: '/organizacion#equipo',
    label: 'Equipo',
    title: 'Equipo Dinastía Arias',
    nav: false,
    desc: 'Conoce a los especialistas en Calidad, sus responsabilidades, misión y visión individuales.',
  },
  {
    id: 'alcance',
    to: '/alcance',
    label: 'Alcance',
    title: 'Alcance en AITECH',
    nav: false,
    desc: 'Calidad transversal en Software, Hardware, Redes, Seguridad, Cloud, Big Data y Calidad Global.',
  },
  {
    id: 'herramientas',
    to: '/herramientas',
    label: 'Herramientas',
    title: 'Herramientas del Área de Calidad',
    nav: false,
    desc: 'Un mismo inventario conecta los indicadores, el análisis, el monitoreo y la gestión de recursos.',
  },
];

// Las 20 secciones del encabezado ordenadas estrictamente del 1 al 20
export const headerNavItems = siteNav.filter((item) => item.nav !== false).sort((a, b) => a.order - b.order);

// Agrupación de soporte para menús desplegables ordenados de izquierda a derecha
export const navDropdownGroups = [
  {
    id: 'estrategia',
    label: 'Estrategia',
    title: 'Inicio & Estrategia (01–04)',
    items: headerNavItems.filter((item) => item.navGroup === 'estrategia'),
  },
  {
    id: 'personas',
    label: 'Organización',
    title: 'Organización & Roles (05–07)',
    items: headerNavItems.filter((item) => item.navGroup === 'personas'),
  },
  {
    id: 'metodologia',
    label: 'Scrum & Goals',
    title: 'Scrum & Asignación (08–09)',
    items: headerNavItems.filter((item) => item.navGroup === 'metodologia'),
  },
  {
    id: 'procesos',
    label: 'Procesos',
    title: 'Procesos & Inventario (10–12)',
    items: headerNavItems.filter((item) => item.navGroup === 'procesos'),
  },
  {
    id: 'herramientas',
    label: 'Herramientas',
    title: 'Herramientas de Calidad (13–17)',
    items: headerNavItems.filter((item) => item.navGroup === 'herramientas'),
  },
  {
    id: 'cierre',
    label: 'Cierre',
    title: 'Continuidad & Contactos (18–20)',
    items: headerNavItems.filter((item) => item.navGroup === 'cierre'),
  },
];

export const primaryNav = headerNavItems.slice(0, 10);
export const secondaryNav = headerNavItems.slice(10, 20);

// Distribución oficial en 3 filas (Fila 1: 1–7, Fila 2: 8–14, Fila 3: 15–20)
export const navRow1 = headerNavItems.slice(0, 7);
export const navRow2 = headerNavItems.slice(7, 14);
export const navRow3 = headerNavItems.slice(14, 20);

export const getSiteTopic = (id) => siteNav.find((item) => item.id === id);

export const legacyHomeRoutes = {
  ...Object.fromEntries(siteNav.map((item) => [item.id, item.to])),
  conclusiones: '/conclusiones-recomendaciones#conclusiones',
  recomendaciones: '/conclusiones-recomendaciones#recomendaciones',
  posiciones: '/descripcion-posiciones',
  'descripcion-posiciones': '/descripcion-posiciones',
  goals: '/goals',
  inventarios: '/inventarios',
  contactos: '/trabaja-con-nosotros',
};

export const homeGroups = [
  { id: 'estrategia', badge: 'ESTRATEGIA Y FUNDAMENTOS', title: 'El propósito que guía cada decisión.', desc: 'Integramos gestión tecnológica, conocimiento científico y estándares internacionales para una calidad preventiva.' },
  { id: 'personas', badge: 'PERSONAS Y ORGANIZACIÓN', title: 'Un equipo, capacidades complementarias.', desc: 'Conoce a Dinastía Arias, cómo se organiza el área y qué aporta cada perfil a la excelencia operativa.' },
  { id: 'procesos', badge: 'NUESTRA FORMA DE TRABAJO', title: 'De la estrategia a procesos visibles.', desc: 'Scrum organiza las entregas; IDEF-0 y BPMN explican cómo se relacionan las funciones, las decisiones y los responsables.' },
];

export const homeVisuals = {
  inicio: { src: 'assets/gestion_hero_art.jpg', alt: 'Página principal del Área de Trabajo Calidad AITECH.' },
  'gestion-tecnologias': { src: 'assets/gestion_hero_art.jpg', alt: 'Composición de estructuras de vidrio verde conectadas entre sí.' },
  'ciencia-tecnologia': { src: 'assets/verticals/bigdata.jpg', alt: 'Estructura de vidrio que representa datos y conocimiento conectado.' },
  'mision-vision': { src: 'assets/verticals/calidad.jpg', alt: 'Un cristal central protegido por anillos de vidrio verde.' },
  organizacion: { src: 'assets/verticals/redes.jpg', alt: 'Red de conexiones que representa la coordinación entre especialidades.' },
  'descripcion-posiciones': { src: 'assets/verticals/software.jpg', alt: 'Manual de Organización y Funciones y descripción de posiciones de QA.' },
  mbti: { src: 'assets/verticals/hardware.jpg', alt: 'Componentes de vidrio complementarios en una estructura tecnológica.' },
  scrum: { src: 'assets/verticals/software.jpg', alt: 'Módulos tecnológicos conectados como las etapas de un proceso.' },
  goals: { src: 'assets/verticals/calidad.jpg', alt: 'Objetivos estratégicos y asignación de personal del área de calidad.' },
  inventarios: { src: 'assets/tableau/dashboard-1-resumen.png', alt: 'Inventario oficial de 1.200 herramientas de QA de AITECH.', dashboard: true },
  'idef-0': { src: 'assets/verticals/redes.jpg', alt: 'Conexiones entre nodos que representan funciones relacionadas.' },
  bpmn: { src: 'assets/verticals/cloud.jpg', alt: 'Estructura de vidrio verde con múltiples conexiones y recorridos.' },
  tableau: { src: 'assets/tableau/dashboard-1-resumen.png', alt: 'Dashboard de Tableau con el resumen de indicadores del inventario de Calidad.', dashboard: true },
  weka: { src: 'assets/verticals/bigdata.jpg', alt: 'Composición de datos y conexiones para representar el análisis de patrones.' },
  monitoreo: { src: 'assets/verticals/cloud.jpg', alt: 'Infraestructura conectada que representa el monitoreo tecnológico.' },
  presupuesto: { src: 'assets/verticals/hardware.jpg', alt: 'Componentes tecnológicos que forman parte de los recursos del área.' },
  'soporte-externo': { src: 'assets/verticals/seguridad.jpg', alt: 'Estructura de vidrio que representa protección y continuidad operativa.' },
  'plan-contingencia': { src: 'assets/verticals/seguridad.jpg', alt: 'Estructura de vidrio verde que representa protección y continuidad de los servicios TIC.' },
  'conclusiones-recomendaciones': { src: 'assets/verticals/seguridad.jpg', alt: 'Conclusiones y Recomendaciones del proyecto Dinastía Arias.' },
  contacto: { src: 'assets/verticals/calidad.jpg', alt: 'Contactos de los especialistas del Área de Calidad.' },
};

export const footerGroups = [
  { title: 'Proyecto', ids: ['inicio', 'gestion-tecnologias', 'ciencia-tecnologia', 'mision-vision', 'organizacion', 'descripcion-posiciones', 'mbti', 'conclusiones-recomendaciones'] },
  { title: 'Procesos', ids: ['scrum', 'goals', 'inventarios', 'idef-0', 'bpmn', 'plan-contingencia'] },
  { title: 'Herramientas', ids: ['herramientas', ...toolsNav.map((tool) => tool.id), 'contacto'] },
];
