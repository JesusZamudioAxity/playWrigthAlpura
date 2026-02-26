import { test, expect } from '../../fixtures/api.fixture.js';

test('Smoke - Obtener catalogs correctamente', async ({ apiClient }) => {

  const response = await apiClient.get('/api/apex/catalogs');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
});