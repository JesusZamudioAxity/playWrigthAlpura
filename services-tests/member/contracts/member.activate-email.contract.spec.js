
// services-tests/member/contracts/member.activate-email.contract.spec.js
import { test, expect } from '../../fixtures/api.fixture.js';
import { activateEmailSchema } from '../../schemas/member.activate-email.schema.js';
import { validateSchema } from '../../helpers/validateSchema.js';

test('Contract - Validar contrato de respuesta de activación de email', async ({ apiClient }) => {
  const response = await apiClient.get('/api/support/client/activation-code/testnuevoregistro@test.com', {
      'Content-Type': 'application/json'
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  const valid = validateSchema(activateEmailSchema, body);

  expect(valid).toBe(true);
});
