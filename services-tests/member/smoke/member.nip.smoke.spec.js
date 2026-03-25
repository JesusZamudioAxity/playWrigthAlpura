import { test, expect } from '../../fixtures/api.fixture.js';
import validNip from '../../test-data/member/nip/valid.json' assert { type: 'json' };

test('Smoke - Enviar NIP responde correctamente', async ({ apiClient }) => {

  const response = await apiClient.post(
    '/api/outsider/register/sms/nip',
    validNip
  );

  expect(response.status()).toBe(200);
});

