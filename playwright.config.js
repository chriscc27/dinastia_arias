import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: 'http://127.0.0.1:6768/dinastia_arias/',
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 6768 --strictPort',
    url: 'http://127.0.0.1:6768/dinastia_arias/',
    reuseExistingServer: !process.env.CI,
  },
});
