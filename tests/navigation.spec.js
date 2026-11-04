import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const routes = [
  ['', 'Inicio'], ['gestion-tecnologias', 'Gestión'],
  ['ciencia-tecnologia-innovacion', 'Ciencia e Innovación'], ['mision-vision', 'Misión y Visión'],
  ['organizacion', 'Organización'], ['mbti', 'MBTI'], ['scrum', 'Scrum'],
  ['idef-0', 'IDEF-0'], ['bpmn', 'BPMN'], ['alcance', 'Alcance'], ['herramientas', 'Herramientas'],
  ['tableau', 'Tableau'], ['weka', 'Weka'], ['monitoreo', 'Monitoreo'],
  ['presupuesto', 'Presupuesto'], ['soporte-externo', 'Soporte externo'], ['trabaja-con-nosotros', 'Contacto'],
];
const storageKey = 'dinastia-arias-scrum-kanban-tasks';

test.beforeEach(async ({ context }) => {
  // Las pruebas no dependen de YouTube, fuentes externas ni servicios desplegados.
  await context.route('**/*', (route) => new URL(route.request().url()).hostname === '127.0.0.1'
    ? route.continue() : route.fulfill({ status: 200, body: '' }));
});

for (const [route, label] of routes) {
  test(`Vista completa y navegación: ${label}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route || './');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('.site-header')).toHaveCount(1);
    await expect(page.locator('.c-footer-xl')).toHaveCount(1);
    await expect(page.locator('#site-navigation a')).toHaveCount(16);
    if (route === 'alcance') await expect(page.locator('#site-navigation [aria-current="page"]')).toHaveCount(0);
    else await expect(page.locator('#site-navigation [aria-current="page"]')).toHaveText(label);
    const positions = await page.evaluate(() => ({
      title: document.querySelector('h1').getBoundingClientRect().top,
      header: document.querySelector('.site-header').getBoundingClientRect().bottom,
    }));
    expect(positions.title).toBeGreaterThan(positions.header);
    expect(errors).toEqual([]);
  });
}

test('El inicio resume y enlaza las vistas completas', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.summary-card')).toHaveCount(13);
  await expect(page.locator('.kanban-board-grid, .bpmn-standard-container, .idef0-diagram-container')).toHaveCount(0);
  await expect(page.locator('.home-data-note')).toContainText('30 de abril de 2026');
  await expect(page.locator('video')).toHaveJSProperty('paused', true);
  await page.locator('.summary-card').filter({ has: page.getByRole('heading', { name: 'Gestión de Tecnologías', exact: true }) }).click();
  await expect(page).toHaveURL(/\/gestion-tecnologias$/);
  await expect(page.locator('main')).toContainText('Mejora Continua Sistemática');
  await expect(page.locator('main')).toContainText('Publicaciones');
  await expect(page.locator('.related-videos-section')).toHaveCount(1);
  await page.goBack();
  await expect(page).toHaveURL(/\/dinastia_arias\/$/);
});

test('Fragmentos antiguos y anclas propias de una página', async ({ page }) => {
  for (const [hash, destination] of [
    ['inicio', ''], ['gestion-tecnologias', 'gestion-tecnologias'],
    ['ciencia-tecnologia', 'ciencia-tecnologia-innovacion'], ['mision-vision', 'mision-vision'],
    ['equipo', 'organizacion#equipo'], ['organizacion', 'organizacion'], ['mbti', 'mbti'],
    ['scrum', 'scrum'], ['idef-0', 'idef-0'], ['bpmn', 'bpmn'],
    ['herramientas', 'herramientas'], ['alcance', 'alcance'], ['contacto', 'trabaja-con-nosotros'],
  ]) {
    await page.goto(`./#${hash}`);
    await expect(page).toHaveURL(new RegExp(`/dinastia_arias/${destination}$`));
    await expect(page.locator('h1')).toBeVisible();
  }
  await page.goto('tableau#tablero');
  await expect(page).toHaveURL(/\/tableau#tablero$/);
  await expect.poll(() => page.locator('#tablero').evaluate((el) => el.getBoundingClientRect().top)).toBeGreaterThan(0);
  await expect(page.locator('#tablero')).toBeInViewport();
});

