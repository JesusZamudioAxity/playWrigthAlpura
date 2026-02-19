import { test, expect } from '../fixtures/api.fixture.js';
import { API_BASE_URL } from '../config/api.config.js';
import { catalogsSchema } from '../schemas/catalogs.schema.js';
import Ajv from 'ajv';

const ajv = new Ajv();

test('Contract - Validar contrato base de catalogs', async ({ request, authToken }) => {

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

  const validate = ajv.compile(catalogsSchema);
  const valid = validate(body);

  if (!valid) {
    console.log(validate.errors);
  }

  expect(valid).toBe(true);
});