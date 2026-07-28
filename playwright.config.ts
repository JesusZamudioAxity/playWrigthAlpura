import { defineConfig } from '@playwright/test';
import { BASE_URL, DEFAULT_TIMEOUT } from './core/config/enviroments';

export default defineConfig({
  testDir: './domains',
  timeout: DEFAULT_TIMEOUT,
  use: {
    baseURL: BASE_URL,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports', open: 'never' }]
  ]
});


/*import { defineConfig } from '@playwright/test';
import { BASE_URL, DEFAULT_TIMEOUT } from './core/config/environments';

export default defineConfig({
  use: {
    baseURL: BASE_URL,
  },
  timeout: DEFAULT_TIMEOUT,
});*/

/*-----------------
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './services-tests',
  timeout: 30000,
  use: {
    baseURL: 'https://accqa.axity.com'
  },
  fullyParallel: false,
  workers: 1,

  reporter: [
      ['list'],
      ['html', { outputFolder: 'reports/services', open: 'always' }]
    ],

    projects: [
    {
      name: 'smoke',
      testMatch: /\/smoke\/.*\.spec\.js/
    },
    {
      name: 'contracts',
      testMatch: /\/contracts\/.*\.spec\.js/
    },
    {
      name: 'regression',
      testMatch: /\/regression\/.*\.spec\.js/
    },
    {
      name: 'integration',
      testMatch: /\/integration\/.*\.spec\.js/
    }
  ]
});*/