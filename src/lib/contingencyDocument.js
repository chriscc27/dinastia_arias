// Solo normaliza la presentación: conserva las palabras y el orden del documento.
const headings = new Map([
  ['PLAN DE CONTINGENCIA EN LOS CENTROS DE TECNOLOGÍAS DE INFORMACIÓN Y COMUNICACIONES', 'title'],
  ['Gestión de TIC 2026', 'meta'],
  ...[
    'INTRODUCCION', '¿Qué es un Plan de Contingencia?', 'Objetivos del Plan de Contingencia',
    'Aspectos Generales de la Seguridad de la Información',
    'Fases de la Metodología para el Desarrollo de un Plan de Contingencia de los Centros de Computo',
    'VISIÓN PRÁCTICA PARA REALIZAR UN PLAN DE CONTINGENCIA DE LOS SISTEMAS DE INFORMACIÓN',
    'CONCLUSION',
  ].map((text) => [text, 'heading']),
  ...[
    'Objetivo General', 'Objetivos Específicos', 'La Seguridad Física', 'Antes', 'Durante', 'Después',
    'PASOS PARA DESARROLLAR EL PLAN DE CONTINGENCIA DEL DEPARTAMENTO DE CALIDAD',
    'Prueba de Plan de Contingencia', 'Objetivos de las Pruebas', 'Niveles de Prueba',
    'Métodos de Prueba', 'Preparación Pre-Prueba',
    'ETAPA I: Análisis y Selección de las Operaciones Críticas',
    'ETAPA II: Identificación de Procesos en Cada Operación',
    'ETAPA III: Listado de Recursos Utilizados por las Operaciones',
    'ETAPA IV: Especificación de Escenarios en los Cuales Pueden Ocurrir los Problemas',
    'ETAPA V: Determinación y Detalle de las Medidas Preventivas',
    'ETAPA VI: Formación y Funciones de los Grupos de Trabajo',
    'ETAPA VII: Desarrollo de los Planes de Acción',
    'ETAPA VIII: Preparación de la Lista de Contactos de Emergencia',
    'ETAPA IX: Pruebas y Monitoreo del Plan',
    'ETAPA X: Comprobación, Mantenimiento y Revisión del Plan',
  ].map((text) => [text, 'subheading']),
]);

export function parseContingencyDocument(text) {
  const lines = text.replace(/\uFFFD/g, '').split(/\r?\n/).map((line) => line.trim());
  const blocks = [];
  let pending = [];
  let marker = '';

  const flush = () => {
    if (pending.length) blocks.push({ type: marker ? 'item' : 'paragraph', text: pending.join(' '), marker });
    pending = [];
    marker = '';
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line) { flush(); continue; }

    // Algunos títulos ocupan dos líneas en el archivo original.
    const combined = `${line} ${lines[index + 1] || ''}`;
    const heading = headings.has(line) ? line : headings.has(combined) ? combined : null;
    if (heading) {
      flush();
      blocks.push({ type: headings.get(heading), text: heading });
      if (heading === combined) index += 1;
      continue;
    }

    const item = line.match(/^(•|\d+\.)\s*(.*)$/);
    if (item) {
      flush();
      marker = item[1];
      pending.push(item[2]);
    } else {
      pending.push(line);
    }
  }
  flush();
  return blocks;
}
