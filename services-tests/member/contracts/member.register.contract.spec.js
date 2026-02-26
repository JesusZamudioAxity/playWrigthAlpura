// services-tests/member/contracts/member.register.contract.spec.js
import { test, expect } from '../../fixtures/api.fixture.js';
import { registerSchema } from '../../schemas/member.register.schema.js';
import { validateSchema } from '../../helpers/validateSchema.js';

test('Contract - Validar contrato de respuesta de registro', async ({ apiClient }) => {
  const response = await apiClient.post('/api/identity/register-attempt', {
    Email: 'testnuevoregistro@test.com',
    Password: 'a184712a824240be01cac45109027e926f730825c7a3ddd277cce1c532179462',
    ConfirmPassword: 'a184712a824240be01cac45109027e926f730825c7a3ddd277cce1c532179462',
    User: {
      Name: 'Manuel',
      LastName: 'Pineda',
      SecondLastName: 'Zamudio',
      Password: 'a184712a824240be01cac45109027e926f730825c7a3ddd277cce1c532179462',
      Email: 'testnuevoregistro@test.com',
      DateOfBirth: '1900-01-01T00:00:00',
      PhoneNumber: '5533176234',
      Lada: 14,
      Gender: 'O',
      Channel: 'APP',
      Country: 'MX',
      DoNotContactFlag: true,
      DoNotEmailFlag: true,
      UserName: 'testnuevoregistro@test.com',
      IsActiveUser: false,
      IsLogged: false
    },
    Card: null
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  const valid = validateSchema(registerSchema, body);

  expect(valid).toBe(true);
});
