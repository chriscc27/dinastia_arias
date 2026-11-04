import { toolsNav } from './tools/toolsNav';

// Fuente compartida para menú, resúmenes, títulos y pie.
export const siteNav = [
  { id: 'inicio', to: '/', label: 'Inicio', title: 'Inicio' },
  { id: 'gestion-tecnologias', to: '/gestion-tecnologias', label: 'Gestión', title: 'Gestión de Tecnologías', group: 'estrategia', desc: 'Planificación, gobierno tecnológico y mejora continua con PHVA, TQM y estándares de calidad.' },
  { id: 'ciencia-tecnologia', to: '/ciencia-tecnologia-innovacion', label: 'Ciencia e Innovación', title: 'Ciencia, Tecnología e Innovación', group: 'estrategia', desc: 'Método científico, investigación aplicada y tecnología para prevenir fallos y mejorar cada entrega.' },
  { id: 'mision-vision', to: '/mision-vision', label: 'Misión y Visión', title: 'Misión y Visión', group: 'estrategia', desc: 'Nuestro propósito, compromiso con la salud digital y dirección estratégica hacia 2030.' },
  { id: 'equipo', to: '/organizacion#equipo', label: 'Equipo', title: 'Equipo Dinastía Arias', nav: false, desc: 'Conoce a los especialistas en Calidad, sus responsabilidades, misión y visión individuales.' },
  { id: 'organizacion', to: '/organizacion', label: 'Organización', title: 'Organización y roles', group: 'personas', desc: 'Nuestro equipo, su misión y visión, el organigrama del área y las responsabilidades de cada posición.' },
  { id: 'mbti', to: '/mbti', label: 'MBTI', title: 'MBTI y perfiles del equipo', group: 'personas', desc: 'Dimensiones de personalidad, perfiles individuales y aportes complementarios al trabajo en equipo.' },
  { id: 'scrum', to: '/scrum', label: 'Scrum', title: 'Scrum y tablero Kanban', group: 'procesos', desc: 'Roles, eventos y artefactos para organizar el sprint, con un tablero Kanban interactivo.' },
  { id: 'idef-0', to: '/idef-0', label: 'IDEF-0', title: 'Modelado funcional IDEF-0', group: 'procesos', desc: 'Entradas, controles, salidas y mecanismos del Área de Calidad en un modelo funcional interactivo.' },
  { id: 'bpmn', to: '/bpmn', label: 'BPMN', title: 'Procesos con BPMN', group: 'procesos', desc: 'Recorre la evaluación y aprobación de software, explora cada actividad y descarga el diagrama.' },
  { id: 'alcance', to: '/alcance', label: 'Alcance', title: 'Alcance en AITECH', nav: false, desc: 'Calidad transversal en Software, Hardware, Redes, Seguridad, Cloud, Big Data y Calidad Global.' },
  { id: 'herramientas', to: '/herramientas', label: 'Herramientas', title: 'Herramientas del Área de Calidad', desc: 'Un mismo inventario conecta los indicadores, el análisis, el monitoreo y la gestión de recursos.' },
  ...toolsNav.map((tool) => ({ ...tool, group: 'herramientas' })),
  { id: 'contacto', to: '/trabaja-con-nosotros', label: 'Contacto', title: 'Trabaja con nosotros', desc: 'Contacta al equipo de Dinastía Arias y conoce a los responsables del Área de Calidad.' },
];

export const primaryNav = siteNav.filter((item) => item.nav !== false && item.id !== 'herramientas' && item.group !== 'herramientas' && item.id !== 'contacto');
export const secondaryNav = siteNav.filter((item) => item.id === 'herramientas' || item.group === 'herramientas' || item.id === 'contacto');
export const getSiteTopic = (id) => siteNav.find((item) => item.id === id);
export const legacyHomeRoutes = Object.fromEntries(siteNav.map((item) => [item.id, item.to]));

export const homeGroups = [
  { id: 'estrategia', badge: 'ESTRATEGIA Y FUNDAMENTOS', title: 'El propósito que guía cada decisión.', desc: 'Integramos gestión tecnológica, conocimiento científico y estándares internacionales para una calidad preventiva.' },
  { id: 'personas', badge: 'PERSONAS Y ORGANIZACIÓN', title: 'Un equipo, capacidades complementarias.', desc: 'Conoce a Dinastía Arias, cómo se organiza el área y qué aporta cada perfil a la excelencia operativa.' },
  { id: 'procesos', badge: 'NUESTRA FORMA DE TRABAJO', title: 'De la estrategia a procesos visibles.', desc: 'Scrum organiza las entregas; IDEF-0 y BPMN explican cómo se relacionan las funciones, las decisiones y los responsables.' },
];

export const homeVisuals = {
  'gestion-tecnologias': { src: 'assets/gestion_hero_art.jpg', alt: 'Composición de estructuras de vidrio verde conectadas entre sí.' },
  'ciencia-tecnologia': { src: 'assets/verticals/bigdata.jpg', alt: 'Estructura de vidrio que representa datos y conocimiento conectado.' },
  'mision-vision': { src: 'assets/verticals/calidad.jpg', alt: 'Un cristal central protegido por anillos de vidrio verde.' },
  organizacion: { src: 'assets/verticals/redes.jpg', alt: 'Red de conexiones que representa la coordinación entre especialidades.' },
  mbti: { src: 'assets/verticals/hardware.jpg', alt: 'Componentes de vidrio complementarios en una estructura tecnológica.' },
  scrum: { src: 'assets/verticals/software.jpg', alt: 'Módulos tecnológicos conectados como las etapas de un proceso.' },
  'idef-0': { src: 'assets/verticals/redes.jpg', alt: 'Conexiones entre nodos que representan funciones relacionadas.' },
  bpmn: { src: 'assets/verticals/cloud.jpg', alt: 'Estructura de vidrio verde con múltiples conexiones y recorridos.' },
  tableau: { src: 'assets/tableau/dashboard-1-resumen.png', alt: 'Dashboard de Tableau con el resumen de indicadores del inventario de Calidad.', dashboard: true },
  weka: { src: 'assets/verticals/bigdata.jpg', alt: 'Composición de datos y conexiones para representar el análisis de patrones.' },
  monitoreo: { src: 'assets/verticals/cloud.jpg', alt: 'Infraestructura conectada que representa el monitoreo tecnológico.' },
  presupuesto: { src: 'assets/verticals/hardware.jpg', alt: 'Componentes tecnológicos que forman parte de los recursos del área.' },
  'soporte-externo': { src: 'assets/verticals/seguridad.jpg', alt: 'Estructura de vidrio que representa protección y continuidad operativa.' },
};

export const footerGroups = [
  { title: 'Proyecto', ids: ['inicio', 'gestion-tecnologias', 'ciencia-tecnologia', 'mision-vision', 'organizacion', 'mbti'] },
  { title: 'Procesos', ids: ['scrum', 'idef-0', 'bpmn'] },
  { title: 'Herramientas', ids: ['herramientas', ...toolsNav.map((tool) => tool.id)] },
];
