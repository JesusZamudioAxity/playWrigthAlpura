import { test, expect } from '../../fixtures/api.fixture.js';
import { checkNipSchema } from '../../schemas/member.check-nip.schema.js';
import { validateSchema } from '../../helpers/validateSchema.js';
import validCheckNip from '../../test-data/member/check-nip/valid.json' assert { type: 'json' };

test('Contract - Check NIP estructura válida', async ({ apiClient }) => {

  const response = await apiClient.post(
    '/api/support/recovery/nip',
    validCheckNip,
    {
      'X-QA-Confirmed-Number': 'true',
      'X-QA-Access-Token': 'qa-team-secretz'
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  const valid = validateSchema(checkNipSchema, body);
  expect(valid).toBe(true);

});