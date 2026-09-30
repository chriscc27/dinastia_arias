// Configuración y geometría del diagrama BPMN 2.0.2 estilo Camunda / BPMN.io estándar

export const bpmnDiagramConfig = {
  canvasWidth: 1620,
  canvasHeight: 700,
  poolHeaderWidth: 42,
  laneHeaderWidth: 42,
  poolTitle: 'AITECH — EVALUACIÓN Y APROBACIÓN DE VERSIÓN DE SOFTWARE',
  lanes: [
    {
      id: 'lane-dev',
      name: 'Equipo de Desarrollo',
      y: 0,
      height: 220,
      role: 'Preparación de builds, integración continua y corrección de defectos',
    },
    {
      id: 'lane-qa',
      name: 'Departamento de Calidad (QA)',
      y: 220,
      height: 250,
      role: 'Verificación de requisitos, ejecución de pruebas (ISO 25010, OWASP) e informes',
    },
    {
      id: 'lane-po',
      name: 'Product Owner (Ing. Cárdenas)',
      y: 470,
      height: 230,
      role: 'Alineación de negocio, validación DoD y emisión de QA Sign-off',
    },
  ],

  // Nodos estándar BPMN
  nodes: [
    // --- CARRIL 1: EQUIPO DE DESARROLLO ---
    {
      id: 'start-event',
      stepNumber: 1,
      type: 'event-start',
      laneId: 'lane-dev',
      laneName: 'Equipo de Desarrollo',
      x: 120,
      y: 85,
      width: 40,
      height: 40,
      label: 'Versión candidata\ndisponible',
      labelY: 135,
      title: 'Versión candidata disponible',
      shortDesc: 'Generación de Release Candidate (RC) en el pipeline de CI/CD.',
      objective: 'Disparar el ciclo de aseguramiento de calidad con una versión congelada.',
      input: 'Código fuente integrado en rama release con pruebas unitarias pasadas.',
      controlApplied: 'Políticas de control de versiones y branching de AITECH.',
      activityDetails: 'El entorno de CI compila y genera automáticamente el tag de versión.',
      output: 'Artifact ejecutable compilado, changelog y manifiesto técnico.',
      taskType: 'none',
    },
    {
      id: 'task-preparar-build',
      stepNumber: 2,
      type: 'task',
      taskType: 'service', // Engranaje
      laneId: 'lane-dev',
      laneName: 'Equipo de Desarrollo',
      x: 205,
      y: 73,
      width: 120,
      height: 64,
      label: 'Preparar versión\ncandidata',
      title: 'Preparar versión candidata',
      shortDesc: 'Compilación de paquetes y despliegue inicial en entorno homologado de QA.',
      objective: 'Asegurar la estabilidad del entorno y la disponibilidad del sistema.',
      input: 'Build etiquetada y dependencias congeladas.',
      controlApplied: 'Estándares de desarrollo y empaquetado de AITECH.',
      activityDetails: 'Despliegue de contenedores y verificación de arranque exitoso.',
      output: 'Entorno de pruebas homologado activo y accesible.',
    },
    {
      id: 'task-entregar-build',
      stepNumber: 3,
      type: 'task',
      taskType: 'send', // Sobre
      laneId: 'lane-dev',
      laneName: 'Equipo de Desarrollo',
      x: 365,
      y: 73,
      width: 125,
      height: 64,
      label: 'Entregar build y\ndocumentación',
      title: 'Entregar build y documentación',
      shortDesc: 'Transferencia formal del build y notas de versión hacia QA.',
      objective: 'Entregar la versión junto con criterios de aceptación y changelog.',
      input: 'Notas de versión y credenciales del entorno de QA.',
      controlApplied: 'Plantilla institucional de entrega de software de AITECH.',
      activityDetails: 'Notificación oficial de entrega al canal de calidad con el changelog.',
      output: 'Acta de entrega técnica registrada en el sistema de seguimiento.',
    },
    {
      id: 'task-corregir-defectos',
      stepNumber: 10,
      type: 'task',
      taskType: 'user', // Usuario
      laneId: 'lane-dev',
      laneName: 'Equipo de Desarrollo',
      x: 1060,
      y: 73,
      width: 130,
      height: 64,
      label: 'Corregir defectos\ny generar hotfix',
      title: 'Corregir defectos y generar hotfix',
      shortDesc: 'Resolución de fallas bloqueantes identificadas por QA.',
      objective: 'Subsanar vulnerabilidades y errores críticos para permitir la re-evaluación.',
      input: 'Tickets de bugs reportados por QA con pasos de reproducción.',
      controlApplied: 'Criterio de severidad estricto: cero defectos bloqueantes en release.',
      activityDetails: 'Desarrollo del parche, revisión de código por pares y re-empaquetado.',
      output: 'Nuevo build corregido (patch build) listo para regresión.',
    },

    // --- CARRIL 2: DEPARTAMENTO DE CALIDAD (QA) ---
    {
      id: 'task-verificar-requisitos',
      stepNumber: 4,
      type: 'task',
      taskType: 'user',
      laneId: 'lane-qa',
      laneName: 'Departamento de Calidad (QA)',
      x: 365,
      y: 310,
      width: 125,
      height: 64,
      label: 'Verificar requisitos\ny entregables',
      title: 'Verificar requisitos y entregables',
      shortDesc: 'Comprobación de completitud de los requisitos y alcance comprometido.',
      objective: 'Validar que el entregable cumple con las condiciones mínimas para iniciar pruebas.',
      input: 'Build en staging, notas de versión y criterios de aceptación.',
      controlApplied: 'Criterios de entrada (Entry Criteria) del Plan Maestro de Pruebas.',
      activityDetails: 'Inspección de artefactos, acceso a endpoints y verificación de scope.',
      output: 'Checklist de entrada firmado favorable o con observaciones.',
    },
    {
      id: 'gateway-requisitos',
      stepNumber: 5,
      type: 'gateway',
      laneId: 'lane-qa',
      laneName: 'Departamento de Calidad (QA)',
      x: 535,
      y: 320,
      width: 44,
      height: 44,
      label: '¿Requisitos\ncompletos?',
      labelY: 380,
      title: 'Gateway: ¿Requisitos completos?',
      shortDesc: 'Bifurcación exclusiva (XOR) según la completitud de la entrega.',
      objective: 'Evitar iniciar pruebas costosas sobre versiones incompletas o inestables.',
      input: 'Checklist de verificación de requisitos.',
      controlApplied: 'Definition of Ready (DoR) del marco ágil de AITECH.',
      activityDetails: 'Si faltan requisitos o el entorno falla, se rechaza la entrega a Desarrollo.',
      output: 'Decisión: Continuar al plan de pruebas (SI) o Rechazar a Desarrollo (NO).',
      gatewayRoutes: [
        { condition: 'NO', target: 'Preparar versión candidata (Dev)', action: 'Retorna al equipo de desarrollo con observaciones.' },
        { condition: 'SI', target: 'Diseñar plan de pruebas', action: 'Avanza hacia la planificación y ejecución técnica.' },
      ],
    },
    {
      id: 'task-disenar-pruebas',
      stepNumber: 6,
      type: 'task',
      taskType: 'manual', // Manual / Checklist
      laneId: 'lane-qa',
      laneName: 'Departamento de Calidad (QA)',
      x: 625,
      y: 310,
      width: 120,
      height: 64,
      label: 'Diseñar plan y\ncasos de prueba',
      title: 'Diseñar plan y casos de prueba',
      shortDesc: 'Estructuración de casos de prueba funcionales y no funcionales.',
      objective: 'Asegurar cobertura total de los escenarios críticos de negocio.',
      input: 'Historias de usuario, especificaciones de API y matriz de trazabilidad.',
      controlApplied: 'Estándar ISO/IEC/IEEE 29119-3 (Documentación de Pruebas).',
      activityDetails: 'Creación de suites de pruebas en TestRail/Jira y parametrización de datos.',
      output: 'Plan de pruebas detallado y matriz de cobertura validada.',
    },
    {
      id: 'task-ejecutar-pruebas',
      stepNumber: 7,
      type: 'task',
      taskType: 'service',
      laneId: 'lane-qa',
      laneName: 'Departamento de Calidad (QA)',
      x: 780,
      y: 310,
      width: 130,
      height: 64,
      label: 'Ejecutar pruebas\nfuncionales y carga',
      title: 'Ejecutar pruebas funcionales y no funcionales',
      shortDesc: 'Ejecución rigurosa de pruebas funcionales, rendimiento y compatibilidad.',
      objective: 'Evaluar el comportamiento real del software bajo condiciones de estrés.',
      input: 'Casos de prueba, scripts automatizados en Cypress/Playwright.',
      controlApplied: 'ISO/IEC 25010:2023 (Calidad del producto de software).',
      activityDetails: 'Ejecución paralela de suites de regresión y verificación no funcional.',
      output: 'Registros de ejecución, tiempos de respuesta y bitácora de resultados.',
    },
    {
      id: 'task-verificar-seguridad',
      stepNumber: 8,
      type: 'task',
      taskType: 'service',
      laneId: 'lane-qa',
      laneName: 'Departamento de Calidad (QA)',
      x: 945,
      y: 310,
      width: 125,
      height: 64,
      label: 'Verificar seguridad\n(OWASP ASVS)',
      title: 'Verificaciones de seguridad de la aplicación',
      shortDesc: 'Análisis estático (SAST), dinámico (DAST) y cumplimiento OWASP.',
      objective: 'Identificar brechas de seguridad, inyecciones y fallos de autenticación.',
      input: 'Endpoints expuestos, esquemas de autorización y código ejecutable.',
      controlApplied: 'OWASP ASVS v4.0 Nivel 2 e ISO/IEC 27001.',
      activityDetails: 'Escaneo de dependencias vulnerables y validación de tokens JWT y RBAC.',
      output: 'Informe de hallazgos de seguridad clasificados por CVSS.',
    },
    {
      id: 'gateway-defectos',
      stepNumber: 9,
      type: 'gateway',
      laneId: 'lane-qa',
      laneName: 'Departamento de Calidad (QA)',
      x: 1105,
      y: 320,
      width: 44,
      height: 44,
      label: '¿Defectos\ncríticos?',
      labelY: 380,
      title: 'Gateway: ¿Defectos bloqueantes o críticos?',
      shortDesc: 'Evaluación de severidad según umbrales de aceptación de AITECH.',
      objective: 'Determinar si la calidad alcanzada permite la liberación o exige hotfix.',
      input: 'Reporte consolidado de fallas y vulnerabilidades.',
      controlApplied: 'Definición de Severidad: Cero tolerancia a defectos Críticos/Bloqueantes.',
      activityDetails: 'Si hay defectos bloqueantes se detiene el release y se escala a Desarrollo.',
      output: 'Bifurcación: Hotfix a Desarrollo (SI) o Continuar a Informe de Calidad (NO).',
      gatewayRoutes: [
        { condition: 'SI (Críticos)', target: 'Corregir defectos y generar hotfix (Dev)', action: 'Devuelve la build a Desarrollo para remediación urgente.' },
        { condition: 'NO (Conforme)', target: 'Consolidar informe de calidad', action: 'Continúa al consolidado final de métricas.' },
      ],
    },
    {
      id: 'task-consolidar-informe',
      stepNumber: 11,
      type: 'task',
      taskType: 'send',
      laneId: 'lane-qa',
      laneName: 'Departamento de Calidad (QA)',
      x: 1205,
      y: 310,
      width: 125,
      height: 64,
      label: 'Consolidar informe\nde calidad',
      title: 'Consolidar informe de calidad',
      shortDesc: 'Generación del Quality Report oficial con métricas y evidencias.',
      objective: 'Proporcionar al Product Owner la base objetiva para la toma de decisiones.',
      input: 'Resultados de todas las pruebas, coverage y estado del backlog.',
      controlApplied: 'ISO/IEC/IEEE 29119-2 (Informes de prueba resumidos).',
      activityDetails: 'Cálculo de Pass Rate, densidad de defectos y redacción de recomendación técnica.',
      output: 'Quality Report formal firmado por el QA Lead.',
    },

    // --- CARRIL 3: RESPONSABLE DEL PRODUCTO (PRODUCT OWNER) ---
    {
      id: 'task-evaluar-criterios-po',
      stepNumber: 12,
      type: 'task',
      taskType: 'user',
      laneId: 'lane-po',
      laneName: 'Product Owner (Ing. Cárdenas)',
      x: 1205,
      y: 540,
      width: 125,
      height: 64,
      label: 'Evaluar criterios\nde negocio (PO)',
      title: 'Evaluar criterios de negocio y valor',
      shortDesc: 'Revisión por el Product Owner (Ingeniero Cárdenas) del informe técnico.',
      objective: 'Verificar la satisfacción de la Definition of Done y los objetivos de negocio.',
      input: 'Quality Report de QA, demo del software y feedback de stakeholders.',
      controlApplied: 'Definition of Done (DoD) y Criterios de Aceptación del Sprint.',
      activityDetails: 'El Ing. Cárdenas valida la conformidad del producto contra el alcance comercial.',
      output: 'Dictamen de aceptación o solicitud de cambios.',
    },
    {
      id: 'gateway-aprobacion-po',
      stepNumber: 13,
      type: 'gateway',
      laneId: 'lane-po',
      laneName: 'Product Owner (Ing. Cárdenas)',
      x: 1375,
      y: 550,
      width: 44,
      height: 44,
      label: '¿Aprobado para\nliberación?',
      labelY: 610,
      title: 'Gateway: ¿Cumple criterios de liberación?',
      shortDesc: 'Decisión ejecutiva de pase a producción basada en valor y riesgo.',
      objective: 'Autorizar o suspender el despliegue a los usuarios finales.',
      input: 'Dictamen del Product Owner.',
      controlApplied: 'Políticas de gobernanza y control de cambios de AITECH.',
      activityDetails: 'Si cumple DoD se procede al sign-off; de lo contrario se posterga la entrega.',
      output: 'Decisión: QA Sign-off aprobado (SI) o Corrección a Desarrollo (NO).',
      gatewayRoutes: [
        { condition: 'NO', target: 'Retorno a Desarrollo para replanificación', action: 'Notificación formal de rechazo comercial.' },
        { condition: 'SI', target: 'Emitir QA Sign-off y autorizar release', action: 'Autorización irrevocable para despliegue.' },
      ],
    },
    {
      id: 'task-emitir-signoff',
      stepNumber: 14,
      type: 'task',
      taskType: 'send',
      laneId: 'lane-po',
      laneName: 'Product Owner (Ing. Cárdenas)',
      x: 1460,
      y: 540,
      width: 110,
      height: 64,
      label: 'Emitir QA Sign-off\ny autorizar',
      title: 'Emitir autorización formal de liberación',
      shortDesc: 'Emisión del certificado de sign-off conjunto entre QA y Product Owner.',
      objective: 'Habilitar el disparador automático de despliegue a producción.',
      input: 'Acta de aprobación firmada digitalmente.',
      controlApplied: 'Gobernanza de producción y auditoría de software.',
      activityDetails: 'Publicación de la etiqueta de release aprobada en el repositorio.',
      output: 'Autorización oficial de pase a producción y notificación a operaciones.',
    },
    {
      id: 'end-event',
      stepNumber: 15,
      type: 'event-end',
      laneId: 'lane-po',
      laneName: 'Product Owner (Ing. Cárdenas)',
      x: 1575,
      y: 552,
      width: 40,
      height: 40,
      label: 'Versión liberada\na producción',
      labelY: 605,
      title: 'Versión liberada para producción',
      shortDesc: 'Fin exitoso del proceso de evaluación y aprobación de software.',
      objective: 'Puesta en producción del software garantizando calidad, estabilidad y seguridad.',
      input: 'QA Sign-off y paquete de despliegue validado.',
      controlApplied: 'SLA de disponibilidad y monitoreo continuo.',
      activityDetails: 'Pase a producción completado sin incidentes.',
      output: 'Software operando en producción con calidad certificada.',
      taskType: 'none',
    },
  ],

  // Conexiones de secuencia ortogonales (Sequence Flows estándar BPMN)
  flows: [
    // 1 -> 2: Inicio a Preparar build
    {
      id: 'flow-1-2',
      from: 'start-event',
      to: 'task-preparar-build',
      points: [
        { x: 160, y: 105 },
        { x: 205, y: 105 },
      ],
    },
    // 2 -> 3: Preparar build a Entregar build
    {
      id: 'flow-2-3',
      from: 'task-preparar-build',
      to: 'task-entregar-build',
      points: [
        { x: 325, y: 105 },
        { x: 365, y: 105 },
      ],
    },
    // 3 -> 4: De Dev a QA (Verificar requisitos) - Cruzando carril
    {
      id: 'flow-3-4',
      from: 'task-entregar-build',
      to: 'task-verificar-requisitos',
      points: [
        { x: 427, y: 137 },
        { x: 427, y: 310 },
      ],
    },
    // 4 -> 5: Verificar requisitos a Gateway Requisitos
    {
      id: 'flow-4-5',
      from: 'task-verificar-requisitos',
      to: 'gateway-requisitos',
      points: [
        { x: 490, y: 342 },
        { x: 535, y: 342 },
      ],
    },
    // 5 -> 2 (NO): Gateway Requisitos vuelve a Dev si faltan requisitos
    {
      id: 'flow-5-2-no',
      from: 'gateway-requisitos',
      to: 'task-preparar-build',
      label: 'No',
      labelX: 565,
      labelY: 260,
      points: [
        { x: 557, y: 320 },
        { x: 557, y: 45 },
        { x: 265, y: 45 },
        { x: 265, y: 73 },
      ],
    },
    // 5 -> 6 (SI): Gateway Requisitos a Diseñar pruebas
    {
      id: 'flow-5-6-si',
      from: 'gateway-requisitos',
      to: 'task-disenar-pruebas',
      label: 'Si',
      labelX: 590,
      labelY: 332,
      points: [
        { x: 579, y: 342 },
        { x: 625, y: 342 },
      ],
    },
    // 6 -> 7: Diseñar pruebas a Ejecutar pruebas
    {
      id: 'flow-6-7',
      from: 'task-disenar-pruebas',
      to: 'task-ejecutar-pruebas',
      points: [
        { x: 745, y: 342 },
        { x: 780, y: 342 },
      ],
    },
    // 7 -> 8: Ejecutar pruebas a Seguridad
    {
      id: 'flow-7-8',
      from: 'task-ejecutar-pruebas',
      to: 'task-verificar-seguridad',
      points: [
        { x: 910, y: 342 },
        { x: 945, y: 342 },
      ],
    },
    // 8 -> 9: Seguridad a Gateway Defectos
    {
      id: 'flow-8-9',
      from: 'task-verificar-seguridad',
      to: 'gateway-defectos',
      points: [
        { x: 1070, y: 342 },
        { x: 1105, y: 342 },
      ],
    },
    // 9 -> 10 (SI): Gateway Defectos a Corregir defectos (Dev) - Cruce a carril superior
    {
      id: 'flow-9-10-si',
      from: 'gateway-defectos',
      to: 'task-corregir-defectos',
      label: 'Si (críticos)',
      labelX: 1135,
      labelY: 245,
      points: [
        { x: 1127, y: 320 },
        { x: 1127, y: 137 },
      ],
    },
    // 10 -> 7: Corregir defectos retorna a Ejecutar pruebas (Regresión)
    {
      id: 'flow-10-7-loop',
      from: 'task-corregir-defectos',
      to: 'task-ejecutar-pruebas',
      label: 'Hotfix para re-test',
      labelX: 960,
      labelY: 185,
      points: [
        { x: 1060, y: 105 },
        { x: 845, y: 105 },
        { x: 845, y: 310 },
      ],
    },
    // 9 -> 11 (NO): Gateway Defectos a Consolidar informe
    {
      id: 'flow-9-11-no',
      from: 'gateway-defectos',
      to: 'task-consolidar-informe',
      label: 'No',
      labelX: 1160,
      labelY: 332,
      points: [
        { x: 1149, y: 342 },
        { x: 1205, y: 342 },
      ],
    },
    // 11 -> 12: Consolidar informe (QA) a Evaluar criterios (PO) - Cruce a carril inferior
    {
      id: 'flow-11-12',
      from: 'task-consolidar-informe',
      to: 'task-evaluar-criterios-po',
      points: [
        { x: 1267, y: 374 },
        { x: 1267, y: 540 },
      ],
    },
    // 12 -> 13: Evaluar criterios a Gateway PO
    {
      id: 'flow-12-13',
      from: 'task-evaluar-criterios-po',
      to: 'gateway-aprobacion-po',
      points: [
        { x: 1330, y: 572 },
        { x: 1375, y: 572 },
      ],
    },
    // 13 -> 10 (NO): Rechazo de PO vuelve a Desarrollo para corrección
    {
      id: 'flow-13-10-no',
      from: 'gateway-aprobacion-po',
      to: 'task-corregir-defectos',
      label: 'No',
      labelX: 1405,
      labelY: 480,
      points: [
        { x: 1397, y: 550 },
        { x: 1397, y: 45 },
        { x: 1125, y: 45 },
        { x: 1125, y: 73 },
      ],
    },
    // 13 -> 14 (SI): Gateway PO a Emitir signoff
    {
      id: 'flow-13-14-si',
      from: 'gateway-aprobacion-po',
      to: 'task-emitir-signoff',
      label: 'Si',
      labelX: 1425,
      labelY: 562,
      points: [
        { x: 1419, y: 572 },
        { x: 1460, y: 572 },
      ],
    },
    // 14 -> 15: Emitir signoff a Fin
    {
      id: 'flow-14-15',
      from: 'task-emitir-signoff',
      to: 'end-event',
      points: [
        { x: 1570, y: 572 },
        { x: 1575, y: 572 },
      ],
    },
  ],
};

