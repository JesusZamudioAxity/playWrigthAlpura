import { defineConfig } from '@playwright/test';
import { WEB_BASE_URL, DEFAULT_TIMEOUT } from './core/config/enviroments';

export default defineConfig({
  testDir: './domains',

  timeout: DEFAULT_TIMEOUT,

  use: {
    baseURL: WEB_BASE_URL,
    headless: true,
    trace: 'on-first-retry'
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports', open: 'never' }]
  ]
});