test('Equipo se integra en Organización y el navbar conserva los títulos solicitados', async ({ page }) => {
  await page.goto('organizacion');
  await expect(page.locator('#site-navigation a')).toHaveText([
    'Inicio', 'Gestión', 'Ciencia e Innovación', 'Misión y Visión', 'Organización', 'MBTI', 'Scrum', 'IDEF-0', 'BPMN',
    'Herramientas', 'Tableau', 'Weka', 'Monitoreo', 'Presupuesto', 'Soporte externo', 'Contacto',
  ]);
  await expect(page.locator('.team-card-bio')).toHaveCount(5);
  await expect(page.locator('#equipo')).toContainText('Daniel Zamorano');
  await expect(page.locator('#equipo')).toContainText('MISIÓN');
  await expect(page.locator('#equipo')).toContainText('VISIÓN');
  await page.goto('equipo');
  await expect(page).toHaveURL(/\/organizacion#equipo$/);
  await expect(page.locator('#equipo')).toBeInViewport();
  await expect(page.locator('#site-navigation [aria-current="page"]')).toHaveText('Organización');
});

test('La portada mantiene la animación de scroll y permite saltar al resumen', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./');
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.locator('.home-hero-pin').evaluate((el) => el.offsetHeight)).toBeGreaterThan(2500);
  for (const [progress, message] of [[.2, '1'], [.55, '2'], [.87, '3']]) {
    await page.evaluate((fraction) => {
      const pin = document.querySelector('.home-hero-pin');
      const sticky = document.querySelector('.hero-sticky-container');
      window.scrollTo({ top: (pin.offsetHeight - sticky.offsetHeight) * fraction, behavior: 'instant' });
    }, progress);
    await expect(page.locator('.scroller_item.active')).toHaveAttribute('data-message', message);
    expect(await page.locator('.char_reveal.revealed').count()).toBeGreaterThan(0);
    expect(await page.locator('.hero-sticky-container').evaluate((el) => el.getBoundingClientRect().top)).toBe(0);
  }
  await page.getByRole('link', { name: 'Ver resumen', exact: true }).click();
  await expect(page).toHaveURL(/#resumen-proyecto$/);
  await expect(page.locator('#resumen-titulo')).toBeInViewport();
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./');
  await expect(page.getByRole('link', { name: 'Ver resumen', exact: true })).toBeInViewport();
  await expect.poll(() => page.locator('.hero-motion-toggle').evaluate((el) => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(568);
});

test('Imágenes del inicio y footer accesible con contactos y navegación agrupada', async ({ page, request }) => {
  await page.goto('./');
  await expect(page.locator('.summary-card-media img')).toHaveCount(13);
  await expect(page.locator('.home-vertical-gallery img')).toHaveCount(7);
  await page.locator('.home-summary-section').first().scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.home-summary-section').first().locator('img').evaluateAll((els) => els.every((img) => img.complete && img.naturalWidth > 0))).toBeTruthy();
  const images = await page.locator('main img').evaluateAll((els) => [...new Set(els.map((el) => el.src))]);
  for (const image of images) {
    const response = await request.get(image);
    expect(response.ok(), image).toBeTruthy();
    expect(response.headers()['content-type']).toMatch(/image\//);
  }
  const footer = page.locator('.site-footer');
  await expect(footer.locator('a[href^="mailto:"]')).toHaveCount(5);
  await expect(footer.getByRole('navigation')).toHaveCount(3);
  await footer.getByRole('link', { name: /DINASTÍA ARIAS/ }).click();
  await expect(page).toHaveURL(/\/organizacion#equipo$/);
  await expect(page.locator('#equipo')).toBeInViewport();
  await footer.getByRole('button', { name: 'Volver arriba', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('Menú móvil con teclado, enlaces directos y cierre al navegar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const toggle = page.locator('.nav-menu-toggle');
  await expect(page.locator('#site-navigation')).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.locator('#site-navigation a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.locator('#site-navigation').getByRole('link', { name: 'BPMN', exact: true }).click();
  await expect(page).toHaveURL(/\/bpmn$/);
  await expect(page.locator('#site-navigation')).toBeHidden();
  await expect(page.locator('h1')).toHaveText('Procesos con BPMN');
});

test('Sin desbordamiento horizontal en tamaños pequeños y medianos', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['', 'alcance', 'scrum', 'tableau', 'trabaja-con-nosotros']) {
      await page.goto(route || './');
      await expect(page.locator('h1')).toBeVisible();
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth, `${route} a ${width}px`).toBeLessThanOrEqual(width);
    }
  }
});

test('Contenido consolidado, recursos y nombre confirmado', async ({ page, request }) => {
  for (const [route, content] of [
    ['gestion-tecnologias', 'Mejora Continua Sistemática'],
    ['ciencia-tecnologia-innovacion', 'Sabiduría estructurada'],
    ['mision-vision', '¿Qué es la Misión Organizacional?'],
  ]) {
    await page.goto(route);
    await expect(page.locator('main')).toContainText(content);
    await expect(page.locator('.related-videos-section')).toHaveCount(1);
    await expect(page.locator('.cutout-card-inner')).toHaveCount(3);
  }
  await page.goto('trabaja-con-nosotros');
  await expect(page.locator('main')).toContainText('Daniel Zamorano');
  await expect(page.locator('main')).not.toContainText('Alejandro Zamorano');
  await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(5);
  for (const route of ['organizacion', 'tableau', 'presupuesto']) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    const links = await page.locator('main a[href*="/docs/"], main a[href*="/data/"]').evaluateAll((els) => [...new Set(els.map((el) => el.href))]);
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const response = await request.get(link);
      expect(response.ok(), link).toBeTruthy();
      expect((await response.body()).length).toBeGreaterThan(100);
    }
  }
});

test('Kanban conserva tareas previas y permite crear, editar, filtrar, mover y eliminar', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(({ key }) => localStorage.setItem(key, JSON.stringify([{ id: 'saved-task', title: 'Tarea anterior', assignee: 'Daniel', priority: 'Alta', status: 'todo', vertical: 'Calidad' }])), { key: storageKey });
  await page.goto('scrum');
  await expect(page.locator('.kanban-task-card')).toContainText('Tarea anterior');
  await page.getByRole('textbox', { name: 'Título del entregable', exact: true }).fill('Revisión de navegación');
  await page.getByRole('textbox', { name: 'Responsable', exact: true }).fill('Daniel');
  await page.getByRole('button', { name: 'Añadir tarea', exact: true }).click();
  const task = page.locator('.kanban-task-card').filter({ hasText: 'Revisión de navegación' });
  await task.getByRole('button', { name: 'Editar', exact: true }).click();
  await page.getByRole('textbox', { name: 'Título del entregable', exact: true }).fill('Revisión completa');
  await page.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
  const edited = page.locator('.kanban-task-card').filter({ hasText: 'Revisión completa' });
  await edited.getByRole('button', { name: 'Mover a la siguiente columna' }).click();
  await expect(page.locator('.kanban-column-in-progress')).toContainText('Revisión completa');
  await page.reload();
  await expect(page.locator('.kanban-column-in-progress')).toContainText('Revisión completa');
  await page.getByRole('textbox', { name: 'Buscar', exact: true }).fill('Revisión completa');
  await expect(page.locator('.kanban-task-card')).toHaveCount(1);
  page.once('dialog', (dialog) => dialog.accept());
  await page.locator('.kanban-task-card').getByRole('button', { name: 'Eliminar', exact: true }).click();
  await expect(page.locator('.kanban-task-card')).toHaveCount(0);
  await page.getByRole('textbox', { name: 'Buscar', exact: true }).fill('');
  await expect(page.locator('.kanban-task-card')).toContainText('Tarea anterior');
});

test('Kanban funciona con almacenamiento bloqueado o datos inválidos', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => '{"invalid":true}';
    Storage.prototype.setItem = () => { throw new Error('Storage bloqueado'); };
  });
  await page.goto('scrum');
  await expect(page.locator('.kanban-task-card').first()).toBeVisible();
  await expect(page.getByRole('status')).toContainText('El navegador no permite guardar');
});

