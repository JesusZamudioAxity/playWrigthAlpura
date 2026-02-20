import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './services-tests',
  timeout: 30000,
  use: {
    baseURL: 'https://accqa.axity.com'
  },
  fullyParallel: false,

  projects: [
    {
      name: 'smoke',
      testMatch: /smoke\/.*\.spec\.js/
    },
    {
      name: 'contracts',
      testMatch: /contracts\/.*\.spec\.js/,
      dependencies: ['smoke']
    },
    {
      name: 'regression',
      testMatch: /regression\/.*\.spec\.js/,
      dependencies: ['contracts']
    },
    {
      name: 'integration',
      testMatch: /integration\/.*\.spec\.js/,
      dependencies: ['regression']
    }]
});