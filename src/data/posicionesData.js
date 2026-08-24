export const posicionesData = [
  {
    id: "qa-lead",
    title: "QA Lead",
    category: "Jefatura",
    department: "Software",
    mission: "Garantizar la ejecución operativa de la estrategia de calidad, del cumplimiento de los plazos y de la calidad técnica de los entregables.",
    responsibilities: "Es responsable de la ejecución operativa de la estrategia de calidad, del cumplimiento de los plazos de las cuatro áreas a su cargo, de la calidad técnica de los entregables y del desarrollo continuo de los responsables de cada área.",
    workConditions: "Entorno de oficina o modalidad híbrida, liderando reuniones diarias de seguimiento (daily/standups), revisando métricas de calidad y coordinando con equipos locales y remotos. Puede enfrentar presión por cumplir plazos.",
    risks: [
      "Errores no detectados que lleguen a producción por fallas de coordinación.",
      "Sobrecarga del equipo de QA ante picos de demanda de pruebas.",
      "Conflictos de prioridades entre las distintas áreas de QA."
    ],
    requirements: [
      "Experiencia liderando equipos de QA multidisciplinarios.",
      "Conocimiento de metodologías ágiles (Scrum/Kanban) y ciclos de desarrollo de software.",
      "Dominio de herramientas de gestión de pruebas y seguimiento de incidencias (Jira, TestRail o similares).",
      "Capacidad de coordinar simultáneamente equipos de automatización, calidad funcional, rendimiento e integración."
    ],
    competencies: [
      "Liderazgo operativo y capacidad de coordinación de equipos.",
      "Organización y priorización bajo presión.",
      "Comunicación efectiva con equipos técnicos y stakeholders.",
      "Resolución de problemas y toma de decisiones ágil."
    ]
  },
  {
    id: "automatizacion",
    title: "Especialista de Automatización de QA",
    category: "Analista/Ingeniero de QA",
    department: "Software",
    mission: "Diseñar, desarrollar y mantener los frameworks y scripts de pruebas automatizadas, con el fin de aumentar la cobertura de pruebas, reducir los tiempos de regresión y acelerar la detección temprana de defectos.",
    responsibilities: "Fiabilidad y mantenimiento de las suites automatizadas, correcta integración de las pruebas en los procesos de CI/CD, y reportar de forma oportuna los defectos detectados.",
    workConditions: "Trabaja principalmente frente a un computador, en entorno de oficina o remoto, colaborando estrechamente con Desarrollo. Puede enfrentar plazos ajustados.",
    risks: [
      "Falsos positivos/negativos en las pruebas automatizadas que afecten la confianza.",
      "Deuda técnica acumulada en los scripts de automatización.",
      "Cuellos de botella si la automatización no evoluciona al ritmo del producto."
    ],
    requirements: [
      "Experiencia en automatización de pruebas con herramientas como Selenium, Cypress o Playwright.",
      "Conocimientos de programación (Java, Python, JavaScript u otro lenguaje afín).",
      "Familiaridad con herramientas de integración continua como Jenkins, GitLab CI.",
      "Conocimiento de metodologías ágiles de desarrollo."
    ],
    competencies: [
      "Pensamiento analítico y atención al detalle.",
      "Capacidad de resolución técnica de problemas.",
      "Proactividad para identificar oportunidades de automatización.",
      "Trabajo colaborativo con equipos de desarrollo."
    ]
  },
  {
    id: "funcional",
    title: "Especialista de Calidad Funcional",
    category: "Analista/Ingeniero de QA",
    department: "Software",
    mission: "Verificar que las funcionalidades del software cumplan con los requisitos definidos, ejecutando pruebas manuales y exploratorias que garanticen una experiencia correcta.",
    responsibilities: "Cobertura funcional de las pruebas, calidad y trazabilidad de los casos de prueba, y comunicación oportuna de los defectos detectados a los equipos correspondientes.",
    workConditions: "Entorno de oficina o remoto, participando en revisiones de requisitos, ejecución de pruebas y reuniones de seguimiento con Producto y Desarrollo.",
    risks: [
      "Defectos funcionales no detectados que impacten a los usuarios finales.",
      "Ambigüedad en los requisitos que dificulte la definición de casos de prueba.",
      "Presión por reducir tiempos de prueba ante plazos ajustados."
    ],
    requirements: [
      "Experiencia en diseño y ejecución de pruebas funcionales manuales.",
      "Conocimiento de técnicas de diseño de casos de prueba.",
      "Familiaridad con herramientas de gestión de pruebas e incidencias.",
      "Conocimiento de metodologías ágiles de desarrollo de software."
    ],
    competencies: [
      "Atención al detalle y pensamiento crítico.",
      "Capacidad de comunicación clara con Producto y Desarrollo.",
      "Orientación a la experiencia del usuario final.",
      "Rigurosidad en la documentación de pruebas y defectos."
    ]
  },
  {
    id: "rendimiento",
    title: "Especialista de Pruebas de Rendimiento",
    category: "Analista/Ingeniero de QA",
    department: "Software",
    mission: "Evaluar la estabilidad, velocidad y escalabilidad del software bajo distintas condiciones de carga, para anticipar problemas de rendimiento en producción.",
    responsibilities: "Planificación y ejecución de las pruebas de rendimiento, fiabilidad de los resultados obtenidos, y comunicar los riesgos detectados antes de cada release.",
    workConditions: "Entorno de oficina o remoto, ejecutando pruebas que en ocasiones requieren ventanas de tiempo específicas y coordinación con infraestructura.",
    risks: [
      "Problemas de rendimiento no detectados que afecten la experiencia en producción.",
      "Resultados de prueba poco representativos.",
      "Necesidad de ejecutar pruebas en horarios no convencionales."
    ],
    requirements: [
      "Experiencia en pruebas de rendimiento con herramientas como JMeter, Gatling, k6.",
      "Conocimiento de arquitecturas de software y factores que afectan el rendimiento.",
      "Capacidad de análisis de métricas y generación de informes técnicos.",
      "Conocimiento de metodologías ágiles."
    ],
    competencies: [
      "Pensamiento analítico orientado a datos.",
      "Rigurosidad metodológica en el diseño de pruebas.",
      "Capacidad de comunicar hallazgos técnicos de forma clara.",
      "Colaboración con equipos de Desarrollo e Infraestructura."
    ]
  },
  {
    id: "integracion",
    title: "Especialista de Pruebas de Integración",
    category: "Analista/Ingeniero de QA",
    department: "Software",
    mission: "Validar que los distintos componentes, servicios y sistemas del software interactúen correctamente entre sí, asegurando la coherencia e integridad de los flujos.",
    responsibilities: "Validación de la correcta integración entre componentes y sistemas, calidad de las pruebas de API y comunicación de defectos de integración detectados.",
    workConditions: "Entorno de oficina o remoto, coordinando con múltiples equipos de Desarrollo responsables de distintos servicios. Presión por validar integraciones complejas.",
    risks: [
      "Defectos de integración que se manifiesten solo en producción.",
      "Dependencias de terceros o servicios externos que dificulten las pruebas.",
      "Complejidad creciente a medida que aumenta el número de servicios integrados."
    ],
    requirements: [
      "Experiencia en pruebas de integración y de APIs (REST, SOAP).",
      "Familiaridad con herramientas de prueba de APIs como Postman, SoapUI.",
      "Conocimiento de arquitecturas de microservicios y sistemas distribuidos.",
      "Conocimiento de metodologías ágiles."
    ],
    competencies: [
      "Pensamiento sistémico para comprender la interacción entre componentes.",
      "Atención al detalle en la validación de contratos e interfaces.",
      "Capacidad de coordinación con múltiples equipos de Desarrollo.",
      "Rigurosidad en la documentación de pruebas e incidencias."
    ]
  }
];
