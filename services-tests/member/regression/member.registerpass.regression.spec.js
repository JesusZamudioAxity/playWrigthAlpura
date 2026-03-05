// services-tests/member/regression/register.valid.spec.js
import { test, expect } from '../../fixtures/api.fixture.js';
import { generateNip, checkNip } from '../../helpers/member.flow.js';

test('Register - válido', async ({ apiClient }) => {
  const payloads = buildRegistrationFlowPayload();

  try {
    // 1️⃣ Generar NIP
    await generateNip(apiClient, payloads.nip, expect);

    // 2️⃣ Verificar NIP
    await checkNip(apiClient, payloads.checkNip, expect);

    // 3️⃣ Intentar Registro
    const response = await registerAttempt(apiClient, payloads.register, expect, 200);

    // Validar respuesta de registro
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log('Response Body:', body);

    // Validaciones adicionales
    expect(body.success).toBe(true);
    expect(body.code).toBe(200);
    expect(body.userError).toBe('');
    expect(body.exceptionMessage).toBe('');
    expect(body.response).toBe('Código enviado');
    expect(body.message).toBeNull();
  } catch (error) {
    console.error('Error during registration flow:', error);
    throw error;
  }
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
    }
  };
}

async function registerAttempt(apiClient, payload, expect, expectedStatus) {
  try {
    const response = await apiClient.post('/api/identity/register-attempt', payload);
    if (response.status() !== expectedStatus) {
      console.error('Failed to register attempt:', await response.text());
      throw new Error('Failed to register attempt');
    }
    const body = await response.json();
    console.log('Register Attempt Response Body:', body);
    expect(body.success).toBe(expectedStatus === 200);
    return response;
  } catch (error) {
    console.error('Error during register attempt:', error);
    throw error;
  }
}
