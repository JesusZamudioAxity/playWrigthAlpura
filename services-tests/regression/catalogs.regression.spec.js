import { test, expect } from '../fixtures/api.fixture.js';
import { API_BASE_URL } from '../config/api.config';

test('Regression - Validar estructura interna de catalogs', async ({ request, authToken }) => {

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

  expect(body.response.length).toBeGreaterThan(0);

  const item = body.response[0];

  expect(typeof item.id).toBe('number');
  expect(typeof item.channel_id).toBe('number');
  expect(typeof item.channel).toBe('string');
  expect(typeof item.type).toBe('string');
  expect(typeof item.exposed).toBe('string');
});