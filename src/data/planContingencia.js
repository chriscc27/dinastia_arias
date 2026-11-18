export const contingencySources = {
  municipio: {
    label: 'GAMLP · Mantenimiento de cuencas y prevención',
    url: 'https://lapaz.bo/alcaldia-refuerza-el-mantenimiento-de-cuencas-con-trabajo-ininterrumpido-24-7-y-pide-tranquilidad-a-la-poblacion/',
    detail: 'Contexto municipal sobre precipitaciones, cuencas y deslizamientos; acceso a la Red de Emergencia 114.',
  },
  senamhi: {
    label: 'SENAMHI · Meteorología e hidrología',
    url: 'https://senamhi.gob.bo/',
    detail: 'Consulta los avisos oficiales y comprueba su fecha, vigencia y área geográfica antes de tomar decisiones.',
  },
  csirt: {
    label: 'AGETIC / CGII · CSIRT de Bolivia',
    url: 'https://www.cgii.gob.bo/about',
    detail: 'Equipo nacional de respuesta a incidentes informáticos con sede en La Paz y canales de coordinación.',
  },
  nist: {
    label: 'NIST SP 800-34 Rev. 1 · Guía de contingencia',
    url: 'https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final',
    detail: 'Referencia técnica para análisis de impacto, estrategias de recuperación, pruebas y mantenimiento del plan.',
  },
};

// Propuesta educativa: los controles y objetivos deben validarse para cada sede.
export const localScenarios = [
  {
    id: 'lluvias', title: 'Lluvias, inundación y deslizamientos', tag: 'ENTORNO FÍSICO', source: 'municipio',
    impact: 'El daño al edificio o la restricción de acceso pueden dejar fuera de servicio al centro de cómputo y sus enlaces.',
    before: 'Evaluar la ubicación de la sede con personal competente, revisar filtraciones y drenajes, y mantener una copia externa en una ubicación que no comparta el mismo riesgo.',
    during: 'Priorizar a las personas, seguir la evacuación indicada por las autoridades y coordinar con la Red 114 cuando corresponda. Activar servicios alternos desde un lugar seguro.',
    after: 'Retomar el acceso solo con autorización de los responsables de seguridad; revisar infraestructura y restaurar los servicios por prioridad.',
  },
  {
    id: 'energia', title: 'Interrupción de energía', tag: 'INFRAESTRUCTURA',
    impact: 'Un corte puede detener servidores, equipos de red y aplicaciones, incluso si los datos permanecen disponibles en la nube.',
    before: 'Dimensionar UPS para la carga real, medir su autonomía y documentar el apagado ordenado. Validar el respaldo eléctrico con personal técnico.',
    during: 'Registrar la hora del corte, comprobar autonomía y ejecutar el apagado seguro antes de agotar las baterías. Coordinar con el proveedor eléctrico.',
    after: 'Comprobar la estabilidad del suministro con el responsable técnico y encender primero red y almacenamiento, después aplicaciones.',
  },
  {
    id: 'conectividad', title: 'Pérdida de internet o enlaces', tag: 'COMUNICACIONES',
    impact: 'La sede puede perder acceso a sistemas cloud, repositorios, canales de soporte y herramientas de coordinación.',
    before: 'Probar un enlace alternativo con independencia real del principal, configurar acceso remoto seguro y conservar procedimientos fuera de línea.',
    during: 'Confirmar el alcance del fallo, abrir un caso con el proveedor, activar el enlace alternativo y priorizar el tráfico de servicios críticos.',
    after: 'Verificar latencia, acceso y sincronización de registros antes de devolver el tráfico al enlace principal.',
  },
  {
    id: 'ciberincidente', title: 'Ransomware o acceso no autorizado', tag: 'SEGURIDAD DIGITAL', source: 'csirt',
    impact: 'El cifrado, la alteración o la exposición de información pueden impedir auditorías y comprometer las evidencias de calidad.',
    before: 'Mantener copias aisladas o inmutables, autenticación multifactor, actualizaciones y permisos mínimos; ensayar una restauración.',
    during: 'Aislar los sistemas afectados de la red, avisar al responsable de seguridad y preservar registros. Coordinar la respuesta y el reporte con el CSIRT cuando corresponda.',
    after: 'Validar la contención y el origen del incidente antes de restaurar en un entorno limpio; revisar credenciales y comprobar integridad.',
  },
  {
    id: 'acceso', title: 'Dificultad de acceso a la sede', tag: 'PERSONAS Y LOGÍSTICA',
    impact: 'Una restricción de movilidad o una vía interrumpida puede impedir la llegada del personal y de repuestos.',
    before: 'Designar suplentes, acordar trabajo remoto seguro y prever repuestos esenciales y una sede alternativa accesible.',
    during: 'Confirmar la disponibilidad del equipo, reasignar funciones y sostener la atención remota sin exigir desplazamientos inseguros.',
    after: 'Reponer recursos utilizados, conciliar el trabajo pendiente y documentar los tiempos de atención.',
  },
];

