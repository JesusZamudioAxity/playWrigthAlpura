import { test, expect } from '../../fixtures/api.fixture.js';

test('Regression - Validar estructura interna de catalogs', async ({ apiClient }) => {

  const response = await apiClient.get('/api/apex/catalogs');

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