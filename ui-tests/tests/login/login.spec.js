// ui-tests/tests/login/login.spec.js
const { test, expect } = require('@playwright/test');

test('User can login successfully', async ({ page }) => {
  await page.goto('/');
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