export const recoveryExamples = [
  { service: 'Monitoreo de infraestructura', impact: 'Disminuye la visibilidad sobre fallos y disponibilidad.', rto: '1 hora', rpo: '15 minutos', alternative: 'Verificación manual documentada y notificación por canal alternativo.' },
  { service: 'Registro de incidencias', impact: 'Se pierde trazabilidad de fallos y decisiones.', rto: '2 horas', rpo: '30 minutos', alternative: 'Formulario fuera de línea con identificadores únicos y conciliación posterior.' },
  { service: 'Gestión documental de calidad', impact: 'Sin acceso a procedimientos y evidencias de auditoría.', rto: '4 horas', rpo: '1 hora', alternative: 'Repositorio alterno de solo lectura y registro manual controlado.' },
  { service: 'Reportes y analítica', impact: 'Se retrasa el análisis de indicadores y la toma de decisiones.', rto: '24 horas', rpo: '24 horas', alternative: 'Última captura validada, identificada con fecha de corte.' },
];

export const recoveryRunbooks = [
  {
    id: 'energia', label: 'Corte eléctrico', title: 'Restablecer la infraestructura con seguridad',
    owner: 'Infraestructura TIC + mantenimiento',
    lead: 'La autonomía de la UPS determina cuánto tiempo puede sostenerse la operación y cuándo iniciar el apagado ordenado.',
    actions: [
      'Registrar el inicio del corte, revisar el estado de la UPS y coordinar el diagnóstico con el proveedor eléctrico.',
      'Activar la operación alternativa o el apagado controlado antes de agotar la autonomía medida.',
      'Esperar la validación del suministro por el personal técnico; recuperar red, almacenamiento y servicios de identidad antes de las aplicaciones.',
      'Abrir los servicios de forma gradual y observar alarmas, carga y errores durante el periodo definido por el equipo TIC.',
    ],
    checks: ['Suministro y UPS verificados por el responsable técnico.', 'Arranque sin errores y datos consistentes.', 'Una operación crítica completada por el área usuaria.'],
    evidence: 'Hora del corte y del retorno, autonomía utilizada, secuencia de encendido y resultado de las comprobaciones.',
  },
  {
    id: 'conexion', label: 'Fallo de conexión', title: 'Recuperar el acceso a los servicios',
    owner: 'Redes + proveedor de conectividad',
    lead: 'El enlace alternativo debe permitir acceder a las aplicaciones prioritarias con los controles de seguridad habituales.',
    actions: [
      'Determinar si falla la red interna, el acceso a internet o un servicio externo y registrar el caso con el proveedor correspondiente.',
      'Conmutar al enlace alternativo probado y limitar el tráfico que pueda desplazar a los servicios críticos.',
      'Verificar resolución de nombres, autenticación y acceso seguro desde los puestos que mantienen la operación.',
      'Retornar al enlace principal cuando se confirme su estabilidad y conciliar los registros generados fuera de línea.',
    ],
    checks: ['Acceso a sistemas críticos desde los puestos afectados.', 'Capacidad suficiente para las operaciones prioritarias.', 'Registros sincronizados sin duplicados.'],
    evidence: 'Número de caso, enlace utilizado, tiempos de conmutación, pruebas de acceso y conciliación.',
  },
  {
    id: 'datos', label: 'Pérdida de datos', title: 'Restaurar una copia y comprobar su integridad',
    owner: 'Sistemas + seguridad + responsable de los datos',
    lead: 'Si existe sospecha de un ataque, la contención y la preservación de evidencias preceden a la restauración.',
    actions: [
      'Delimitar los sistemas afectados, preservar registros y contener el incidente con el equipo de seguridad.',
      'Seleccionar una copia anterior al incidente, revisar su integridad y comprobar que su fecha cumple el RPO acordado.',
      'Preparar un entorno limpio y aislado; restaurar datos, configuración y dependencias conforme al procedimiento del sistema.',
      'Validar accesos, cantidades de registros y operaciones críticas antes de reconectar y habilitar el servicio.',
    ],
    checks: ['Contención verificada y copia apta para restauración.', 'Datos y aplicaciones validados por sus responsables.', 'RPO y tiempo real de recuperación registrados.'],
    evidence: 'Identificador y fecha de la copia, registros de restauración, pruebas de integridad y aprobación del área usuaria.',
  },
  {
    id: 'sede', label: 'Sede inaccesible', title: 'Continuar desde una ubicación alternativa',
    owner: 'Coordinación de contingencia + equipo TIC',
    lead: 'Para una sede de La Paz, la ubicación alternativa debe evaluarse frente a los riesgos físicos y de acceso de la sede principal.',
    actions: [
      'Confirmar la seguridad y disponibilidad del personal; seguir las indicaciones de las autoridades y activar suplencias.',
      'Habilitar la sede alternativa o el trabajo remoto con equipos autorizados, autenticación multifactor y acceso seguro.',
      'Restablecer primero los procesos prioritarios y comunicar a los usuarios los canales y horarios de atención.',
      'Planificar el retorno cuando se autorice el acceso; conciliar el trabajo realizado y verificar la infraestructura antes de migrar.',
    ],
    checks: ['Personal localizado y responsabilidades cubiertas.', 'Acceso seguro y capacidad de atención comprobados.', 'Retorno autorizado y registros conciliados.'],
    evidence: 'Decisión de traslado, responsables disponibles, servicios habilitados y acta de retorno.',
  },
];