test('IDEF-0 y BPMN conservan selección, expansión, zoom y descarga', async ({ page }) => {
  await page.goto('idef-0');
  const initial = await page.locator('button.flow-chip').count();
  await page.getByRole('button', { name: /Ver todos los flujos detallados/ }).click();
  expect(await page.locator('button.flow-chip').count()).toBeGreaterThan(initial);
  await page.getByRole('button', { name: 'Entradas (I)', exact: true }).click();
  await expect(page.locator('.inspector-heading')).toContainText('Entradas Tecnológicas');
  await page.goto('bpmn');
  const element = page.locator('.bpmn-element-card').last();
  await element.focus();
  await page.keyboard.press('Enter');
  await expect(element).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.tracker-pill').last().click();
  await expect(page.locator('.tracker-pill').last()).toHaveClass(/active/);
  await page.getByRole('button', { name: 'Acercar zoom', exact: true }).click();
  await page.getByRole('button', { name: 'Restablecer vista centrada', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Descargar .bpmn/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('aitech-evaluacion-calidad.bpmn');
  expect(await readFile(await download.path(), 'utf8')).toContain('<bpmn:definitions');
});

test('Alcance conserva el carrusel y sus detalles', async ({ page }) => {
  await page.goto('alcance');
  await expect(page.locator('.cf-detail-title')).toContainText('Calidad Global');
  await page.getByRole('button', { name: 'Vertical siguiente', exact: true }).click();
  await expect(page.locator('.cf-detail-title')).not.toContainText('Calidad Global');
  await page.getByRole('button', { name: 'Ir a la vertical 1', exact: true }).click();
  await expect(page.locator('.cf-detail-title')).toContainText('Software');
});

test('Capturas, actualización y ejecución Weka con una API simulada', async ({ page }) => {
  const dataset = JSON.parse(await readFile(new URL('../src/data/generated/datasetKpis.json', import.meta.url)));
  const weka = JSON.parse(await readFile(new URL('../src/data/generated/wekaResults.json', import.meta.url)));
  const zabbix = JSON.parse(await readFile(new URL('../src/data/generated/zabbixSnapshot.json', import.meta.url)));
  await page.goto('tableau');
  await expect(page.locator('.tool-data-status')).toContainText('Última captura guardada');
  await page.evaluate(() => localStorage.setItem('aitech-qa-hub-url', `${location.origin}/mock-api`));
  await page.route('**/mock-api/api/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    const data = path.endsWith('/dataset/kpis') ? dataset : path.endsWith('/weka/results') ? weka : path.includes('/weka/run/') ? weka[path.split('/').at(-1)] : zabbix;
    await route.fulfill({ json: data });
  });
  await page.goto('weka');
  await expect(page.locator('.tool-data-status')).toContainText('Datos consultados al servidor');
  await page.getByRole('button', { name: 'Ejecutar en el servidor', exact: true }).first().click();
  await expect(page.locator('.tl-hub-msg.ok')).toContainText('Ejecutado en el servidor');
  await page.goto('monitoreo');
  await expect(page.locator('.tool-data-status')).toContainText('Datos consultados al servidor');
  await page.unroute('**/mock-api/api/**');
  await page.route('**/mock-api/api/**', (route) => route.fulfill({ status: 503, json: { error: 'Servidor no disponible' } }));
  await page.goto('tableau');
  await expect(page.locator('.tool-data-status')).toContainText('No se pudo actualizar');
  await expect(page.locator('.tool-data-status')).toContainText('Última captura guardada');
  await expect(page.locator('#tablero')).toBeAttached();
});

test('Ruta desconocida con salida clara', async ({ page }) => {
  await page.goto('pagina-inexistente');
  await expect(page.locator('h1')).toHaveText('No encontramos esta página.');
  await page.getByRole('link', { name: 'Volver al inicio', exact: false }).click();
  await expect(page).toHaveURL(/\/dinastia_arias\/$/);
});
