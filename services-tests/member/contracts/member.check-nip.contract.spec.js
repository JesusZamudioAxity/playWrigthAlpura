
// services-tests/member/contracts/member.check-nip.contract.spec.js
import { test, expect } from '../../fixtures/api.fixture.js';
import { checkNipSchema } from '../../schemas/member.check-nip.schema.js';
import { validateSchema } from '../../helpers/validateSchema.js';

test('Contract - Validar contrato de respuesta de Check NIP', async ({ apiClient }) => {
  const response = await apiClient.post('/api/support/recovery/nip', {
    data: {
      PhoneNumber: '525533176234'
    },
    headers: {
      'X-QA-Confirmed-Number': 'true',
      'X-QA-Access-Token': 'qa-team-secretz'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  const valid = validateSchema(checkNipSchema, body);

  expect(valid).toBe(true);
});
