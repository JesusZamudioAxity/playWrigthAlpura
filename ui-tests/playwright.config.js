// ui-tests/playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    // other Playwright configurations
  },
});