// Generador de archivo XML BPMN 2.0.2 compatible con Camunda, bpmn.io, Bizagi
export function generateBpmnXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                  id="Definitions_AITECH_QA"
                  targetNamespace="http://bpmn.io/schema/bpmn"
                  exporter="AITECH BPMN Modeler"
                  exporterVersion="2.0">
  <bpmn:collaboration id="Collaboration_AITECH">
    <bpmn:participant id="Participant_AITECH_QA" name="AITECH — Evaluación y Aprobación de Software" processRef="Process_QA" />
  </bpmn:collaboration>
  
  <bpmn:process id="Process_QA" isExecutable="true">
    <bpmn:laneSet id="LaneSet_QA">
      <bpmn:lane id="Lane_Dev" name="Equipo de Desarrollo">
        <bpmn:flowNodeRef>start-event</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>task-preparar-build</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>task-entregar-build</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>task-corregir-defectos</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_QA" name="Departamento de Calidad (QA)">
        <bpmn:flowNodeRef>task-verificar-requisitos</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>gateway-requisitos</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>task-disenar-pruebas</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>task-ejecutar-pruebas</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>task-verificar-seguridad</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>gateway-defectos</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>task-consolidar-informe</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_PO" name="Product Owner (Ing. Cárdenas)">
        <bpmn:flowNodeRef>task-evaluar-criterios-po</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>gateway-aprobacion-po</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>task-emitir-signoff</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>end-event</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    
    <!-- Elementos del Flujo -->
    <bpmn:startEvent id="start-event" name="Versión candidata disponible">
      <bpmn:outgoing>flow-1-2</bpmn:outgoing>
    </bpmn:startEvent>
    
    <bpmn:serviceTask id="task-preparar-build" name="Preparar versión candidata">
      <bpmn:incoming>flow-1-2</bpmn:incoming>
      <bpmn:incoming>flow-5-2-no</bpmn:incoming>
      <bpmn:outgoing>flow-2-3</bpmn:outgoing>
    </bpmn:serviceTask>
    
    <bpmn:sendTask id="task-entregar-build" name="Entregar build y documentación">
      <bpmn:incoming>flow-2-3</bpmn:incoming>
      <bpmn:outgoing>flow-3-4</bpmn:outgoing>
    </bpmn:sendTask>
    
    <bpmn:userTask id="task-verificar-requisitos" name="Verificar requisitos y entregables">
      <bpmn:incoming>flow-3-4</bpmn:incoming>
      <bpmn:outgoing>flow-4-5</bpmn:outgoing>
    </bpmn:userTask>
    
    <bpmn:exclusiveGateway id="gateway-requisitos" name="¿Requisitos completos?">
      <bpmn:incoming>flow-4-5</bpmn:incoming>
      <bpmn:outgoing>flow-5-6-si</bpmn:outgoing>
      <bpmn:outgoing>flow-5-2-no</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    
    <bpmn:manualTask id="task-disenar-pruebas" name="Diseñar plan y casos de prueba">
      <bpmn:incoming>flow-5-6-si</bpmn:incoming>
      <bpmn:outgoing>flow-6-7</bpmn:outgoing>
    </bpmn:manualTask>
    
    <bpmn:serviceTask id="task-ejecutar-pruebas" name="Ejecutar pruebas funcionales y carga">
      <bpmn:incoming>flow-6-7</bpmn:incoming>
      <bpmn:incoming>flow-10-7-loop</bpmn:incoming>
      <bpmn:outgoing>flow-7-8</bpmn:outgoing>
    </bpmn:serviceTask>
    
    <bpmn:serviceTask id="task-verificar-seguridad" name="Verificar seguridad (OWASP ASVS)">
      <bpmn:incoming>flow-7-8</bpmn:incoming>
      <bpmn:outgoing>flow-8-9</bpmn:outgoing>
    </bpmn:serviceTask>
    
    <bpmn:exclusiveGateway id="gateway-defectos" name="¿Defectos críticos?">
      <bpmn:incoming>flow-8-9</bpmn:incoming>
      <bpmn:outgoing>flow-9-10-si</bpmn:outgoing>
      <bpmn:outgoing>flow-9-11-no</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    
    <bpmn:userTask id="task-corregir-defectos" name="Corregir defectos y generar hotfix">
      <bpmn:incoming>flow-9-10-si</bpmn:incoming>
      <bpmn:incoming>flow-13-10-no</bpmn:incoming>
      <bpmn:outgoing>flow-10-7-loop</bpmn:outgoing>
    </bpmn:userTask>
    
    <bpmn:sendTask id="task-consolidar-informe" name="Consolidar informe de calidad">
      <bpmn:incoming>flow-9-11-no</bpmn:incoming>
      <bpmn:outgoing>flow-11-12</bpmn:outgoing>
    </bpmn:sendTask>
    
    <bpmn:userTask id="task-evaluar-criterios-po" name="Evaluar criterios de negocio (PO)">
      <bpmn:incoming>flow-11-12</bpmn:incoming>
      <bpmn:outgoing>flow-12-13</bpmn:outgoing>
    </bpmn:userTask>
    
    <bpmn:exclusiveGateway id="gateway-aprobacion-po" name="¿Aprobado para liberación?">
      <bpmn:incoming>flow-12-13</bpmn:incoming>
      <bpmn:outgoing>flow-13-14-si</bpmn:outgoing>
      <bpmn:outgoing>flow-13-10-no</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    
    <bpmn:sendTask id="task-emitir-signoff" name="Emitir QA Sign-off y autorizar">
      <bpmn:incoming>flow-13-14-si</bpmn:incoming>
      <bpmn:outgoing>flow-14-15</bpmn:outgoing>
    </bpmn:sendTask>
    
    <bpmn:endEvent id="end-event" name="Versión liberada a producción">
      <bpmn:incoming>flow-14-15</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
</bpmn:definitions>`;
}
