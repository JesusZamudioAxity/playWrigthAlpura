// services-tests/member/smoke/member.register.smoke.spec.js
import { test, expect } from '../../fixtures/api.fixture.js';

test('Smoke - Registro funcional', async ({ apiClient }) => {
  const response = await apiClient.post('/api/identity/register-attempt', {
    Email: 'testnuevoregistro@test.com',
    Password: 'a184712a824240be01cac45109027e926f730825c7a3ddd277cce1c532179462',
    ConfirmPassword: 'a184712a824240be01cac45109027e926f730825c7a3ddd277cce1c532179462',
    User: {
      Name: 'Manuel',
      LastName: 'Pineda',
      SecondLastName: 'Zamudio',
      Password: 'a184712a824240be01cac45109027e926f730825c7a3ddd277cce1c532179462',
      PasswordHash: null,
      Email: 'testnuevoregistro@test.com',
      DateOfBirth: '1900-01-01T00:00:00',
      ZipCode: '',
      State: null,
      City: null,
      PhoneNumber: '5533176234',
      PhoneLada: 0,
      Lada: 14,
      Gender: 'O',
      Channel: 'APP',
      ReferredByNumber: '',
      Status: '',
      MemberNumber: '',
      Country: 'MX',
      LoyProgramName: '',
      PartyId: 0,
      PartyNumber: '',
      TierName: '',
      DoNotContactFlag: true,
      DoNotEmailFlag: true,
      UserName: 'testnuevoregistro@test.com',
      MemberClassCode: null,
      CANCELATIONCAUSE: null,
      USERTOKEN: null,
      IsActiveUser: false,
      IsLogged: false,
      DeviceId: null,
      Card: null,
      Estafeta: null,
      SubtipoMiembro: null,
      Corporation_c: null,
      EmpleadorMembresiaCorp_c: null,
      MercadoPagoCostumerId_c: null
    },
    Card: null
  });

  const status = response.status();
  const body = await response.json();
  console.log('Response Body:', body);

  expect(response.status()).toBe(200);

  // Validaciones básicas
  expect(body.success).toBe(true);
  expect(body.code).toBe(200);
  expect(body.userError).toBe('');
  expect(body.exceptionMessage).toBe('');
  expect(body.response).toBe('Código enviado');
  expect(body.message).toBeNull();
});
