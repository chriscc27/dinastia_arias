# QA Hub — AITECH | Área de Calidad

Servidor que conecta la página web (GitHub Pages, solo archivos estáticos) con las herramientas del Área de Calidad:

```
Página web (GitHub Pages)  ──HTTPS──►  Cloudflare Tunnel  ──►  QA Hub API (Node 20, :8787)
                                                                ├─► Zabbix 7.0 (API JSON-RPC)
                                                                ├─► Weka 3.8.6 (java -cp …)
                                                                └─► dataset_calidad.csv / .arff
Zabbix ──(ítem HTTP cada 1 min)──► QA Hub API /api/dataset/kpis  →  ítems + triggers de calidad
Tableau ──► dashboards construidos con dataset_calidad.csv; sus capturas se muestran en /tableau
```

La página nunca habla directo con Zabbix ni ve sus credenciales: solo consulta la API, que tiene CORS limitado a
`localhost:6767` y `chriscc27.github.io`. Si el servidor está apagado, cada página muestra la última captura
guardada en `src/data/generated/`.

## Levantar todo

Requisitos: Docker Desktop.

```bash
cd qa-hub
cp .env.example .env              # opcional: cambiar contraseñas y orígenes
docker compose up -d              # PostgreSQL, Zabbix server/web/agent, API y configurador
docker compose logs zabbix-setup  # debe terminar en "Zabbix configurado para AITECH | Calidad ✔"
```

| Servicio | URL |
|---|---|
| Frontend de Zabbix | http://localhost:8080 (Admin / zabbix) |
| QA Hub API | http://localhost:8787/api/health |

`zabbix/bootstrap.mjs` crea por API el grupo **AITECH Calidad**, el host **aitech-qa-kpis** (ítem HTTP + 7 ítems
dependientes con JSONPath), 7 triggers que traducen las metas del plan de calidad a severidades, dos escenarios web
(sitio público y API) y reapunta el host del servidor al agente. Es idempotente: se puede volver a correr.

## Publicar la API en internet (para la presentación)

```bash
docker compose --profile tunnel up -d
docker compose logs tunnel | grep trycloudflare.com
```

Esa URL `https://….trycloudflare.com` se pega en la barra **«Conectar servidor»** de cualquier página de herramientas
(queda guardada en el navegador) o se define como variable del repositorio `VITE_QA_HUB_URL` para que el build de
GitHub Pages la traiga por defecto. La URL del quick tunnel cambia cada vez que se reinicia; para una URL fija se usa
un túnel con nombre (`tunnel run --token …`) y un dominio propio, o la VPS del presupuesto.

## Endpoints

| Método | Ruta | Uso |
|---|---|---|
| GET | `/api/health` | Estado de la API, del dataset, de Weka y de Zabbix |
| GET | `/api/dataset/kpis` | KPIs y agregados para el tablero (`?compact=1` → formato para Zabbix) |
| GET | `/api/weka/results` | Últimos resultados de los 5 experimentos |
| POST | `/api/weka/run/:id` | Re-ejecuta un experimento (`clasificacion-j48`, `j48-no-conformes`, `ranking-atributos`, `clustering-kmeans`, `asociacion-apriori`) |
| GET | `/api/zabbix/summary` | Hosts, problemas activos, KPIs vigilados, escenarios web e historial de CPU |

## Scripts

| Script | Qué hace |
|---|---|
| `python qa-hub/scripts/prepare_dataset.py` | Excel → `data/dataset_calidad.csv` y `.arff` (+ copia en `public/data/`) |
| `python qa-hub/scripts/build_presupuesto.py` | Llena el template → `public/docs/Presupuesto_Area_Calidad_AITECH.xlsx` |
| `python qa-hub/scripts/build_tableau_workbook.py` | Genera el libro de Tableau (5 dashboards + extracción .hyper) → `qa-hub/tableau/` y `public/docs/AITECH_Calidad_Dashboards.twbx` (necesita `pip install tableauhyperapi`) |
| `node qa-hub/scripts/snapshot.mjs` | Guarda las respuestas de la API en `src/data/generated/` (capturas de respaldo) |
| `sh qa-hub/weka/download-weka.sh` | Descarga Weka 3.8.6 y sus dependencias (para correr la API fuera de Docker) |

Los scripts de Python necesitan `pip install openpyxl`.
