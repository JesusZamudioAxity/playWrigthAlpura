// services-tests/member/integration/member.full-registration.integration.spec.js
import { test, expect } from '../../fixtures/api.fixture.js';

test('Integration - Registro completo', async ({ apiClient }) => {
  const payloads = buildRegistrationFlowPayload();

  // 1️⃣ NIP
  await generateNip(apiClient, payloads.nip);

  // 2️⃣ Check
  await checkNip(apiClient, payloads.checkNip);

  // 3️⃣ Register
  await registerAttempt(apiClient, payloads.register);

  // 4️⃣ Activar email
  await activateEmail(apiClient, payloads.email);

  // 5️⃣ Completar registro
  const completeRes = await completeRegister(apiClient, payloads.complete);

  expect(completeRes.status()).toBe(200);
});

// Función para construir los payloads necesarios para el flujo
function buildRegistrationFlowPayload() {
  return {
    nip: {
      phoneNumbSMS: '5533176234',
      lada: '52',
      channel: 'web',
      message: null,
      attempts: 1
    },
    checkNip: {
      PhoneNumber: '525533176234'
    },
    register: {
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
    },
    email: {
      email: 'testnuevoregistro@test.com'
    },
    complete: {
      Email: 'testnuevoregistro@test.com',
      Password: 'a184712a824240be01cac45109027e926f730825c7a3ddd277cce1c532179462'
    }
  };
}

// Funciones auxiliares para cada paso del flujo
async function generateNip(apiClient, payload) {
  const response = await apiClient.post('/api/outsider/register/sms/nip', payload);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.success).toBe(true);
}

async function checkNip(apiClient, payload) {
  const response = await apiClient.post('/api/support/recovery/nip', payload);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.success).toBe(true);
}

async function registerAttempt(apiClient, payload) {
  const response = await apiClient.post('/api/identity/register-attempt', payload);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.success).toBe(true);
}

async function activateEmail(apiClient, payload) {
  const response = await apiClient.get(`/api/support/client/activation-code/${payload.email}`, {
    'X-QA-Access-Token': 'qa-team-secretz'
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.success).toBe(true);
}

async function completeRegister(apiClient, payload) {
  const response = await apiClient.post('/api/identity/complete-registration', payload);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.success).toBe(true);
  return response;
}
