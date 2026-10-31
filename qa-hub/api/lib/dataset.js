// Lectura del dataset limpio (qa-hub/data/dataset_calidad.csv) generado por scripts/prepare_dataset.py
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const NUMERICOS = new Set(['id_herramienta', 'nivel_criticidad', 'dias_desde_revision', 'dias_creacion_a_revision', 'anio_creacion']);

function parseCsv(texto) {
  const filas = [];
  let campo = '';
  let fila = [];
  let entreComillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (entreComillas) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') entreComillas = false;
      else campo += c;
    } else if (c === '"') entreComillas = true;
    else if (c === ',') { fila.push(campo); campo = ''; }
    else if (c === '\n') { fila.push(campo.replace(/\r$/, '')); filas.push(fila); fila = []; campo = ''; }
    else campo += c;
  }
  if (campo || fila.length) { fila.push(campo); filas.push(fila); }
  return filas;
}

let cache = null;

export function loadDataset(dataDir) {
  const archivo = path.join(dataDir, 'dataset_calidad.csv');
  const mtime = statSync(archivo).mtimeMs;
  // Si alguien regenera el CSV, la API lo recarga sin reiniciar.
  if (cache && cache.mtime === mtime) return cache.registros;

  const [encabezado, ...filas] = parseCsv(readFileSync(archivo, 'utf-8'));
  const registros = filas
    .filter((f) => f.length === encabezado.length)
    .map((f) => Object.fromEntries(encabezado.map((h, i) => [h, NUMERICOS.has(h) && f[i] !== '' ? Number(f[i]) : f[i]])));
  cache = { mtime, registros };
  return registros;
}
