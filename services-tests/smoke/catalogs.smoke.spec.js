import { test, expect } from '../fixtures/api.fixture.js';
import { API_BASE_URL } from '../config/api.config.js';

test('Smoke - Obtener catalogs correctamente', async ({ request, authToken }) => {

  const response = await request.get(
    `${API_BASE_URL}/api/apex/catalogs`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.code).toBe(0);
  expect(Array.isArray(body.response)).toBeTruthy();
});