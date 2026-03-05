import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './services-tests',
  timeout: 30000,
  use: {
    baseURL: 'https://accqa.axity.com'
  },
  fullyParallel: false,
  workers: 1,

  projects: [
    {
      name: 'smoke',
      testMatch: /smoke\/.*\.spec\.js/
    },
    {
      name: 'contracts',
      testMatch: /member\.nip\.contract/,
    },
    {
      name: 'regression',
      testMatch: /regression\/.*\.spec\.js/,
    },
    {
      name: 'integration',
      testMatch: /integration\/.*\.spec\.js/,
    }]
});