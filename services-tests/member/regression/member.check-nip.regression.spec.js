import { test, expect } from '../../fixtures/api.fixture.js';
import validCheckNip from '../../test-data/member/check-nip/valid.json' assert { type: 'json' };

test('Regression - Check NIP devuelve NIP válido', async ({ apiClient }) => {

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

  expect(body.success).toBe(true);
  expect(body.code).toBe(200);
  expect(body.exceptionMessage).toBe('');
  expect(typeof body.response).toBe('string');
  expect(body.response).toMatch(/^\d{4}$/);

});