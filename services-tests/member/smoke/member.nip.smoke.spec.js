import { test, expect } from '../../fixtures/api.fixture.js';

test('Smoke - Enviar NIP correctamente', async ({ apiClient }) => {
  const response = await apiClient.post('/api/outsider/register/sms/nip', {
      phoneNumbSMS: '5533176234',
      lada: '52',
      channel: 'web',
      message: null,
      attempts: 1
  });

  const status = response.status();
  const body = await response.json();
  expect(response.status()).toBe(200);

  console.log(body);

  expect(body.success).toBe(true);
  expect(body.code).toBe(201);
  expect(body.userError).toBe('AddPhone');
  expect(body.exceptionMessage).toBe('');
});