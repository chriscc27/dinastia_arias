// Ejecuta Weka 3.8 (línea de comandos) sobre dataset_calidad.arff y convierte su salida en JSON.
// Solo se permiten los experimentos definidos aquí: la API nunca arma comandos con datos del usuario.
import { execFile } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Índices de atributos en dataset_calidad.arff (ver prepare_dataset.py):
// 1 herramienta_base · 2 categoria_herramienta · 3 categoria_consistente · 4 rol_responsable · 5 criticidad
// 6 estado_gestion · 7 revision_vigente · 8 riesgo_operativo · 9 nivel_criticidad · 10 anio_creacion
// 11 dias_creacion_a_revision · 12 dias_desde_revision · 13 resultado_revision (clase)

const JAVA_OPTS = ['-Xmx768m', '-Dfile.encoding=UTF-8', '-Dstdout.encoding=UTF-8', '-Dsun.stdout.encoding=UTF-8', '-Duser.language=en', '-Duser.country=US'];

function weka(cp, args) {
  return new Promise((resolve, reject) => {
    execFile('java', [...JAVA_OPTS, '-cp', cp, ...args], { maxBuffer: 8 * 1024 * 1024, timeout: 120000 }, (err, stdout, stderr) => {
      if (err) reject(new Error(`Weka falló (${args[0]}): ${stderr.split('\n').find((l) => /Exception|Error/.test(l)) || err.message}`));
      else resolve(stdout.replace(/\r/g, ''));
    });
  });
}

const num = (s) => (s === undefined ? null : Number(s));

function parseEvaluacion(salida) {
  const cv = salida.slice(salida.indexOf('=== Stratified cross-validation ==='));
  const matriz = cv.slice(cv.indexOf('=== Confusion Matrix ==='));
  const filasMatriz = [...matriz.matchAll(/^\s*([\d\s]+)\|\s+\w = (.+)$/gm)].map((m) => ({
    clase: m[2].trim(),
    valores: m[1].trim().split(/\s+/).map(Number),
  }));
  const porClase = [...cv.matchAll(/^\s+([\d.?]+)\s+([\d.?]+)\s+([\d.?]+)\s+([\d.?]+)\s+([\d.?]+)\s+([\d.?]+)\s+([\d.?]+)\s+([\d.?]+)\s+(\S.*)$/gm)]
    .filter((m) => !m[9].startsWith('Weighted'))
    .map((m) => ({ clase: m[9].trim(), tp_rate: num(m[1]), precision: m[3] === '?' ? null : num(m[3]), recall: num(m[4]), f_measure: m[5] === '?' ? null : num(m[5]), roc: num(m[7]) }));
  return {
    exactitud: num(cv.match(/Correctly Classified Instances\s+\d+\s+([\d.]+)/)?.[1]),
    correctas: num(cv.match(/Correctly Classified Instances\s+(\d+)/)?.[1]),
    instancias: num(cv.match(/Total Number of Instances\s+(\d+)/)?.[1]),
    kappa: num(cv.match(/Kappa statistic\s+(-?[\d.]+)/)?.[1]),
    por_clase: porClase.filter((c) => filasMatriz.some((f) => f.clase === c.clase && f.valores.some(Boolean))),
    matriz_confusion: filasMatriz.filter((f) => f.valores.some(Boolean)),
  };
}

function parseArbol(salida) {
  const inicio = salida.indexOf('J48 pruned tree');
  const fin = salida.indexOf('Number of Leaves');
  const arbol = salida.slice(inicio, fin).split('\n').slice(2).filter((l) => l.trim()).join('\n');
  return { arbol, hojas: num(salida.match(/Number of Leaves\s*:\s*(\d+)/)?.[1]), tamano: num(salida.match(/Size of the tree\s*:\s*(\d+)/)?.[1]) };
}

