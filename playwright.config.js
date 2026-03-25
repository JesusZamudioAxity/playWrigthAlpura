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

  // projects: [
  //   {
  //     name: 'smoke',
  //     testMatch: /smoke\/.*\.spec\.js/
  //   },
  //   {
  //     name: 'contracts',
  //     testMatch: /member\/.*\.spec\.js/,
  //   },
  //   {
  //     name: 'regression',
  //     testMatch: /regression\/.*\.spec\.js/,
  //   },
  //   {
  //     name: 'integration',
  //     testMatch: /integration\/.*\.spec\.js/,
  //   }]
});