import { test, expect } from '../../fixtures/api.fixture.js';
import { nipSchema } from '../../schemas/member.nip.schema.js';
import { validateSchema } from '../../helpers/validateSchema.js';
import validNip from '../../test-data/member/nip/valid.json' assert { type: 'json' };

test('Contract - Validar contrato de respuesta de NIP', async ({ apiClient }) => {

const response = await apiClient.post(
    '/api/outsider/register/sms/nip',
    validNip
  );

  const status = response.status();
  //const headers = response.headers();
  const raw = await response.text();

  //console.log('Status:', status);
  //console.log('Headers:', headers);
  //console.log('Raw response:', raw);

  expect(status).toBe(200);

  const body = JSON.parse(raw);
  const valid = validateSchema(nipSchema, body);
  expect(valid).toBe(true);
});