const EXPERIMENTOS = {
  'clasificacion-j48': {
    titulo: 'Clasificación: ¿se puede predecir el resultado de una revisión?',
    algoritmo: 'weka.classifiers.trees.J48 -C 0.25 -M 2 (vs. ZeroR y NaiveBayes), validación cruzada 10 pliegues',
    async ejecutar(cp, arff, tmp) {
      const revisadas = path.join(tmp, 'revisadas.arff');
      const sinRiesgo = path.join(tmp, 'revisadas_sin_riesgo.arff');
      // Solo herramientas revisadas; se quita riesgo_operativo porque se calcula a partir del resultado (fuga de información).
      await weka(cp, ['weka.filters.unsupervised.instance.RemoveWithValues', '-C', 'last', '-L', '4', '-H', '-i', arff, '-o', revisadas]);
      await weka(cp, ['weka.filters.unsupervised.attribute.Remove', '-R', '8', '-i', revisadas, '-o', sinRiesgo]);
      const [zeroR, j48, bayes] = await Promise.all([
        weka(cp, ['weka.classifiers.rules.ZeroR', '-t', sinRiesgo, '-x', '10', '-s', '1']),
        weka(cp, ['weka.classifiers.trees.J48', '-t', sinRiesgo, '-x', '10', '-s', '1', '-C', '0.25', '-M', '2']),
        weka(cp, ['weka.classifiers.bayes.NaiveBayes', '-t', sinRiesgo, '-x', '10', '-s', '1']),
      ]);
      return {
        modelos: [
          { nombre: 'ZeroR (línea base)', ...parseEvaluacion(zeroR) },
          { nombre: 'J48 (árbol C4.5)', ...parseEvaluacion(j48), ...parseArbol(j48) },
          { nombre: 'Naive Bayes', ...parseEvaluacion(bayes) },
        ],
        salida: j48.slice(0, j48.indexOf('=== Error on training data ===')) + j48.slice(j48.indexOf('=== Stratified cross-validation ===')),
      };
    },
  },

  'j48-no-conformes': {
    titulo: 'Árbol J48 balanceado: ¿qué herramientas tienden a quedar No conformes?',
    algoritmo: 'FilteredClassifier( ClassBalancer + J48 -C 0.25 -M 60 ), clase binaria No conforme vs. Sin hallazgo grave',
    async ejecutar(cp, arff, tmp) {
      const revisadas = path.join(tmp, 'revisadas.arff');
      const sinRiesgo = path.join(tmp, 'revisadas_sin_riesgo.arff');
      const binaria = path.join(tmp, 'no_conformes.arff');
      await weka(cp, ['weka.filters.unsupervised.instance.RemoveWithValues', '-C', 'last', '-L', '4', '-H', '-i', arff, '-o', revisadas]);
      await weka(cp, ['weka.filters.unsupervised.attribute.Remove', '-R', '8', '-i', revisadas, '-o', sinRiesgo]);
      await weka(cp, ['weka.filters.unsupervised.attribute.MergeManyValues', '-C', 'last', '-L', 'Sin hallazgo grave', '-R', '1,2', '-i', sinRiesgo, '-o', binaria]);
      const salida = await weka(cp, ['weka.classifiers.meta.FilteredClassifier', '-t', binaria, '-x', '10', '-s', '1',
        '-F', 'weka.filters.supervised.instance.ClassBalancer', '-W', 'weka.classifiers.trees.J48', '--', '-C', '0.25', '-M', '60']);
      const arbol = parseArbol(salida);
      const ramas = [...arbol.arbol.matchAll(/^herramienta_base = (.+): (.+) \(([\d.]+)\/([\d.]+)\)$/gm)].map((m) => ({
        herramienta: m[1], prediccion: m[2], peso: num(m[3]), errores: num(m[4]),
      }));
      return { ...parseEvaluacion(salida), ...arbol, ramas, salida: salida.slice(salida.indexOf('J48 pruned tree')) };
    },
  },

  'ranking-atributos': {
    titulo: 'Ranking de atributos por ganancia de información',
    algoritmo: 'weka.attributeSelection.InfoGainAttributeEval + Ranker, clase resultado_revision (solo revisadas)',
    async ejecutar(cp, arff, tmp) {
      const revisadas = path.join(tmp, 'revisadas.arff');
      const sinRiesgo = path.join(tmp, 'revisadas_sin_riesgo.arff');
      await weka(cp, ['weka.filters.unsupervised.instance.RemoveWithValues', '-C', 'last', '-L', '4', '-H', '-i', arff, '-o', revisadas]);
      await weka(cp, ['weka.filters.unsupervised.attribute.Remove', '-R', '8', '-i', revisadas, '-o', sinRiesgo]);
      const salida = await weka(cp, ['weka.attributeSelection.InfoGainAttributeEval', '-i', sinRiesgo, '-s', 'weka.attributeSelection.Ranker']);
      const ranking = [...salida.matchAll(/^\s*([\d.]+)\s+(\d+)\s+(\S+)$/gm)].map((m) => ({ atributo: m[3], ganancia: num(m[1]) }));
      return { ranking, salida: salida.slice(salida.indexOf('=== Attribute Selection')) };
    },
  },

  'clustering-kmeans': {
    titulo: 'Agrupamiento: perfiles de herramientas con SimpleKMeans',
    algoritmo: 'weka.clusterers.SimpleKMeans -N 4 -S 10 -I 500 (distancia euclidiana, atributos normalizados)',
    async ejecutar(cp, arff, tmp) {
      const sub = path.join(tmp, 'kmeans.arff');
      await weka(cp, ['weka.filters.unsupervised.attribute.Remove', '-V', '-R', '5,6,9,11,12,13', '-i', arff, '-o', sub]);
      const salida = await weka(cp, ['weka.clusterers.SimpleKMeans', '-t', sub, '-N', '4', '-S', '10', '-I', '500']);
      const tabla = salida.slice(salida.indexOf('Final cluster centroids'), salida.indexOf('=== Clustering stats'));
      const filas = tabla.split('\n').filter((l) => l.trim() && !/^[=]+$/.test(l.trim()));
      // Las columnas están alineadas a la derecha: se toman los cortes de la fila de tamaños "(1200.0) (195.0) ...".
      const filaTamanos = filas.find((l) => /^\s+\([\d.]+\)/.test(l));
      const cortes = [...filaTamanos.matchAll(/\([\d.]+\)/g)].map((m) => m.index + m[0].length);
      const atributos = filas
        .filter((l) => /^\S/.test(l) && !l.startsWith('Final') && !l.startsWith('Attribute'))
        .map((l) => {
          const atributo = l.split(/\s/)[0];
          const valores = cortes.map((fin, i) => l.slice(i === 0 ? atributo.length : cortes[i - 1], fin).trim());
          return { atributo, global: valores[0], clusters: valores.slice(1) };
        });
      const tamanos = [...salida.matchAll(/^(\d+)\s+(\d+)\s+\(\s*(\d+)%\)$/gm)].map((m) => ({ cluster: num(m[1]), instancias: num(m[2]), pct: num(m[3]) }));
      return {
        iteraciones: num(salida.match(/Number of iterations: (\d+)/)?.[1]),
        sse: num(salida.match(/Within cluster sum of squared errors: ([\d.]+)/)?.[1]),
        atributos,
        tamanos,
        salida: salida.slice(salida.indexOf('kMeans')),
      };
    },
  },

  'asociacion-apriori': {
    titulo: 'Reglas de asociación con Apriori',
    algoritmo: 'weka.associations.Apriori -N 12 -C 0.6 -M 0.1 sobre rol, criticidad, estado, vigencia y resultado (revisadas)',
    async ejecutar(cp, arff, tmp) {
      const revisadas = path.join(tmp, 'revisadas.arff');
      const sub = path.join(tmp, 'apriori.arff');
      await weka(cp, ['weka.filters.unsupervised.instance.RemoveWithValues', '-C', 'last', '-L', '4', '-H', '-i', arff, '-o', revisadas]);
      await weka(cp, ['weka.filters.unsupervised.attribute.Remove', '-V', '-R', '4,5,6,7,13', '-i', revisadas, '-o', sub]);
      const salida = await weka(cp, ['weka.associations.Apriori', '-t', sub, '-N', '12', '-C', '0.6', '-M', '0.1']);
      const reglas = [...salida.matchAll(/^\s*\d+\. (.+?) (\d+) ==> (.+?) (\d+)\s+<?conf:\(([\d.]+)\)>? lift:\(([\d.]+)\)/gm)].map((m) => ({
        antecedente: m[1], soporte_antecedente: num(m[2]), consecuente: m[3], soporte_regla: num(m[4]), confianza: num(m[5]), lift: num(m[6]),
      }));
      return { reglas, salida: salida.slice(salida.indexOf('Apriori')) };
    },
  },
};

export const EXPERIMENT_IDS = Object.keys(EXPERIMENTOS);

let enCurso = Promise.resolve();

// Serializa las corridas: Weka usa bastante memoria y el servidor es pequeño.
export function runExperiment(id, { cp, arff }) {
  const exp = EXPERIMENTOS[id];
  if (!exp) throw new Error(`Experimento desconocido: ${id}`);
  const tarea = enCurso.then(async () => {
    const tmp = mkdtempSync(path.join(tmpdir(), 'weka-'));
    const inicio = Date.now();
    try {
      const resultado = await exp.ejecutar(cp, arff, tmp);
      return { id, titulo: exp.titulo, algoritmo: exp.algoritmo, ejecutado: new Date().toISOString(), duracion_ms: Date.now() - inicio, ...resultado };
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });
  enCurso = tarea.catch(() => {});
  return tarea;
}

export async function runAll(opts) {
  const resultados = {};
  for (const id of EXPERIMENT_IDS) resultados[id] = await runExperiment(id, opts);
  return resultados;
}
