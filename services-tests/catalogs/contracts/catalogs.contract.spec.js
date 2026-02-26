import { test, expect } from '../../fixtures/api.fixture.js';
import { catalogsSchema } from '../../schemas/catalogs.schema.js';
import { validateSchema } from '../../helpers/validateSchema.js';

test('Contract - Validar contrato base de catalogs', async ({ apiClient }) => {

  const response = await apiClient.get('/api/apex/catalogs');

  expect(response.status()).toBe(200);

  const body = await response.json();

  const valid = validateSchema(catalogsSchema, body);

  expect(valid).toBe(true);
});