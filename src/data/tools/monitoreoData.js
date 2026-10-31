// Contenido de la página /monitoreo: teoría de monitoreo, arquitectura Zabbix y qué vigila el Área de Calidad.

export const monitoreoData = {
  hero: {
    badge: 'MONITOREO & OBSERVABILIDAD',
    title: 'Monitoreo con Zabbix:',
    highlight: 'las metas de calidad convertidas en alertas.',
    subtitle:
      'Zabbix 7.0 LTS vigila el servidor QA Hub, la disponibilidad del sitio y, lo más importante, los indicadores del Área de Calidad: si una herramienta crítica en producción queda No conforme, Zabbix abre un problema de severidad Desastre.',
    chips: ['Zabbix 7.0 LTS', 'ITIL 4 · Monitoring & Event Mgmt', 'Google SRE', 'ISO/IEC 25010', 'API JSON-RPC'],
  },
  quotes: [
    {
      text: 'Tu sistema de monitoreo debe responder dos preguntas: qué está roto y por qué.',
      author: 'Rob Ewaschuk',
      role: 'Site Reliability Engineering, Google (Beyer et al., 2016), cap. 6',
    },
    {
      text: 'Cuando puedes medir aquello de lo que hablas y expresarlo en números, sabes algo al respecto; cuando no puedes expresarlo en números, tu conocimiento es escaso e insatisfactorio.',
      author: 'William Thomson, Lord Kelvin',
      role: 'Conferencia «Electrical Units of Measurement» (1883)',
    },
  ],
  theory: [
    {
      heading: 'Monitoreo y observabilidad',
      content:
        'Monitorear es recolectar y vigilar métricas conocidas contra umbrales («¿la CPU supera el 90 %?»). La observabilidad es la capacidad de explicar estados nuevos a partir de métricas, logs y trazas (Majors et al., 2022). Zabbix cubre el primer nivel y alimenta al segundo.',
    },
    {
      heading: 'ITIL 4: monitoreo y gestión de eventos',
      content:
        'La práctica observa sistemáticamente servicios y componentes, registra los cambios de estado como eventos y los clasifica en informativos, de advertencia y de excepción. Solo los de excepción se convierten en incidentes o problemas que alguien debe atender.',
    },
    {
      heading: 'Las cuatro señales doradas',
      content:
        'Google SRE propone vigilar latencia, tráfico, errores y saturación. En el QA Hub: tiempo de respuesta del sitio y la API (latencia), consultas a la API (tráfico), escenarios web fallidos (errores) y CPU/RAM del servidor (saturación).',
    },
    {
      heading: 'Arquitectura de Zabbix',
      content:
        'Zabbix server (motor que recolecta y evalúa), base de datos (PostgreSQL), frontend web (PHP), agentes en los equipos monitoreados y proxies opcionales para sitios remotos. Todo se configura también por su API JSON-RPC, que es como lo hacemos de forma reproducible.',
    },
    {
      heading: 'Ítems, triggers y problemas',
      content:
        'Un ítem es una métrica (por ejemplo, % de herramientas sin revisión vigente). Un trigger es una expresión lógica sobre ítems (last(...) > 50). Cuando se cumple, se genera un evento y un problema con una de seis severidades: no clasificada, información, advertencia, media, alta y desastre.',
    },
    {
      heading: 'Por qué le sirve a Calidad',
      content:
        'ISO/IEC 25010 define la fiabilidad (disponibilidad, tolerancia a fallos) como característica de calidad, e IEC 62304 exige un proceso de resolución de problemas. Zabbix aporta la evidencia medible y continua de ambos, en lugar de revisiones manuales esporádicas.',
    },
  ],
  capas: [
    {
      capa: 'Indicadores de calidad',
      fuente: 'Ítem HTTP → QA Hub API /api/dataset/kpis (cada 1 min) + 7 ítems dependientes con JSONPath',
      items: ['Tasa de conformidad', '% sin revisión vigente', 'Críticas en uso No conformes', 'Críticas nunca revisadas', '% categorías inconsistentes'],
    },
    {
      capa: 'Servicios',
      fuente: 'Escenarios web de Zabbix (HTTP 200 + contenido esperado)',
      items: ['Sitio público del Área de Calidad', 'QA Hub API /api/health', 'Tiempo de respuesta (ms)'],
    },
    {
      capa: 'Infraestructura',
      fuente: 'Zabbix agent 2 + plantilla «Linux by Zabbix agent»',
      items: ['CPU', 'Memoria', 'Disco', 'Disponibilidad del agente'],
    },
  ],
  // Cada meta del plan de calidad tiene su trigger; la severidad sigue la criticidad del dataset.
  triggers: [
    { severidad: 'Desastre', prioridad: 5, regla: 'criticas_no_conformes_en_uso > 0', significado: 'Una herramienta Crítica en producción falló su revisión: no debe seguir validando software médico.' },
    { severidad: 'Alta', prioridad: 4, regla: 'criticas_sin_revision > 0', significado: 'Herramienta Crítica nunca validada (SOUP sin evidencia, IEC 62304).' },
    { severidad: 'Alta', prioridad: 4, regla: 'sin_revision_vigente_pct > 50', significado: 'Más de la mitad del inventario incumple la revisión anual.' },
    { severidad: 'Alta', prioridad: 4, regla: 'web.test.fail[Sitio web] ≠ 0 · nodata(API, 5m)', significado: 'El sitio o la API dejaron de responder.' },
    { severidad: 'Media', prioridad: 3, regla: 'tasa_conformidad < 75', significado: 'Conformidad por debajo de la meta anual del plan de calidad.' },
    { severidad: 'Advertencia', prioridad: 2, regla: 'categoria_inconsistente_pct > 10', significado: 'Calidad del dato: categorías mal registradas en el inventario.' },
  ],
  pasos: [
    { comando: 'cd qa-hub && docker compose up -d', detalle: 'Levanta PostgreSQL, Zabbix server, frontend, agente, la QA Hub API y el configurador.' },
    { comando: 'docker compose logs zabbix-setup', detalle: 'Muestra «Zabbix configurado para AITECH | Calidad ✔» cuando terminó de crear hosts, ítems y triggers.' },
    { comando: 'http://localhost:8080  (Admin / zabbix)', detalle: 'Frontend de Zabbix: Monitoring → Problems muestra las alertas del Área de Calidad.' },
    { comando: 'docker compose --profile tunnel up -d', detalle: 'Publica la API con Cloudflare Tunnel; la URL https aparece en «docker compose logs tunnel».' },
    { comando: 'Pegar la URL en la barra «Servidor QA Hub»', detalle: 'La página pasa de CAPTURA a EN VIVO y consulta Zabbix cada 30 segundos.' },
  ],
  references: [
    { apa: 'Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (Eds.). (2016). Site reliability engineering: How Google runs production systems (cap. 6, Monitoring distributed systems). O\'Reilly Media.', url: 'https://sre.google/sre-book/monitoring-distributed-systems/', tipo: 'Libro' },
    { apa: 'Zabbix SIA. (2026). Zabbix 7.0 documentation: Manual.', url: 'https://www.zabbix.com/documentation/7.0/en/manual', tipo: 'Documentación oficial' },
    { apa: 'Zabbix SIA. (2026). Zabbix 7.0 API reference.', url: 'https://www.zabbix.com/documentation/7.0/en/manual/api', tipo: 'Documentación oficial' },
    { apa: 'AXELOS. (2019). ITIL foundation: ITIL 4 edition. TSO (práctica Monitoring and event management).', url: 'https://www.axelos.com/certifications/itil-service-management/itil-4-foundation', tipo: 'Marco de referencia' },
    { apa: 'Majors, C., Fong-Jones, L., & Miranda, G. (2022). Observability engineering: Achieving production excellence. O\'Reilly Media.', url: 'https://www.oreilly.com/library/view/observability-engineering/9781492076438/', tipo: 'Libro' },
    { apa: 'Olups, R. (2016). Zabbix network monitoring (2.ª ed.). Packt Publishing.', url: 'https://www.packtpub.com/product/zabbix-network-monitoring-second-edition/9781782161288', tipo: 'Libro' },
    { apa: 'International Organization for Standardization. (2023). ISO/IEC 25010:2023 Systems and software engineering — SQuaRE — Product quality model.', url: 'https://www.iso.org/standard/78176.html', tipo: 'Norma' },
    { apa: 'International Electrotechnical Commission. (2015). IEC 62304:2006+AMD1:2015 Medical device software — Software life cycle processes (cl. 9, Software problem resolution process).', url: 'https://webstore.iec.ch/en/publication/22794', tipo: 'Norma' },
  ],
};
