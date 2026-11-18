// Contenido estructurado de Conclusiones (Aporte del equipo) y Recomendaciones (A futuro)
// para la vista compacta en Inicio y la pantalla completa /conclusiones-recomendaciones.

export const conclusionesRecomendacionesData = {
  preview: {
    badge: 'CIERRE DEL PROYECTO · APORTE Y PROYECCIÓN',
    title: 'Conclusiones y recomendaciones.',
    desc: 'Balance del aporte construido por Dinastía Arias en el Área de Calidad de AITECH y hoja de ruta recomendada para su evolución futura.',
  },
  conclusiones: {
    id: 'conclusiones',
    badge: 'CONCLUSIONES · APORTE DEL EQUIPO',
    tag: 'Aporte del equipo',
    title: 'Lo que consolidó el equipo Dinastía Arias.',
    lead: 'A lo largo del proyecto articulamos estrategia, personas, procesos formales y tecnología basada en datos para posicionar al Área de Calidad como garante transversal de las siete verticales de AITECH.',
    items: [
      {
        id: 'conclusion-general',
        number: '01',
        tipo: 'General',
        enfoque: 'Aporte del equipo',
        theme: 'light',
        title: 'Gobierno integral y cultura de calidad preventiva',
        shortSummary:
          'Se consolidó un marco de calidad transversal que une misión, estructura organizacional, metodología Scrum y modelado de procesos (IDEF-0 y BPMN) para las siete verticales de AITECH.',
        detail:
          'El equipo Dinastía Arias diseñó y documentó un Área de Calidad capaz de operar más allá de la inspección final del código. Al integrar la visión estratégica hacia 2030, la definición clara de responsabilidades, el análisis de complementariedad del equipo (MBTI) y flujos operativos formales, se estableció una base de gobierno alineada con ISO 9001, ISO 13485, ISO/IEC 25010 e IEC 62304.',
        highlights: [
          'Alineación directa entre propósito estratégico, organigrama, descripciones de posición y dinámicas ágiles en Scrum con tablero Kanban operativo.',
          'Trazabilidad visible de responsabilidades mediante modelado funcional IDEF-0 y flujo BPMN 2.0 descargable para la evaluación y aprobación de versiones (QA Sign-off).',
          'Visión unificada del área que conecta procesos internos, presupuesto departamental y contratos de soporte externo con SLA medibles.',
        ],
        links: [
          { label: 'Misión y Visión', to: '/mision-vision' },
          { label: 'Organización', to: '/organizacion' },
          { label: 'BPMN', to: '/bpmn' },
          { label: 'IDEF-0', to: '/idef-0' },
        ],
      },
      {
        id: 'conclusion-objetivo',
        number: '02',
        tipo: 'Objetivo',
        enfoque: 'Aporte del equipo',
        theme: 'dark',
        title: 'Decisiones respaldadas en evidencia cuantitativa y control financiero',
        shortSummary:
          'La auditoría de las 1.200 herramientas evidenció 76,8 % sin revisión vigente, 23 críticas no conformes en uso y un presupuesto estructurado bajo el modelo de Costo de la Calidad (COQ).',
        detail:
          'El análisis riguroso del inventario de herramientas de QA (corte al 30 de abril de 2026) permitió sustituir apreciaciones subjetivas por indicadores verificables. Se cuantificaron las brechas de vigencia, no conformidad y calidad del dato, se comprobó estadísticamente con Weka que las fallas responden a causas sistémicas del proceso de revisión y se diseñó una estructura presupuestaria transparente junto a criterios objetivos de tercerización.',
        highlights: [
          'Diagnóstico medible sobre 1.200 instancias: 68,3 % de conformidad en revisadas, 221 herramientas nunca revisadas (60 críticas) y 68 no conformes aún activas en uso (23 críticas).',
          'Evidencia estadística en Weka (Kappa ≈ 0 en J48/Naive Bayes vs. ZeroR): el atraso es sistémico y las auditorías deben priorizar 6 herramientas clave (Jira, Locust, Postman, Selenium Grid, Snyk y Tosca).',
          'Estructura financiera y contractual clara: presupuesto mensual separado en prevención, evaluación y fallas internas (COQ), respaldado por 4 contratos externos con SLA y penalidades.',
        ],
        links: [
          { label: 'Tableau', to: '/tableau' },
          { label: 'Weka', to: '/weka' },
          { label: 'Presupuesto', to: '/presupuesto' },
          { label: 'Soporte externo', to: '/soporte-externo' },
        ],
      },
      {
        id: 'conclusion-tecnologica',
        number: '03',
        tipo: 'Tecnológicas',
        enfoque: 'Aporte del equipo',
        theme: 'lime',
        title: 'Ecosistema tecnológico integrado del inventario a la alerta en vivo',
        shortSummary:
          'Se implementó una arquitectura reproducible que enlaza un único dataset con dashboards en Tableau, minería de datos en Weka 3.8.6, observabilidad en Zabbix 7.0 LTS y un portal web en React.',
        detail:
          'El equipo materializó la propuesta teórica en una plataforma técnica funcional y reproducible. A partir de un flujo ETL automatizado que normaliza el inventario y genera formatos CSV y ARFF, un mismo conjunto de datos alimenta visualizaciones ejecutivas en Tableau, experimentos reproducibles en Weka y métricas monitoreadas por Zabbix con triggers de severidad automática, todo expuesto en un portal web moderno y verificado con pruebas automatizadas.',
        highlights: [
          'Arquitectura reproducible en contenedores (qa-hub con Docker Compose) integrando PostgreSQL, Zabbix 7.0 LTS, motor CLI de Weka 3.8.6 y una API REST de telemetría.',
          'Conversión de metas del plan de calidad en alertas técnicas: Zabbix evalúa los KPIs vía HTTP/JSONPath y dispara incidentes de severidad Desastre ante herramientas críticas no conformes.',
          'Portal web modular en React + Vite con respaldo estático y conexión en vivo, optimizado para accesibilidad, diseño adaptable y validado con pruebas E2E en Playwright.',
        ],
        links: [
          { label: 'Monitoreo Zabbix', to: '/monitoreo' },
          { label: 'Herramientas', to: '/herramientas' },
          { label: 'Alcance AITECH', to: '/alcance' },
        ],
      },
    ],
  },
  recomendaciones: {
    id: 'recomendaciones',
    badge: 'RECOMENDACIONES · PROYECCIÓN A FUTURO',
    tag: 'A futuro',
    title: 'Hoja de ruta recomendada para la evolución del área.',
    lead: 'Para transformar el diagnóstico y la plataforma implementada en una mejora sostenible dentro de AITECH, se proponen acciones escalonadas en los planos general, objetivo y tecnológico.',
    items: [
      {
        id: 'recomendacion-general',
        number: '01',
        tipo: 'General',
        enfoque: 'A futuro',
        theme: 'light',
        title: 'Institucionalizar el Sistema de Gestión de Calidad en las 7 verticales',
        shortSummary:
          'Extender el modelo de calidad preventiva hacia todas las áreas de AITECH, regularizar el inventario crítico en el corto plazo y avanzar hacia la certificación ISO 13485:2016.',
        detail:
          'A futuro, la calidad debe operar como política corporativa transversal y no como un esfuerzo aislado del departamento. Se recomienda consolidar comités trimestrales de revisión por la dirección, formalizar el ciclo de vida de proveedores críticos y establecer un calendario institucional de auditorías que sostenga la madurez operativa rumbo al horizonte 2030.',
        actions: [
          {
            horizon: 'Corto plazo · 0–3 meses',
            text: 'Ejecutar un plan de choque inmediato para poner en cuarentena y remediar las 23 herramientas críticas no conformes en uso y auditar las 60 críticas sin revisión.',
          },
          {
            horizon: 'Mediano plazo · 3–6 meses',
            text: 'Establecer un calendario anual obligatorio de revisión de vigencia por responsable, junto con capacitaciones continuas en IEC 62304 y seguridad de datos clínicos.',
          },
          {
            horizon: 'Largo plazo · 6–18 meses',
            text: 'Completar la auditoría externa de certificación ISO 13485:2016 y estandarizar los flujos BPMN de QA Sign-off en Software, Hardware, Redes, Seguridad, Cloud y Big Data.',
          },
        ],
      },
      {
        id: 'recomendacion-objetivo',
        number: '02',
        tipo: 'Objetivo',
        enfoque: 'A futuro',
        theme: 'dark',
        title: 'Fijar metas medibles, Quality Gates vinculantes y auditoría de SLA',
        shortSummary:
          'Imponer criterios cuantitativos obligatorios (DoD) que impidan operar activos no conformes, elevar la conformidad sobre el 85 % y auditar mensualmente el cumplimiento de SLA y presupuesto COQ.',
        detail:
          'Para garantizar que los indicadores se traduzcan en disciplina operativa, se recomienda establecer umbrales objetivos de cumplimiento obligatorio. Esto implica erradicar la inconsistencia taxonómica del 72,5 % desde la fuente de registro, auditar mensualmente el desempeño de los proveedores contratados y revisar trimestralmente el retorno de inversión en prevención frente a costos de fallas.',
        actions: [
          {
            horizon: 'Corto plazo · Control DoD',
            text: 'Bloquear por política de Definition of Done el paso o permanencia en estado «En uso» de cualquier herramienta con dictamen «No conforme» o sin evidencia SOUP vigente.',
          },
          {
            horizon: 'Mediano plazo · Metas KPI',
            text: 'Alcanzar una tasa de conformidad ≥ 85 %, reducir los activos sin revisión vigente por debajo del 10 % y bajar las categorías inconsistentes a menos del 5 %.',
          },
          {
            horizon: 'Largo plazo · Gobernanza COQ',
            text: 'Evaluar mensualmente el cumplimiento de SLA y penalidades de los 4 contratos externos (Zabbix, certificación, pentest y staffing) vinculando los resultados al presupuesto anual.',
          },
        ],
      },
      {
        id: 'recomendacion-tecnologica',
        number: '03',
        tipo: 'Tecnológicas',
        enfoque: 'A futuro',
        theme: 'lime',
        title: 'Automatizar el inventario en CI/CD, escalar observabilidad y enriquecer analítica',
        shortSummary:
          'Conectar Zabbix, Jira y CI/CD mediante APIs/webhooks en tiempo real, enriquecer el dataset predictivo de Weka con telemetría operativa y migrar tableros ejecutivos a Tableau Cloud con RBAC.',
        detail:
          'El siguiente salto tecnológico debe eliminar la carga manual de hojas de cálculo y cerrar el ciclo entre detección y corrección. Integrar el inventario como una CMDB viva conectada al pipeline de integración continua, sumar variables técnicas reales para potenciar la minería de datos y desplegar alertas multicanal garantizará trazabilidad en tiempo real para auditorías médicas.',
        actions: [
          {
            horizon: 'Corto plazo · Alertas activas',
            text: 'Integrar los triggers de Zabbix con notificaciones multicanal (correo, Slack/Teams) y apertura automática de incidentes en Jira ante eventos de severidad Alta o Desastre.',
          },
          {
            horizon: 'Mediano plazo · Inventario vivo',
            text: 'Automatizar el registro y validación de herramientas desde CI/CD con catálogos controlados que impidan guardar categorías erróneas o fechas de revisión nulas.',
          },
          {
            horizon: 'Largo plazo · Analítica y observabilidad',
            text: 'Publicar los tableros en Tableau Cloud con control de acceso por roles (RBAC), adoptar trazabilidad OpenTelemetry y reentrenar modelos de Weka con métricas reales de fallos en producción.',
          },
        ],
      },
    ],
  },
  matrix: [
    {
      eje: 'General',
      aporte: 'Marco integral de Calidad (estrategia, roles, Scrum, IDEF-0 y BPMN) alineado a las 7 verticales de AITECH.',
      futuro: 'Certificación ISO 13485:2016 y gobierno corporativo transversal con revisiones periódicas por la dirección.',
    },
    {
      eje: 'Objetivo',
      aporte: 'Auditoría cuantitativa de 1.200 herramientas, hallazgos estadísticos con Weka, presupuesto COQ y matriz de SLA.',
      futuro: 'Quality Gates obligatorios (0 críticas no conformes en uso), ≥ 85 % de conformidad y seguimiento mensual de SLA.',
    },
    {
      eje: 'Tecnológicas',
      aporte: 'Ecosistema conectado (React, Tableau, Weka 3.8.6, Zabbix 7.0 LTS y QA Hub API en Docker Compose).',
      futuro: 'Inventario automatizado en CI/CD, alertas Zabbix → Jira en vivo, Tableau Cloud con RBAC y observabilidad integral.',
    },
  ],
};
