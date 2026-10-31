// Contenido de la página /tableau: teoría, citas, dashboards construidos en Tableau, guía y referencias.

export const tableauData = {
  hero: {
    badge: 'ANÁLISIS VISUAL DE DATOS',
    title: 'Datos en Tableau:',
    highlight: 'el estado real de nuestras herramientas de calidad.',
    subtitle:
      'Tableau convierte las 1.200 instancias de herramientas de QA de AITECH en un tablero que responde en segundos qué está conforme, qué está vencido y qué pone en riesgo al software médico que liberamos.',
    chips: ['VizQL', 'Tableau Public', 'Dashboards', 'ISO/IEC 25010', 'Few (2013)'],
  },
  quotes: [
    {
      text: 'El propósito de la visualización es la comprensión (insight), no las imágenes.',
      author: 'Ben Shneiderman',
      role: 'En Card, Mackinlay y Shneiderman, Readings in Information Visualization (1999)',
    },
    {
      text: 'Por encima de todo, muestra los datos.',
      author: 'Edward R. Tufte',
      role: 'The Visual Display of Quantitative Information (1983/2001)',
    },
  ],
  theory: [
    {
      heading: '¿Qué es Tableau?',
      content:
        'Plataforma de análisis visual que traduce acciones de arrastrar y soltar en consultas a la base de datos. Su motor, VizQL, nace del proyecto Polaris de Stanford (Stolte, Tang y Hanrahan, 2002): la vista se especifica con campos y el sistema genera la consulta y el gráfico.',
    },
    {
      heading: 'Dimensiones y medidas',
      content:
        'Las dimensiones son campos cualitativos que segmentan (criticidad, estado, herramienta); las medidas son cuantitativas y se agregan (conteo de herramientas, tasa de conformidad). Azul = discreto, verde = continuo: esa distinción decide si Tableau dibuja encabezados o ejes.',
    },
    {
      heading: 'Campos calculados y LOD',
      content:
        'Un campo calculado es una fórmula sobre la fuente (por ejemplo, la tasa de no conformidad). Las expresiones LOD ({FIXED …}) calculan a un nivel de detalle distinto al de la vista, lo que permite comparar cada herramienta contra el promedio del área.',
    },
    {
      heading: 'Hojas, dashboards e historias',
      content:
        'Cada hoja responde una pregunta; un dashboard reúne varias hojas con filtros y acciones compartidas para leerlas juntas; una historia las ordena como argumento. Few (2013) define el dashboard como la información más importante, consolidada en una sola pantalla para monitorearla de un vistazo.',
    },
    {
      heading: 'Ediciones y conexión',
      content:
        'Tableau Public es gratuito y publica en la nube pública (nunca con datos sensibles de pacientes). Tableau Desktop/Cloud trabajan con extractos programados o conexiones en vivo. En el presupuesto del área se contempla Tableau Cloud (1 Creator + 2 Viewer) para los tableros internos.',
    },
    {
      heading: 'Por qué le sirve a Calidad',
      content:
        'ISO 9001 (§9.1) exige seguimiento, medición, análisis y evaluación. Un tablero traduce el inventario de herramientas en indicadores verificables para la Jefatura de Calidad y para auditorías ISO 13485: quién revisó qué, cuándo y con qué resultado.',
    },
  ],
  // Campos del CSV preparado (public/data/dataset_calidad.csv) y su uso en el libro de trabajo
  fields: [
    { campo: 'herramienta_base', rol: 'Dimensión', uso: 'Eje de la tasa de no conformidad por herramienta (15 productos).' },
    { campo: 'criticidad', rol: 'Dimensión', uso: 'Filas del mapa de calor y filtro global.' },
    { campo: 'estado_gestion', rol: 'Dimensión', uso: 'Columnas del mapa de calor (En uso, En revisión, Suspendido, Retirado).' },
    { campo: 'resultado_revision', rol: 'Dimensión', uso: 'Color (Conforme / Con observaciones / No conforme / Sin revisión).' },
    { campo: 'trimestre_revision', rol: 'Dimensión', uso: 'Eje temporal de las revisiones realizadas.' },
    { campo: 'revision_vigente', rol: 'Dimensión', uso: 'Revisión hecha en los últimos 365 días respecto a la fecha de corte.' },
    { campo: 'categoria_esperada', rol: 'Dimensión', uso: 'Categoría correcta según la naturaleza de la herramienta (control de calidad del dato).' },
    { campo: 'dias_desde_revision', rol: 'Medida', uso: 'Antigüedad de la última revisión (promedio, máximo).' },
    { campo: 'id_herramienta', rol: 'Medida (conteo)', uso: 'CNTD([Id Herramienta]) = número de herramientas.' },
  ],
  // Fórmulas tal como están en el libro AITECH_Calidad_Dashboards.twbx
  calculatedFields: [
    {
      nombre: 'Tasa de conformidad',
      formula: "SUM([Es conforme]) / SUM([Es revisada])\n\n// Es conforme = IIF([resultado_revision] = 'Conforme', 1, 0)\n// Es revisada = IIF([revisada] = 'Sí', 1, 0)",
      nota: 'Sobre las herramientas revisadas: 68,3 % en el dataset.',
    },
    {
      nombre: '% sin revisión vigente',
      formula: "SUM(IIF([revision_vigente] = 'No', 1, 0))\n/ COUNT([id_herramienta])",
      nota: 'Incluye las nunca revisadas: 76,8 % del inventario.',
    },
    {
      nombre: 'Riesgo crítico',
      formula: "[estado_gestion] = 'En uso'\nAND [resultado_revision] = 'No conforme'\nAND [criticidad] = 'Crítica'",
      nota: 'Booleano que filtra la tabla de acción inmediata (23 instancias).',
    },
    {
      nombre: 'Tasa NC y promedio del área (LOD)',
      formula: "Tasa NC = SUM([Es no conforme]) / SUM([Es revisada])\nPromedio = { FIXED : SUM([Es no conforme]) / SUM([Es revisada]) }\nPosición = IIF([Tasa NC] > MIN([Promedio]),\n  'Sobre el promedio', 'En o bajo el promedio')",
      nota: 'La expresión FIXED calcula el 9,3 % del área completa; cada barra se colorea según quede sobre o bajo ese valor.',
    },
    {
      nombre: '% categoría correcta',
      formula: "SUM(IIF([categoria_consistente] = 'Sí', 1, 0))\n/ COUNT([id_herramienta])",
      nota: 'Compara la categoría registrada con la que corresponde a la herramienta.',
    },
  ],
  // Dashboards construidos en Tableau Public 2025.1 con el dataset (capturas en public/assets/tableau/)
  dashboards: [
    {
      imagen: 'dashboard-1-resumen.png',
      titulo: 'Resumen ejecutivo de conformidad',
      pregunta: '¿En qué estado está el inventario de herramientas de QA?',
      construccion: 'Cinco indicadores (BAN) con marcas de texto: conteo de herramientas, «Tasa de conformidad», «% sin revisión vigente», críticas en uso No conformes y críticas nunca revisadas. Debajo, barras de resultado_revision ordenadas de mayor a menor y coloreadas por estado.',
      lectura: 'De 1.200 herramientas, 669 están conformes, 219 con observaciones, 91 no conformes y 221 nunca se revisaron. La conformidad es 68,3 %, bajo la meta del 75 %, y el 76,8 % del inventario no tiene una revisión en los últimos 12 meses. Hay 23 herramientas críticas en uso No conformes y 60 críticas sin ninguna revisión.',
      decision: 'Calendario obligatorio de revisión anual, empezando por las 60 herramientas críticas que nunca se revisaron.',
    },
    {
      imagen: 'dashboard-2-no-conformidad.png',
      titulo: 'No conformidad por herramienta y responsable',
      pregunta: '¿Qué herramientas y qué roles concentran las revisiones No conformes?',
      construccion: 'Barras ordenadas con el campo «Tasa NC». El color sale de una expresión LOD (FIXED) que calcula el promedio del área (9,3 %): rojo sobre el promedio, gris en o bajo él. Abajo, la misma tasa por rol responsable.',
      lectura: 'Jira lidera con 22,0 %, más del doble del promedio, seguido de Locust (14,3 %), Postman (13,8 %), Selenium Grid (12,0 %), Snyk (11,8 %) y Tosca (10,5 %); k6 apenas registra 1,4 %. Por rol, Performance Eng (13,9 %) y QA Lead (11,5 %) superan el promedio, y Test Automation Eng tiene la tasa más baja (6,0 %).',
      decision: 'Auditoría focalizada en las seis herramientas en rojo; es la misma lista que encontró el árbol J48 en Weka.',
    },
    {
      imagen: 'dashboard-3-vigencia.png',
      titulo: 'Vigencia de revisiones según criticidad y estado',
      pregunta: '¿El atraso se concentra en algún tipo de herramienta?',
      construccion: 'Mapa de calor con criticidad (de Crítica a Baja) en filas, estado de gestión en columnas y color según «% sin revisión vigente». Debajo, barras apiladas por criticidad con revisión vigente (verde) y vencida o inexistente (rojo).',
      lectura: 'Casi todas las celdas están entre 67 % y 88 %: el atraso es general, no de un grupo. Entre las críticas en uso, el 74,8 % no tiene revisión vigente. En números absolutos, de 314 herramientas críticas solo 80 están al día, y de 505 de criticidad alta, solo 112. La única celda baja es Baja/Retirado (33,3 %).',
      decision: 'No basta con corregir un equipo: hay que cambiar el proceso de revisión (lo confirma Apriori con lift ≈ 1).',
    },
    {
      imagen: 'dashboard-4-tendencia.png',
      titulo: 'Evolución trimestral de las revisiones',
      pregunta: '¿Se está revisando al ritmo necesario y con mejor resultado?',
      construccion: 'Barras apiladas por trimestre de revisión, coloreadas por resultado y sin las herramientas nunca revisadas (filtro). Debajo, una línea con la «Tasa de conformidad» de cada trimestre.',
      lectura: 'El ritmo llegó a 104 revisiones en 2023-T4 y 102 en 2025-T2, pero cae a 77 en 2025-T4 y a 40 en 2026-T1; con 1.200 herramientas y revisión anual harían falta unas 300 por trimestre. La conformidad arrancó en 50 % (2023-T1); desde 2023-T3 oscila entre 62,7 % y 74,5 % y nunca alcanza la meta del 75 %.',
      decision: 'Dimensionar al equipo (presupuesto) y usar la bolsa de testers externos para recuperar el ritmo de revisión.',
    },
    {
      imagen: 'dashboard-5-riesgo.png',
      titulo: 'Riesgo crítico y calidad del dato',
      pregunta: '¿Qué hay que atender hoy y cuán confiable es el inventario?',
      construccion: 'Tabla filtrada con el booleano «Riesgo crítico» (instancia, responsable, fecha de la última revisión y días transcurridos). Al lado, barras de «% categoría correcta» por categoría registrada.',
      lectura: '23 herramientas críticas siguen en uso pese a quedar No conformes, algunas desde hace más de 900 días (SonarQube: 1.121 días); son las que disparan la alerta de severidad Desastre en Zabbix. Además, la mejor categoría solo tiene el 36,4 % de sus registros correctos (Automatización de Pruebas) y la peor, el 21,2 % (Análisis de Código).',
      decision: 'Suspender o remediar las 23 herramientas y depurar el catálogo maestro de categorías.',
    },
  ],
  steps: [
    { paso: '01', titulo: 'Conectar y extraer', detalle: 'Tableau Public → Archivo de texto → dataset_calidad.csv. Tableau Public trabaja con extracciones (.hyper); el libro descargable ya la incluye.' },
    { paso: '02', titulo: 'Campos calculados', detalle: 'Las fórmulas de abajo: tasas, vigencia, riesgo crítico y la expresión LOD del promedio del área. Es la misma lógica que usa la QA Hub API para Zabbix.' },
    { paso: '03', titulo: '14 hojas', detalle: '5 indicadores BAN, barras de resultado, tasa NC por herramienta y por rol, mapa de calor, vigencia por criticidad, tendencia trimestral, línea de conformidad, tabla de riesgo y calidad del dato.' },
    { paso: '04', titulo: '5 dashboards', detalle: 'Tamaño fijo de 1320 × 700 px, cada uno con un título que responde una pregunta de la Jefatura de Calidad.' },
    { paso: '05', titulo: 'Capturas', detalle: 'Tableau Public no exporta imágenes, así que cada dashboard se capturó en modo presentación (F7) y se guardó en public/assets/tableau/.' },
  ],
  references: [
    { apa: 'Stolte, C., Tang, D., & Hanrahan, P. (2002). Polaris: A system for query, analysis, and visualization of multidimensional relational databases. IEEE Transactions on Visualization and Computer Graphics, 8(1), 52–65.', url: 'https://doi.org/10.1109/2945.981851', tipo: 'Artículo científico' },
    { apa: 'Hanrahan, P. (2006). VizQL: A language for query, analysis and visualization. Proceedings of the 2006 ACM SIGMOD International Conference on Management of Data, 721.', url: 'https://doi.org/10.1145/1142473.1142560', tipo: 'Artículo científico' },
    { apa: 'Few, S. (2013). Information dashboard design: Displaying data for at-a-glance monitoring (2.ª ed.). Analytics Press.', url: 'https://www.perceptualedge.com/library.php', tipo: 'Libro' },
    { apa: 'Tufte, E. R. (2001). The visual display of quantitative information (2.ª ed.). Graphics Press.', url: 'https://www.edwardtufte.com/book/the-visual-display-of-quantitative-information/', tipo: 'Libro' },
    { apa: 'Card, S. K., Mackinlay, J. D., & Shneiderman, B. (1999). Readings in information visualization: Using vision to think. Morgan Kaufmann.', url: 'https://dl.acm.org/doi/book/10.5555/300679', tipo: 'Libro' },
    { apa: 'Tableau Software. (2026). Exportar vistas de Tableau Desktop a otra aplicación. Ayuda de Tableau.', url: 'https://help.tableau.com/current/pro/desktop/es-es/save_export_image.htm', tipo: 'Documentación oficial' },
    { apa: 'Tableau Software. (2026). Expresiones de nivel de detalle (LOD). Ayuda de Tableau.', url: 'https://help.tableau.com/current/pro/desktop/es-es/calculations_calculatedfields_lod.htm', tipo: 'Documentación oficial' },
    { apa: 'International Organization for Standardization. (2015). ISO 9001:2015 Sistemas de gestión de la calidad — Requisitos (§9.1 Seguimiento, medición, análisis y evaluación).', url: 'https://www.iso.org/standard/62085.html', tipo: 'Norma' },
  ],
};