export const responseSteps = [
  { title: 'Detectar y registrar', text: 'Anotar fecha y hora de La Paz, síntoma, sede, sistemas afectados y quién reporta. Conservar evidencias y abrir una bitácora única.' },
  { title: 'Evaluar y activar', text: 'El coordinador evalúa la seguridad de las personas, el impacto y la duración estimada. Activa el plan si un servicio crítico puede exceder su tiempo tolerable de interrupción; registra la decisión y avisa al comité.' },
  { title: 'Contener y comunicar', text: 'Ejecutar el procedimiento específico, asignar responsables y comunicar alcance, alternativa disponible y hora de la próxima actualización. Usar un canal independiente del sistema afectado.' },
  { title: 'Recuperar por dependencias', text: 'Verificar entorno seguro, energía, red, identidad y almacenamiento antes de levantar aplicaciones. Restaurar desde una copia comprobada y registrar el punto de recuperación.' },
  { title: 'Validar y reanudar', text: 'El área usuaria comprueba accesos, integridad de datos y una operación completa. Conciliar registros manuales, documentar pendientes y obtener autorización del responsable para volver al servicio habitual.' },
  { title: 'Aprender y actualizar', text: 'Comparar los tiempos reales con RTO y RPO, registrar causas y mejoras, asignar responsables y fechas, y actualizar la versión del plan.' },
];

export const contingencyRoles = [
  ['Dirección / Gerencia de Calidad', 'Autoriza recursos, prioriza servicios y aprueba la reanudación.'],
  ['Coordinación de contingencia', 'Activa el plan, organiza la respuesta y mantiene la bitácora.'],
  ['Equipo TIC y seguridad', 'Contiene el incidente, recupera infraestructura y valida respaldos.'],
  ['Auditores y usuarios clave', 'Sostienen la operación alternativa y verifican las evidencias recuperadas.'],
  ['Comunicaciones y proveedores', 'Difunden actualizaciones, registran casos de soporte y coordinan compromisos.'],
];
