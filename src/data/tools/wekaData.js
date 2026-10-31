// Contenido de la página /weka: teoría de minería de datos, lectura de los experimentos y referencias.

export const wekaData = {
  hero: {
    badge: 'MINERÍA DE DATOS & APRENDIZAJE AUTOMÁTICO',
    title: 'Patrones con Weka:',
    highlight: 'lo que el dataset dice (y lo que no) sobre nuestras revisiones.',
    subtitle:
      'Ejecutamos Weka 3.8.6 sobre el inventario de herramientas del Área de Calidad: clasificación, ranking de atributos, agrupamiento y reglas de asociación. Los resultados de esta página salen del servidor QA Hub, no de capturas de pantalla.',
    chips: ['Weka 3.8.6', 'J48 / C4.5', 'SimpleKMeans', 'Apriori', 'KDD (Fayyad, 1996)'],
  },
  quotes: [
    {
      text: 'La minería de datos se define como el proceso de descubrir patrones en los datos. El proceso debe ser automático o, más habitualmente, semiautomático, y los patrones deben ser significativos: deben conducir a alguna ventaja.',
      author: 'Ian H. Witten, Eibe Frank, Mark A. Hall y Christopher J. Pal',
      role: 'Data Mining: Practical Machine Learning Tools and Techniques (2017), cap. 1',
    },
    {
      text: 'Nos estamos ahogando en información, pero tenemos hambre de conocimiento.',
      author: 'John Naisbitt',
      role: 'Megatrends (1982)',
    },
  ],
  theory: [
    {
      heading: '¿Qué es Weka?',
      content:
        'Waikato Environment for Knowledge Analysis: banco de trabajo de aprendizaje automático en Java, de código abierto (GPL), desarrollado en la Universidad de Waikato (Nueva Zelanda) desde 1993. Reúne cientos de algoritmos de preprocesamiento, clasificación, regresión, agrupamiento, asociación y selección de atributos (Hall et al., 2009).',
    },
    {
      heading: 'El proceso KDD',
      content:
        'Fayyad, Piatetsky-Shapiro y Smyth (1996) describen el descubrimiento de conocimiento como selección → preprocesamiento → transformación → minería → interpretación. Weka cubre las cinco etapas; nuestro ETL (prepare_dataset.py) hace las tres primeras y genera el archivo ARFF.',
    },
    {
      heading: 'Interfaces de Weka',
      content:
        'Explorer (análisis interactivo por pestañas: Preprocess, Classify, Cluster, Associate, Select attributes), Experimenter (comparar algoritmos con pruebas estadísticas), KnowledgeFlow (flujos visuales) y la línea de comandos (CLI), que es la que usa el servidor QA Hub para correr los experimentos bajo demanda.',
    },
    {
      heading: 'Formato ARFF',
      content:
        'Attribute-Relation File Format: encabezado con @relation y un @attribute por columna (nominal {A,B,C} o numeric) y una sección @data. La clase a predecir va al final por convención; los valores faltantes se escriben con «?».',
    },
    {
      heading: 'Cómo se evalúa un modelo',
      content:
        'Validación cruzada de 10 pliegues: se entrena con 9/10 y se prueba con 1/10, diez veces. La exactitud sola engaña cuando una clase domina; por eso se compara contra ZeroR (predecir siempre la clase mayoritaria) y se reporta Kappa de Cohen (1960): 0 = no mejor que el azar, 1 = acuerdo perfecto.',
    },
    {
      heading: 'Por qué le sirve a Calidad',
      content:
        'Las auditorías miran registros uno por uno; la minería de datos mira los 1.200 a la vez. Permite priorizar dónde auditar (qué herramientas fallan más), detectar perfiles de riesgo y, sobre todo, comprobar con evidencia si un supuesto («el problema son las herramientas críticas») es cierto o no.',
    },
  ],
  algoritmos: [
    { tarea: 'Clasificación', algoritmo: 'J48 (C4.5)', autor: 'Quinlan (1993)', idea: 'Árbol de decisión que elige en cada nodo el atributo con mayor razón de ganancia de información.' },
    { tarea: 'Clasificación', algoritmo: 'Naive Bayes', autor: 'John y Langley (1995)', idea: 'Probabilidades condicionales asumiendo independencia entre atributos.' },
    { tarea: 'Línea base', algoritmo: 'ZeroR', autor: 'Weka', idea: 'Predice siempre la clase más frecuente; cualquier modelo útil debe superarlo.' },
    { tarea: 'Selección de atributos', algoritmo: 'InfoGainAttributeEval', autor: 'Shannon / Quinlan', idea: 'Cuánta incertidumbre sobre la clase elimina conocer cada atributo.' },
    { tarea: 'Agrupamiento', algoritmo: 'SimpleKMeans', autor: 'MacQueen (1967)', idea: 'Reparte las instancias en k grupos minimizando la distancia a su centroide.' },
    { tarea: 'Asociación', algoritmo: 'Apriori', autor: 'Agrawal y Srikant (1994)', idea: 'Reglas «si A entonces B» con soporte, confianza y lift.' },
  ],
  // Lectura de gestión de cada experimento (las cifras se muestran desde el resultado real de Weka)
  lecturas: {
    'clasificacion-j48':
      'J48 y Naive Bayes empatan con ZeroR y su Kappa es ≈ 0: ni la criticidad, ni la categoría, ni el responsable, ni la antigüedad predicen si una revisión sale conforme. Para la gestión es un hallazgo, no un fracaso: las no conformidades están repartidas en todo el inventario, así que la causa es el proceso de revisión (sistémica, en términos de Deming) y no un equipo o un tipo de herramienta.',
    'j48-no-conformes':
      'Al balancear las clases, el árbol se queda con un único atributo: la herramienta. Marca como propensas a «No conforme» a Jira, Locust, Postman, Selenium Grid, Snyk y Tosca. El Kappa sigue siendo bajo, así que no sirve para predecir casos individuales, pero sí para priorizar el plan de auditoría: esas seis herramientas concentran la mayor tasa de hallazgos graves.',
    'ranking-atributos':
      'La ganancia de información confirma la lectura anterior: herramienta_base es, por lejos, el atributo más informativo; el resto aporta casi nada y las variables temporales aportan cero. Si el área quiere mejorar la tasa de conformidad, el foco debe estar en el producto (configuración, versión, licenciamiento) más que en la persona responsable.',
    'clustering-kmeans':
      'K-Means separa cuatro perfiles: (0) herramientas Alta en revisión con observaciones, en remediación; (1) el núcleo Crítico en uso y conforme; (2) la operación estándar en uso y conforme, el grupo más grande; (3) herramientas en uso que nunca se revisaron: la brecha de control que Zabbix vigila con el trigger «Herramientas críticas nunca revisadas».',
    'asociacion-apriori':
      'Las reglas de mayor confianza son del tipo «criticidad = Alta ⇒ revisión vigente = No» (73 %). El lift ≈ 1 indica que no es una asociación causal, sino que el atraso es general: 7 de cada 10 herramientas, sean del perfil que sean, tienen la revisión vencida. La acción es un calendario de revisión anual obligatorio, no un ajuste puntual.',
  },
  references: [
    { apa: 'Hall, M., Frank, E., Holmes, G., Pfahringer, B., Reutemann, P., & Witten, I. H. (2009). The WEKA data mining software: An update. ACM SIGKDD Explorations Newsletter, 11(1), 10–18.', url: 'https://doi.org/10.1145/1656274.1656278', tipo: 'Artículo científico' },
    { apa: 'Witten, I. H., Frank, E., Hall, M. A., & Pal, C. J. (2017). Data mining: Practical machine learning tools and techniques (4.ª ed.). Morgan Kaufmann.', url: 'https://doi.org/10.1016/C2015-0-02071-8', tipo: 'Libro' },
    { apa: 'Fayyad, U., Piatetsky-Shapiro, G., & Smyth, P. (1996). From data mining to knowledge discovery in databases. AI Magazine, 17(3), 37–54.', url: 'https://doi.org/10.1609/aimag.v17i3.1230', tipo: 'Artículo científico' },
    { apa: 'Quinlan, J. R. (1993). C4.5: Programs for machine learning. Morgan Kaufmann.', url: 'https://dl.acm.org/doi/book/10.5555/152181', tipo: 'Libro' },
    { apa: 'MacQueen, J. (1967). Some methods for classification and analysis of multivariate observations. Proceedings of the Fifth Berkeley Symposium on Mathematical Statistics and Probability, 1, 281–297.', url: 'https://projecteuclid.org/euclid.bsmsp/1200512992', tipo: 'Artículo científico' },
    { apa: 'Agrawal, R., & Srikant, R. (1994). Fast algorithms for mining association rules. Proceedings of the 20th International Conference on Very Large Data Bases (VLDB), 487–499.', url: 'https://www.vldb.org/conf/1994/P487.PDF', tipo: 'Artículo científico' },
    { apa: 'Cohen, J. (1960). A coefficient of agreement for nominal scales. Educational and Psychological Measurement, 20(1), 37–46.', url: 'https://doi.org/10.1177/001316446002000104', tipo: 'Artículo científico' },
    { apa: 'University of Waikato. (2026). Weka 3: Machine learning software in Java.', url: 'https://ml.cms.waikato.ac.nz/weka', tipo: 'Software / documentación' },
  ],
};
