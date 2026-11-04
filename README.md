# AITECH | Área de Calidad — Dinastía Arias

Sitio del proyecto de gestión y aseguramiento de calidad de AITECH, construido con React y Vite.

## Desarrollo

Requisitos: Node.js 20 o superior y npm.

```sh
npm ci
npm run dev
```

Dirección local: `http://localhost:6767/dinastia_arias/`.

```sh
npm run build
npm run preview
```

La base por defecto es `/dinastia_arias/`, utilizada en GitHub Pages. Se puede configurar con `VITE_BASE_PATH` al compilar. El workflow existente de GitHub Actions genera también `404.html` para permitir abrir las rutas de la aplicación directamente.

## Navegación y contenido

- El inicio resume el proyecto con imágenes y enlaza a las vistas completas. Conserva la animación original de scroll, texto letra por letra y video; permite saltar al resumen y respeta la preferencia de movimiento reducido.
- El menú conserva sus títulos originales y Contacto: 16 opciones con acceso directo, disponibles en escritorio y móvil.
- Gestión, Ciencia y Misión reúnen sus introducciones y contenido ampliado.
- Equipo forma parte de Organización, con sus perfiles completos. La ruta antigua `/equipo` abre `/organizacion#equipo`.
- MBTI, Scrum, IDEF-0, BPMN y Herramientas tienen sus propias páginas. Alcance se consulta desde el inicio y no aparece como título del navbar.
- El footer organiza los enlaces por Proyecto, Procesos y Herramientas, e incluye contactos directos, acceso al equipo y un botón para volver arriba.
- Se mantienen las páginas de Tableau, Weka, Monitoreo, Presupuesto y Soporte externo.
- Los enlaces antiguos al inicio, como `/#scrum`, se traducen a las nuevas rutas; las anclas internas como `/tableau#tablero` siguen funcionando.

`src/data/siteNav.js` centraliza los destinos, los resúmenes y los títulos. `src/components/SiteLayout.jsx` comparte cabecera y pie entre todas las páginas. Los datos del equipo y sus contactos están en `src/data/teamData.js`.

El Kanban conserva la clave `dinastia-arias-scrum-kanban-tasks` para mantener las tareas guardadas antes de la reorganización.

## QA Hub

Tableau, Weka y Monitoreo pueden consultar QA Hub mediante `VITE_QA_HUB_URL`. Cuando no hay conexión, muestran las capturas incluidas en `src/data/generated/`, identificadas como datos de respaldo con su fecha.

La configuración de la API, Zabbix, Weka, Docker y la generación de documentos está descrita en [qa-hub/README.md](qa-hub/README.md).

## Pruebas de navegación

Las pruebas usan la compilación de producción y levantan una vista previa en el puerto 6768. Incluyen rutas, menú móvil con teclado, tamaños de 320 a 1440 px, contenido consolidado, descargas, Kanban, diagramas, carrusel y estados de conexión con una API simulada.

```sh
npm run build
npx playwright install chromium
npm run test:e2e
```

También puede utilizarse Edge instalado en Windows, desde PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:e2e
```

Los informes de fallos se guardan en `test-results/`, excluido del repositorio. Las pruebas aíslan los recursos externos y no ejecutan experimentos contra una API real.

El inventario de contenido y el detalle de la reorganización están en [docs/plan-reorganizacion-navegacion.md](docs/plan-reorganizacion-navegacion.md).
