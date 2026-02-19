import { test, expect } from '../fixtures/api.fixture.js';

test('Smoke - Obtener token válido', async ({ authToken }) => {
  expect(authToken).toBeDefined();
  expect(typeof authToken).toBe('string');
});