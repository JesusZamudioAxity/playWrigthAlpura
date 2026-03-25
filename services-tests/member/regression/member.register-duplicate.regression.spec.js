import { test, expect } from '../../fixtures/api.fixture.js';
import duplicateData from '../../test-data/member/register/register-duplicate.json' assert { type: 'json' };

test('Regression - Registro falla cuando el correo ya fue utilizado', async ({ apiClient }) => {

  const response = await apiClient.post(
    '/api/identity/register-attempt',
    duplicateData.register
  );

  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body.Success).toBe(false);
  expect(body.Code).toBe(-2146233088);
  expect(body.UserError).toBe('');
  expect(body.ExceptionMessage).toBe('Este correo ya ha sido utilizado');
  expect(body.Response).toBeNull();
  expect(body.Message.Content).toBe('Este correo ya ha sido utilizado');
  expect(body.Message.Title).toBe('Details');

});