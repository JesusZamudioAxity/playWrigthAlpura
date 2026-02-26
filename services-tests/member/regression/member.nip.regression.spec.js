import { test, expect } from '../../fixtures/api.fixture.js';

test('Regression - NIP falla cuando el número ya está registrado', async ({ apiClient }) => {

  const response = await apiClient.post('/api/outsider/register/sms/nip', {
      phoneNumbSMS: '5664687979',
      lada: '52',
      channel: 'web',
      message: null,
      attempts: 1
  });
  
  const status = response.status();
  const raw = await response.text();

  console.log('Status:', status);
  console.log('Raw:', raw);

  expect(status).toBe(400);

  const body = JSON.parse(raw);

  expect(body.Success).toBe(false);
  expect(body.Response).toBeNull();
  expect(body.ExceptionMessage).toContain('ya está asociado');
  expect(body.Code).toBeLessThan(0);
});