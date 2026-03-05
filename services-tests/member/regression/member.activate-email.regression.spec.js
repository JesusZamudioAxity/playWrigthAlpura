// services-tests/member/smoke/member.activate-email.smoke.spec.js
import { test, expect } from '../../fixtures/api.fixture.js';

test('Smoke - Activar email correctamente', async ({ apiClient }) => {
  const response = await apiClient.get('/api/support/client/activation-code/testnuevoregistro@test.com', {
      'X-QA-Access-Token': 'qa-team-secretz'
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  //console.log(body);

  // Validaciones básicas
  expect(body.success).toBe(true);
  expect(body.code).toBe(200);
  expect(body.userError).toBe('');
  expect(body.exceptionMessage).toBe('');

  // Validar que la respuesta contenga un array de códigos de validación
  expect(Array.isArray(body.response)).toBe(true);
  expect(body.response.length).toBeGreaterThan(0);

  // Validar el primer elemento del array
  const firstValidation = body.response[0];
  expect(typeof firstValidation.id).toBe('number');
  expect(typeof firstValidation.validationCode).toBe('string');
  expect(typeof firstValidation.creationDate).toBe('string');
  expect(typeof firstValidation.updateDate).toBe('string');
  expect(firstValidation.email).toBe('testnuevoregistro@test.com');
  expect(firstValidation.channel).toBe('APP');
});
