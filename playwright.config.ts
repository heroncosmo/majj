import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60_000,
  testDir: 'tests',
  retries: 0,
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
  },
  webServer: {
    command: 'npm run preview -- --port 4173',
    port: 4173,
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
});

