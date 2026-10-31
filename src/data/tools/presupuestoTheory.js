// Contenido teórico de la página /presupuesto. Las cifras viven en src/data/presupuestoData.json.

export const presupuestoTheory = {
  hero: {
    badge: 'GESTIÓN FINANCIERA DE LA CALIDAD',
    title: 'Presupuesto del Área de Calidad:',
    highlight: 'lo que cuesta asegurar software médico confiable.',
    subtitle:
      'Presupuesto mensual elaborado sobre el template de la cátedra, con los cargos del organigrama, el equipo de pruebas y las licencias de las herramientas que aparecen en el dataset. Cada línea está clasificada según el modelo de costos de calidad.',
    chips: ['Template de la cátedra', 'Modelo PAF', 'Crosby (1979)', 'ISO 9001 §7.1', 'CAPEX / OPEX'],
  },
  quotes: [
    {
      text: 'La calidad es gratis. No es un regalo, pero es gratis. Lo que cuesta dinero son las cosas sin calidad: todas las acciones que implican no hacer bien el trabajo a la primera.',
      author: 'Philip B. Crosby',
      role: 'Quality Is Free (1979)',
    },
    {
      text: 'La organización debe determinar y proporcionar los recursos necesarios para el establecimiento, implementación, mantenimiento y mejora continua del sistema de gestión de la calidad.',
      author: 'ISO 9001:2015',
      role: 'Cláusula 7.1.1 — Recursos (generalidades)',
    },
  ],
  theory: [
    {
      heading: '¿Qué es un presupuesto?',
      content:
        'Expresión cuantitativa de un plan de acción para un periodo determinado (Horngren, Datar y Rajan, 2012). Sirve para planificar, coordinar áreas, asignar responsabilidades y, al cierre del mes, comparar lo real contra lo previsto.',
    },
    {
      heading: 'Tipos de presupuesto',
      content:
        'Operativo (gastos del día a día), de capital (inversiones), incremental (el del año pasado + un %) y base cero (Pyhrr, 1970): cada línea se justifica desde cero. El del Área de Calidad es operativo y de base cero: cada cargo, equipo y licencia está ligado a una necesidad del dataset.',
    },
    {
      heading: 'CAPEX y OPEX',
      content:
        'CAPEX es la inversión en activos que duran varios años (servidores, equipos); OPEX es el gasto recurrente (sueldos, suscripciones). Al tomar laptops en leasing y licencias por suscripción, casi todo el presupuesto se vuelve OPEX mensual, más fácil de ajustar.',
    },
    {
      heading: 'Estructura del template',
      content:
        'Mano de obra con 60 % de cargas sociales (aguinaldo, aportes a la Gestora Pública y a la Caja de Salud, previsiones) e imprevistos del 10 %; equipo con 15 % de depreciación e imprevistos; materiales con imprevistos; y costos administrativos fijos.',
    },
    {
      heading: 'Costos de calidad (modelo PAF)',
      content:
        'Feigenbaum y Juran clasifican el costo de calidad en prevención (evitar defectos), evaluación (detectarlos), fallas internas (corregirlos antes de entregar) y fallas externas (cuando llegan al cliente). Invertir en las dos primeras reduce las dos últimas.',
    },
    {
      heading: 'Por qué importa en software médico',
      content:
        'Una falla externa en software clínico no es solo un reclamo: puede ser un retiro del producto, una sanción regulatoria o un riesgo para un paciente. Por eso el presupuesto del área privilegia prevención y evaluación, y reserva el 10 % de imprevistos para fallas internas.',
    },
  ],
  coq: [
    { categoria: 'Prevención', descripcion: 'Planificación de calidad, análisis estático (SonarQube, Snyk), monitoreo (Zabbix), tableros de indicadores.', ejemplo: 'Jefatura de Calidad, SDET Lead, SonarQube, Snyk, Servidor QA Hub, Tableau' },
    { categoria: 'Evaluación', descripcion: 'Ejecutar pruebas, auditar e inspeccionar: lo que hace la mayoría del equipo.', ejemplo: 'Testers, granja de dispositivos, Tosca, TestRail, Postman, auditoría ISO 13485, pentesting' },
    { categoria: 'Fallas internas', descripcion: 'Corregir lo que se detectó antes de liberar: retrabajo, re-pruebas, gestión de defectos.', ejemplo: 'Jira (registro de no conformidades) + imprevistos del 10 %' },
    { categoria: 'Fallas externas', descripcion: 'Defectos que llegan al hospital: soporte de emergencia, parches, retiros, sanciones.', ejemplo: 'No se presupuestan: el objetivo del área es que tiendan a cero' },
  ],
  // Supuestos para estimar el costo de la no calidad a partir del dataset
  noCalidad: {
    horasNoConforme: 16,
    horasConObservaciones: 4,
    horasLaboralesMes: 176,
    mesesPeriodo: 40,
    nota: 'Estimación ilustrativa: 16 h de retrabajo por cada revisión No conforme y 4 h por cada revisión con observaciones, al costo hora promedio del equipo (mano de obra total ÷ 7 personas ÷ 176 h). Periodo del dataset: enero 2023 – abril 2026 (40 meses).',
  },
  references: [
    { apa: 'Horngren, C. T., Datar, S. M., & Rajan, M. V. (2012). Contabilidad de costos: Un enfoque gerencial (14.ª ed.). Pearson Educación.', url: 'https://www.pearson.com/', tipo: 'Libro' },
    { apa: 'Crosby, P. B. (1979). Quality is free: The art of making quality certain. McGraw-Hill.', url: 'https://archive.org/details/qualityisfree00cros', tipo: 'Libro' },
    { apa: 'Feigenbaum, A. V. (1991). Total quality control (3.ª ed.). McGraw-Hill.', url: 'https://www.worldcat.org/title/22597405', tipo: 'Libro' },
    { apa: 'Juran, J. M., & De Feo, J. A. (2010). Juran\'s quality handbook: The complete guide to performance excellence (6.ª ed.). McGraw-Hill.', url: 'https://www.juran.com/', tipo: 'Libro' },
    { apa: 'Pyhrr, P. A. (1970). Zero-base budgeting. Harvard Business Review, 48(6), 111–121.', url: 'https://hbr.org/1970/11/zero-base-budgeting', tipo: 'Artículo' },
    { apa: 'International Organization for Standardization. (2015). ISO 9001:2015 Sistemas de gestión de la calidad — Requisitos (§7.1 Recursos).', url: 'https://www.iso.org/standard/62085.html', tipo: 'Norma' },
    { apa: 'International Organization for Standardization. (2021). ISO 10014:2021 Quality management systems — Managing an organization for quality results — Guidance for realizing financial and economic benefits.', url: 'https://www.iso.org/standard/77225.html', tipo: 'Norma' },
    { apa: 'Asamblea Legislativa Plurinacional de Bolivia. (2010). Ley N.° 065 de Pensiones (aportes laborales y patronales).', url: 'https://www.gacetaoficialdebolivia.gob.bo/', tipo: 'Normativa nacional' },
  ],
};
