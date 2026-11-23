export const positions = [
  {
    id: 1,
    slug: 'qa-lead',
    title: '1. Jefatura de Calidad (QA Lead)',
    roleName: 'QA Lead (Jefatura de Calidad)',
    category: 'Jefatura / Dirección Operativa',
    department: 'Calidad & Software',
    titulares: '1 (Alan Flores)',
    jornada: 'Continuo / Tiempo Completo',
    mision: 'Liderar operativamente el equipo de QA, traduciendo la estrategia de calidad en planes concretos y asegurando coordinación total.',
    funciones: 'Distribuir tareas, dar seguimiento a KPIs, aprobar planes de prueba, escalar riesgos críticos y realizar mentoring.',
    funcionesDetalladas: [
      'Definir la estrategia y el plan maestro de pruebas para las 7 verticales tecnológicas de AITECH.',
      'Supervisar y dar seguimiento al cumplimiento de KPIs de calidad y metas de cobertura.',
      'Coordinar transversalmente las subáreas de Automatización, Funcional, Rendimiento e Integración.',
      'Aprobar los planes de prueba y validar los criterios de aceptación para el paso a producción.',
      'Escalar riesgos críticos de calidad a la dirección general y stakeholders corporativos.',
      'Liderar las sesiones diarias de seguimiento (Daily Scrum) y promover el mentoring continuo del equipo.'
    ],
    responsabilidades: 'Responsable de la ejecución operativa de la estrategia de calidad, del cumplimiento de los plazos de las cuatro áreas a su cargo, de la calidad técnica de los entregables y del desarrollo continuo de los responsables de cada área.',
    organigramaRelaciones: {
      reportaA: 'Dirección Corporativa de Tecnología y Product Owner (Ing. Cárdenas)',
      supervisaA: 'Especialistas de Automatización, Calidad Funcional, Rendimiento e Integración',
      coordinaCon: 'Líderes de Desarrollo, Jefatura de Infraestructura y Auditores Regulatorios'
    },
    condicionesTrabajo: 'Entorno de oficina o modalidad híbrida, liderando reuniones diarias de seguimiento, revisando métricas de observabilidad en Zabbix y Tableau, y coordinando con equipos multidisciplinarios bajo estándares ISO/IEC 25010.',
    riesgosPotenciales: [
      'Defectos críticos no detectados que alcancen entornos productivos por fallas de coordinación.',
      'Sobrecarga operativa del equipo ante picos imprevistos de releases y demandas de auditoría.',
      'Conflictos de priorización entre requerimientos de velocidad y rigor de aseguramiento.'
    ],
    requerimientos: [
      'Licenciatura o Ingeniería en Sistemas, Informática o ramas afines.',
      'Experiencia mínima comprobable de 3 a 5 años liderando equipos de QA multidisciplinarios.',
      'Dominio experto de marcos ágiles (Scrum, Kanban) y ciclo de vida de desarrollo seguro.',
      'Conocimiento en normas de calidad de software (ISO/IEC 25010, ISO 9001, IEEE 829).',
      'Manejo de herramientas de observabilidad, tracking de bugs (Jira) y suites de prueba.'
    ],
    competencias: [
      'Liderazgo transformacional y gestión de personas.',
      'Pensamiento estratégico y orientación a resultados con base empírica.',
      'Excelente comunicación técnica y ejecutiva.',
      'Capacidad de resolución de crisis y toma de decisiones bajo presión.'
    ],
    themeClass: 'theme-white',
    pdfPage: 1,
    pdfUrl: `${import.meta.env.BASE_URL}docs/Descripcion_Posiciones_QA.pdf#page=1`,
  },
  {
    id: 2,
    slug: 'automatizacion',
    title: '2. Especialista de Automatización',
    roleName: 'Especialista de Automatización de QA',
    category: 'Analista / Ingeniero de QA Automation',
    department: 'Calidad & Software',
    titulares: '1 (Sergio Arias)',
    jornada: 'Continuo / Tiempo Completo',
    mision: 'Diseñar, desarrollar y mantener frameworks automatizados para reducir tiempos de regresión y acelerar la detección de defectos.',
    funciones: 'Diseño de scripts, integración en pipelines de CI/CD y mantenimiento de la cobertura de pruebas.',
    funcionesDetalladas: [
      'Diseñar y evolucionar la arquitectura de frameworks de automatización E2E, API y componentes.',
      'Desarrollar y ejecutar suites de pruebas automatizadas con herramientas modernas (Playwright, Selenium).',
      'Integrar pruebas automatizadas dentro de los pipelines de CI/CD (GitHub Actions, GitLab CI).',
      'Monitorear la tasa de fallos, analizar falsos positivos y mantener la estabilidad de los scripts.',
      'Automatizar pruebas de regresión repetitivas identificadas desde el equipo funcional.',
      'Generar reportes automatizados de ejecución de pruebas para cada build del sistema.'
    ],
    responsabilidades: 'Fiabilidad y mantenimiento de las suites automatizadas, correcta integración de las pruebas en los procesos de CI/CD, y reportar de forma oportuna los defectos detectados.',
    organigramaRelaciones: {
      reportaA: 'Jefatura de Calidad (QA Lead)',
      supervisaA: 'Sin personal a cargo directo; asesora técnicamente al equipo',
      coordinaCon: 'Desarrolladores de software, DevOps / SRE y Especialista Funcional'
    },
    condicionesTrabajo: 'Trabajo intensivo en desarrollo de código de prueba, ejecución en entornos locales y pipelines distribuidos en la nube, con participación activa en refinamientos técnicos.',
    riesgosPotenciales: [
      'Falsos positivos o pruebas inestables (flaky tests) que degraden la confianza en el pipeline.',
      'Deuda técnica acumulada en los repositorios de automatización por cambios de interfaz.',
      'Desalineación entre la velocidad de nuevos desarrollos y la cobertura automatizada.'
    ],
    requerimientos: [
      'Ingeniería o Licenciatura en Sistemas, Ciencias de la Computación o afines.',
      'Experiencia sólida en lenguajes como JavaScript/TypeScript, Python o Java.',
      'Dominio de Playwright, Cypress, Selenium WebDriver o Appium.',
      'Conocimiento en Docker, integración continua y control de versiones distribuido (Git).',
      'Comprensión del patrón Page Object Model (POM) y pruebas basadas en datos.'
    ],
    competencias: [
      'Pensamiento analítico y meticulosa atención al detalle técnico.',
      'Proactividad para detectar cuellos de botella y oportunidades de optimización.',
      'Capacidad de abstracción y diseño de software limpio para pruebas.',
      'Espíritu de colaboración estrecha con ingeniería de desarrollo.'
    ],
    themeClass: 'theme-slate',
    pdfPage: 2,
    pdfUrl: `${import.meta.env.BASE_URL}docs/Descripcion_Posiciones_QA.pdf#page=2`,
  },
  {
    id: 3,
    slug: 'funcional',
    title: '3. Especialista de Calidad Funcional',
    roleName: 'Especialista de Calidad Funcional de QA',
    category: 'Analista de QA Funcional / Manual',
    department: 'Calidad & Software',
    titulares: '1 (Leonardo Delgado)',
    jornada: 'Continuo / Tiempo Completo',
    mision: 'Verificar que las funcionalidades cumplan requisitos definidos, ejecutando pruebas manuales y exploratorias.',
    funciones: 'Diseño de casos de prueba, validación de historias de usuario, reporte de defectos y pruebas UAT.',
    funcionesDetalladas: [
      'Analizar especificaciones funcionales, criterios de aceptación e historias de usuario.',
      'Diseñar matrices de prueba exhaustivas y casos de prueba detallados con cobertura trazable.',
      'Ejecutar pruebas funcionales manuales, exploratorias y de regresión en cada ciclo de sprint.',
      'Registrar, clasificar y documentar defectos en Jira con evidencia reproducible y criticidad.',
      'Coordinar y facilitar pruebas de aceptación de usuario (UAT) junto a los stakeholders.',
      'Validar que los entregables cumplan con la Definición de Terminado (DoD) acordada.'
    ],
    responsabilidades: 'Garantizar la cobertura funcional de las pruebas, la calidad y trazabilidad de los casos de prueba, y la comunicación oportuna de los defectos detectados.',
    organigramaRelaciones: {
      reportaA: 'Jefatura de Calidad (QA Lead)',
      supervisaA: 'Sin personal a cargo',
      coordinaCon: 'Product Owner, Diseñadores UX/UI, Desarrolladores y Especialista de Automatización'
    },
    condicionesTrabajo: 'Entorno de oficina o remoto, interactuando constantemente con interfaces de usuario, especificaciones de negocio y entornos de staging en las diferentes verticales.',
    riesgosPotenciales: [
      'Defectos funcionales sutiles o de casos extremos no detectados antes del despliegue.',
      'Ambigüedades en requisitos funcionales que deriven en discrepancias de interpretación.',
      'Compresión de tiempos de prueba ante retrasos en la entrega de incrementos.'
    ],
    requerimientos: [
      'Formación universitaria en Ingeniería de Sistemas, Informática o carreras relacionadas.',
      'Experiencia práctica en diseño y ejecución de casos de prueba bajo normas IEEE 829.',
      'Conocimiento en técnicas de caja negra (partición de equivalencia, análisis de valores límite).',
      'Manejo de herramientas de gestión de pruebas (TestRail, Jira, Zephyr).',
      'Conocimiento de estándares de usabilidad, accesibilidad y experiencia de usuario.'
    ],
    competencias: [
      'Pensamiento crítico y capacidad inquisitiva.',
      'Alta atención al detalle y empatía con el usuario final.',
      'Habilidad para redactar informes claros, precisos y reproducibles.',
      'Organización y método en la documentación técnica.'
    ],
    themeClass: 'theme-charcoal',
    pdfPage: 4,
    pdfUrl: `${import.meta.env.BASE_URL}docs/Descripcion_Posiciones_QA.pdf#page=4`,
  },
  {
    id: 4,
    slug: 'rendimiento',
    title: '4. Especialista de Rendimiento',
    roleName: 'Especialista de Pruebas de Rendimiento',
    category: 'Ingeniero de Performance / QA Engineer',
    department: 'Calidad & Software',
    titulares: '1 (Daniel Zamorano)',
    jornada: 'Continuo / Tiempo Completo',
    mision: 'Evaluar estabilidad, velocidad y escalabilidad bajo condiciones de carga para anticipar problemas en producción.',
    funciones: 'Pruebas de carga/estrés, análisis de métricas de rendimiento y elaboración de reportes de optimización.',
    funcionesDetalladas: [
      'Diseñar planes de prueba no funcionales basados en perfiles de tráfico reales y proyectados.',
      'Desarrollar scripts de carga, estrés, volumen, resistencia y picos con JMeter, k6 o Locust.',
      'Ejecutar pruebas sobre APIs, microservicios, brokers de mensajes MQTT y bases de datos.',
      'Monitorear el uso de CPU, memoria, I/O de disco y latencia de red durante la prueba.',
      'Identificar cuellos de botella en código, consultas de base de datos o topología de red.',
      'Elaborar informes ejecutivos y técnicos con recomendaciones de escalabilidad y optimización.'
    ],
    responsabilidades: 'Planificación y ejecución de las pruebas de rendimiento, fiabilidad de las métricas obtenidas, y comunicar con rigor los riesgos antes de cada liberación.',
    organigramaRelaciones: {
      reportaA: 'Jefatura de Calidad (QA Lead)',
      supervisaA: 'Sin personal a cargo',
      coordinaCon: 'Ingenieros de Backend, Administradores de Bases de Datos y Especialistas de Infraestructura'
    },
    condicionesTrabajo: 'Trabajo especializado con herramientas de inyección de carga, en ventanas controladas de tiempo y coordinación estrecha con la infraestructura de servidores.',
    riesgosPotenciales: [
      'Escenarios de prueba no representativos que no reflejen el comportamiento real del hospital/usuario.',
      'Degradación de servicios compartidos si las pruebas de carga no se aíslan adecuadamente.',
      'Dificultad para reproducir problemas de concurrencia y fugas de memoria en entornos locales.'
    ],
    requerimientos: [
      'Ingeniería de Sistemas, Telecomunicaciones, Informática o afines.',
      'Experiencia comprobada en herramientas de rendimiento: Apache JMeter, k6, Gatling o Artillery.',
      'Conocimientos profundos en redes (TCP/IP, HTTP/2, WebSockets, MQTT) y bases de datos.',
      'Manejo de sistemas de monitoreo y observabilidad (Zabbix, Grafana, Prometheus).',
      'Capacidad analítica para correlacionar métricas de software y hardware.'
    ],
    competencias: [
      'Enfoque cuantitativo y rigor estadístico en la interpretación de percentiles.',
      'Curiosidad técnica para rastrear causas raíz de cuellos de botella.',
      'Comunicación pedagógica para explicar métricas complejas a perfiles no técnicos.',
      'Planificación meticulosa y gestión de riesgos operativos.'
    ],
    themeClass: 'theme-emerald',
    pdfPage: 5,
    pdfUrl: `${import.meta.env.BASE_URL}docs/Descripcion_Posiciones_QA.pdf#page=5`,
  },
  {
    id: 5,
    slug: 'integracion',
    title: '5. Especialista de Integración',
    roleName: 'Especialista de Pruebas de Integración & CI/CD',
    category: 'Ingeniero de Integración / QA Engineer',
    department: 'Calidad & Software',
    titulares: '1 (Christian Coronel)',
    jornada: 'Continuo / Tiempo Completo',
    mision: 'Validar que distintos componentes y servicios interactúen correctamente, asegurando la coherencia de extremo a extremo.',
    funciones: 'Ejecución de pruebas entre módulos/APIs, verificación de flujos y reporte de incompatibilidades.',
    funcionesDetalladas: [
      'Verificar contratos de comunicación, esquemas JSON/Protobuf y compatibilidad de APIs.',
      'Diseñar y ejecutar pruebas de integración continua entre servicios de software, hardware y nube.',
      'Validar la integridad de transacciones y flujos de datos a través de múltiples microservicios.',
      'Configurar y mantener entornos de prueba de integración con dependencias mockeadas o en contenedores.',
      'Supervisar la correcta sincronización entre eventos de red, colas de mensajes y servicios de base.',
      'Documentar defectos de interoperabilidad y coordinar correcciones entre diferentes equipos.'
    ],
    responsabilidades: 'Validación de la correcta integración entre componentes y sistemas, calidad de las pruebas de API y contratos, y comunicación oportuna de incompatibilidades detectadas.',
    organigramaRelaciones: {
      reportaA: 'Jefatura de Calidad (QA Lead)',
      supervisaA: 'Sin personal a cargo',
      coordinaCon: 'Equipos de Desarrollo de frontend/backend, DevOps y Especialista de Automatización'
    },
    condicionesTrabajo: 'Entorno de trabajo dinámico, interactuando con múltiples repositorios de código, APIs distribuidas, contenedores Docker y servicios cloud en La Paz y remoto.',
    riesgosPotenciales: [
      'Incompatibilidades entre versiones de microservicios descubiertas tardíamente en producción.',
      'Dependencias de servicios externos no controlados que bloqueen la ejecución de flujos completos.',
      'Complejidad exponencial a medida que se incorporan nuevas verticales tecnológicas.'
    ],
    requerimientos: [
      'Ingeniería o Licenciatura en Sistemas, Ciencias de la Computación o ramas afines.',
      'Dominio de herramientas de pruebas de API: Postman, Newman, Insomnia, SoapUI.',
      'Conocimiento en arquitecturas basadas en microservicios, eventos y REST/GraphQL.',
      'Experiencia con Docker, Docker Compose, Git y pipelines de CI/CD.',
      'Comprensión de pruebas de contrato (Pact) y mock servers.'
    ],
    competencias: [
      'Pensamiento sistémico y visión global de la arquitectura de soluciones.',
      'Habilidad para coordinar y negociar interfaces entre equipos de trabajo.',
      'Metodología rigurosa para la documentación de contratos y endpoints.',
      'Agilidad para adaptarse a tecnologías y arquitecturas emergentes.'
    ],
    themeClass: 'theme-mint',
    pdfPage: 6,
    pdfUrl: `${import.meta.env.BASE_URL}docs/Descripcion_Posiciones_QA.pdf#page=6`,
  },
];
