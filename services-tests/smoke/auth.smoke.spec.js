import { test, expect } from '../fixtures/api.fixture.js';

test('Smoke - Autenticación funcional', async ({ apiClient }) => {

  const response = await apiClient.get('/api/apex/catalogs');

  expect(response.status()).toBe(200);
});