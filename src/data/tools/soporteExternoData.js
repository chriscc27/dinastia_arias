// Contenido de la página /soporte-externo. Los montos de cada contrato vienen de presupuestoData.json.

export const soporteExternoData = {
  hero: {
    badge: 'GESTIÓN DE PROVEEDORES & CONTRATOS',
    title: 'Soporte externo:',
    highlight: 'lo que tercerizamos, con qué contrato y con qué SLA.',
    subtitle:
      'El Área de Calidad no puede hacerlo todo en casa: la certificación ISO 13485 la otorga un tercero, el pentesting exige independencia y los picos de release necesitan testers adicionales. Cada proveedor se gestiona con un contrato, un SLA medible y una matriz de escalamiento.',
    chips: ['ITIL 4 · Supplier Management', 'ISO 9001 §8.4', 'ISO 13485 §7.4', 'IEC 62304 · SOUP', 'ISO/IEC 27036'],
  },
  quotes: [
    {
      text: 'La organización debe asegurarse de que los procesos, productos y servicios suministrados externamente son conformes a los requisitos.',
      author: 'ISO 9001:2015',
      role: 'Cláusula 8.4.1 — Control de los procesos, productos y servicios suministrados externamente',
    },
    {
      text: 'El propósito de la práctica de gestión de proveedores es asegurar que los proveedores de la organización y su desempeño se gestionen adecuadamente para respaldar la provisión fluida de productos y servicios de calidad.',
      author: 'AXELOS — ITIL 4',
      role: 'Supplier management practice guide (2020)',
    },
  ],
  theory: [
    {
      heading: '¿Qué es el soporte externo?',
      content:
        'Toda capacidad que la organización obtiene de un tercero bajo contrato: soporte técnico, servicios profesionales, auditorías o personal temporal. Tercerizar no transfiere la responsabilidad: ante un auditor ISO 13485, AITECH sigue respondiendo por lo que hace su proveedor.',
    },
    {
      heading: 'Hacer o comprar (make or buy)',
      content:
        'Se terceriza lo que exige independencia (certificación, pentesting), lo que es esporádico (picos de pruebas) o lo que requiere una especialización que no conviene mantener todo el año (experto Zabbix). Lo que es núcleo del negocio, como la estrategia de calidad y la liberación de versiones, se queda en casa (Lacity y Willcocks, 2012).',
    },
    {
      heading: 'SLA, OLA y contratos de soporte',
      content:
        'SLA: acuerdo con el cliente sobre niveles de servicio. OLA: acuerdo entre áreas internas. UC (underpinning contract): contrato con el proveedor externo que respalda el SLA. Si AITECH promete 4 h de resolución a un hospital, el contrato con el proveedor debe garantizar menos.',
    },
    {
      heading: 'Tipos de contrato',
      content:
        'Precio fijo (alcance cerrado: certificación, pentest), tiempo y materiales (se paga por hora usada: bolsa de testers), servicio gestionado (cuota mensual con SLA: soporte Zabbix) y suscripción (SaaS con soporte del fabricante incluido: SonarQube, Tosca, Jira).',
    },
    {
      heading: 'Proveedores en software médico',
      content:
        'ISO 13485 §7.4 exige evaluar, seleccionar y controlar a los proveedores según su impacto en el producto. IEC 62304 llama SOUP (software of unknown provenance) al software de terceros: cada herramienta del dataset que valida el producto debe tener su evidencia de revisión.',
    },
    {
      heading: 'Seguridad en la cadena de suministro',
      content:
        'ISO/IEC 27036 trata la seguridad en las relaciones con proveedores: acuerdos de confidencialidad, acceso mínimo a datos, derecho a auditar y notificación de incidentes. Indispensable cuando un pentester o un tester externo ve datos de pacientes.',
    },
  ],
  contratos: [
    {
      id: 'zabbix',
      proveedor: 'Partner certificado Zabbix',
      tipo: 'Servicio gestionado',
      alcance: 'Soporte 8×5 del servidor QA Hub, actualizaciones de la versión LTS, ajuste de plantillas y triggers, respaldo de la base de datos de monitoreo.',
      sla: [
        ['Respuesta Desastre / Alta', '1 h / 4 h'],
        ['Resolución Desastre', '≤ 8 h'],
        ['Disponibilidad del monitoreo', '≥ 99,5 % mensual'],
      ],
      penalidad: '5 % de la cuota mensual por cada hora de retraso sobre el tiempo de resolución (tope 30 %).',
      medicion: 'Zabbix mide su propia disponibilidad y el escenario web de la API.',
    },
    {
      id: 'certificacion',
      proveedor: 'Organismo de certificación acreditado (p. ej., IBNORCA)',
      tipo: 'Precio fijo anual',
      alcance: 'Auditoría de certificación ISO 13485:2016 del sistema de gestión de calidad y auditorías anuales de seguimiento.',
      sla: [
        ['Informe de auditoría', '≤ 15 días hábiles'],
        ['Emisión del certificado', '≤ 30 días tras el cierre de no conformidades'],
        ['Auditor con competencia en dispositivos médicos', 'Obligatorio'],
      ],
      penalidad: 'Reprogramación sin costo si el organismo incumple las fechas acordadas.',
      medicion: 'Seguimiento de hitos en el plan anual de auditorías.',
    },
    {
      id: 'pentest',
      proveedor: 'Firma de ciberseguridad independiente',
      tipo: 'Precio fijo por campaña',
      alcance: '2 campañas al año sobre la plataforma clínica y las APIs HL7/FHIR, con la metodología OWASP WSTG / ASVS y una re-prueba de los hallazgos corregidos.',
      sla: [
        ['Aviso de hallazgo crítico', '≤ 24 h'],
        ['Informe técnico y ejecutivo', '≤ 10 días hábiles'],
        ['Re-prueba de correcciones', 'Incluida (30 días)'],
      ],
      penalidad: 'Descuento del 10 % si el informe se entrega fuera de plazo.',
      medicion: 'Hallazgos registrados en Jira con la etiqueta «pentest».',
    },
    {
      id: 'staffing',
      proveedor: 'Consultora de testing (testers certificados ISTQB)',
      tipo: 'Tiempo y materiales',
      alcance: 'Bolsa de 40 horas al mes de testers funcionales para picos de regresión antes de cada release; horas no usadas no se acumulan.',
      sla: [
        ['Incorporación de un tester', '≤ 72 h'],
        ['Reemplazo por bajo desempeño', '≤ 5 días hábiles'],
        ['Tarifa', 'Bs 80 / hora'],
      ],
      penalidad: 'Las horas con defectos mal reportados (rechazados por el QA Lead) no se facturan.',
      medicion: 'Casos ejecutados y defectos válidos en TestRail.',
    },
  ],
  incluidos: [
    { proveedor: 'SonarSource (SonarQube Enterprise)', soporte: 'Soporte comercial incluido en la suscripción' },
    { proveedor: 'Tricentis (Tosca)', soporte: 'Soporte estándar del fabricante incluido' },
    { proveedor: 'Atlassian (Jira Premium)', soporte: 'Soporte 24/7 para incidentes críticos incluido' },
    { proveedor: 'Snyk, Postman, TestRail, Tableau', soporte: 'Soporte del plan contratado, sin costo adicional' },
  ],
  // La criticidad del dataset decide el SLA y el escalamiento
  escalamiento: [
    { criticidad: 'Crítica', zabbix: 'Desastre', respuesta: '1 h', resolucion: '4 h', ruta: 'N1 QA de turno → N2 proveedor de inmediato → Jefatura de Calidad → Gerencia' },
    { criticidad: 'Alta', zabbix: 'Alta', respuesta: '4 h', resolucion: '1 día hábil', ruta: 'N1 QA → N2 proveedor a las 4 h → Jefatura de Calidad' },
    { criticidad: 'Media', zabbix: 'Media', respuesta: '1 día hábil', resolucion: '3 días hábiles', ruta: 'N1 QA → responsable de la herramienta' },
    { criticidad: 'Baja', zabbix: 'Advertencia', respuesta: '2 días hábiles', resolucion: '10 días hábiles', ruta: 'Backlog del sprint de calidad' },
  ],
  ciclo: [
    { paso: '01', titulo: 'Necesidad', detalle: 'Análisis de hacer o comprar y requisitos del servicio.' },
    { paso: '02', titulo: 'Solicitud', detalle: 'RFI y luego RFP con alcance, SLA esperado y criterios de evaluación.' },
    { paso: '03', titulo: 'Evaluación', detalle: 'Matriz ponderada y verificación de referencias y certificaciones.' },
    { paso: '04', titulo: 'Contrato', detalle: 'SLA, penalidades, confidencialidad, derecho a auditar y plan de salida.' },
    { paso: '05', titulo: 'Incorporación', detalle: 'Accesos mínimos, NDA firmado y capacitación en el SGC.' },
    { paso: '06', titulo: 'Seguimiento', detalle: 'Revisión mensual del SLA con evidencia de Zabbix, TestRail y Jira.' },
    { paso: '07', titulo: 'Renovación o salida', detalle: 'Reevaluación anual (ISO 13485 §7.4.1) y transferencia ordenada.' },
  ],
  // Ejemplo de evaluación ponderada para el contrato de soporte Zabbix (puntaje 1–5)
  evaluacion: {
    criterios: [
      { criterio: 'Certificación y experiencia técnica en Zabbix', peso: 25 },
      { criterio: 'Confidencialidad y cumplimiento regulatorio', peso: 20 },
      { criterio: 'SLA ofrecido (respuesta y resolución)', peso: 20 },
      { criterio: 'Costo mensual', peso: 20 },
      { criterio: 'Soporte local en español y horario', peso: 15 },
    ],
    proveedores: [
      { nombre: 'Proveedor A (partner local certificado)', puntajes: [5, 4, 4, 4, 5] },
      { nombre: 'Proveedor B (soporte directo del fabricante)', puntajes: [5, 5, 5, 2, 2] },
      { nombre: 'Proveedor C (freelancer)', puntajes: [3, 2, 2, 5, 4] },
    ],
  },
  clausulas: [
    { titulo: 'Objeto y alcance', texto: 'Qué servicios están incluidos y, sobre todo, cuáles no.' },
    { titulo: 'Niveles de servicio', texto: 'Métricas, forma de medición, horario de cobertura y reporte mensual.' },
    { titulo: 'Penalidades y bonificaciones', texto: 'Descuentos automáticos por incumplimiento, con tope y causal de rescisión.' },
    { titulo: 'Confidencialidad y datos', texto: 'NDA, anonimización de datos clínicos y acceso mínimo necesario.' },
    { titulo: 'Derecho a auditar', texto: 'AITECH y su certificador pueden auditar al proveedor (ISO 13485 §7.4).' },
    { titulo: 'Propiedad intelectual', texto: 'Scripts, informes y configuraciones pertenecen a AITECH.' },
    { titulo: 'Continuidad y salida', texto: 'Plan de transferencia, devolución de información y periodo de transición.' },
    { titulo: 'Vigencia y controversias', texto: 'Duración, renovación, terminación anticipada y arbitraje o jurisdicción.' },
  ],
  references: [
    { apa: 'AXELOS. (2020). ITIL 4 practice guide: Supplier management. TSO.', url: 'https://www.axelos.com/certifications/itil-service-management', tipo: 'Marco de referencia' },
    { apa: 'International Organization for Standardization. (2015). ISO 9001:2015 Sistemas de gestión de la calidad — Requisitos (§8.4).', url: 'https://www.iso.org/standard/62085.html', tipo: 'Norma' },
    { apa: 'International Organization for Standardization. (2016). ISO 13485:2016 Medical devices — Quality management systems — Requirements for regulatory purposes (§7.4 Compras).', url: 'https://www.iso.org/standard/59752.html', tipo: 'Norma' },
    { apa: 'International Electrotechnical Commission. (2015). IEC 62304:2006+AMD1:2015 Medical device software — Software life cycle processes (SOUP).', url: 'https://webstore.iec.ch/en/publication/22794', tipo: 'Norma' },
    { apa: 'International Organization for Standardization. (2021). ISO/IEC 27036-1:2021 Cybersecurity — Supplier relationships — Part 1: Overview and concepts.', url: 'https://www.iso.org/standard/82905.html', tipo: 'Norma' },
    { apa: 'International Organization for Standardization. (2018). ISO/IEC 20000-1:2018 Information technology — Service management — Part 1: Service management system requirements.', url: 'https://www.iso.org/standard/70636.html', tipo: 'Norma' },
    { apa: 'Lacity, M. C., & Willcocks, L. P. (2012). Advanced outsourcing practice: Rethinking ITO, BPO and cloud services. Palgrave Macmillan.', url: 'https://doi.org/10.1057/9781137009241', tipo: 'Libro' },
    { apa: 'U.S. Food and Drug Administration. (2019). Off-the-shelf software use in medical devices: Guidance for industry and FDA staff.', url: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/shelf-software-use-medical-devices', tipo: 'Guía regulatoria' },
  ],
};
