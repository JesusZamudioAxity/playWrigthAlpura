import { test, expect } from '../../fixtures/api.fixture.js';
import validNip from '../../test-data/member/nip/valid.json' assert { type: 'json' };
import alreadyRegistered from '../../test-data/member/nip/already-registered.json' assert { type: 'json' };

test('Smoke - Enviar NIP correctamente', async ({ apiClient }) => {
  const response = await apiClient.post(
    '/api/outsider/register/sms/nip',
    validNip
  );

  //const status = response.status();
  // expect(status).toBe(200);
  const body = await response.json();
  expect(response.status()).toBe(200);

  //console.log(body);
  expect(body.success).toBe(true);
  expect(body.code).toBe(201);
  expect(body.userError).toBe('AddPhone');
  expect(body.exceptionMessage).toBe('');
});


test('Regression - NIP falla cuando el número ya está registrado', async ({ apiClient }) => {

  const response = await apiClient.post('/api/outsider/register/sms/nip', alreadyRegistered);
  
  const status = response.status();
  const raw = await response.text();
  //console.log('Status:', status);
  //console.log('Raw:', raw);

  expect(status).toBe(400);
  const body = JSON.parse(raw);

  expect(body.Success).toBe(false);
  expect(body.Response).toBeNull();
  expect(body.ExceptionMessage).toContain('ya está asociado');
  expect(body.Code).toBeLessThan(0);
});