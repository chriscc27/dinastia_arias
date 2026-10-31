// Guarda la última respuesta de la QA Hub API dentro del frontend (src/data/generated/*.json).
// La página usa estas capturas cuando el servidor está apagado, así nunca queda vacía.
//
// Uso (con el stack levantado):  node qa-hub/scripts/snapshot.mjs [http://localhost:8787]
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HUB = process.argv[2] || process.env.QA_HUB_URL || 'http://localhost:8787';
const DESTINO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'data', 'generated');

const capturas = {
  'datasetKpis.json': '/api/dataset/kpis',
  'wekaResults.json': '/api/weka/results',
  'zabbixSnapshot.json': '/api/zabbix/summary',
};

mkdirSync(DESTINO, { recursive: true });
for (const [archivo, ruta] of Object.entries(capturas)) {
  const res = await fetch(HUB + ruta);
  if (!res.ok) throw new Error(`${ruta} respondió ${res.status}`);
  writeFileSync(path.join(DESTINO, archivo), JSON.stringify(await res.json(), null, 2) + '\n');
  console.log(`✔ ${archivo}`);
}
