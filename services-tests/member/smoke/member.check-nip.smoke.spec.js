import { test, expect } from '../../fixtures/api.fixture.js';
import validCheckNip from '../../test-data/member/check-nip/valid.json' assert { type: 'json' };

test('Smoke - Check NIP responde correctamente', async ({ apiClient }) => {

  const response = await apiClient.post(
    '/api/support/recovery/nip',
    validCheckNip,
    {
      'X-QA-Confirmed-Number': 'true',
      'X-QA-Access-Token': 'qa-team-secretz'
    }
  );

  expect(response.status()).toBe(200);

});