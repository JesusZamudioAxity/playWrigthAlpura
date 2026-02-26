// services-tests/member/integration/member.full-registration.integration.spec.js
import { test, expect } from '../../fixtures/api.fixture.js';
import { generateNip, checkNip } from '../../helpers/member.flow.js';

test('Full Flow - Registro completo con activación de email', async ({ apiClient }) => {
  const payloads = buildFullFlowPayload();

  try {
    // 1️⃣ Generar NIP
    await generateNip(apiClient, payloads.nip, expect);

    // 2️⃣ Verificar NIP
    await checkNip(apiClient, payloads.checkNip, expect);

    // 3️⃣ Intentar Registro
    await registerAttempt(apiClient, payloads.register, expect);

    // 4️⃣ Activar Email
    await activateEmail(apiClient, payloads.activateEmail, expect);

    console.log('Flujo integral completado exitosamente.');
  } catch (error) {
    console.error('Error during full flow:', error);
    throw error;
  }
});

// Función para construir los payloads necesarios para el flujo
function buildFullFlowPayload() {
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
    activateEmail: {
      email: 'testnuevoregistro@test.com'
    }
  };
}

// Funciones auxiliares para cada paso del flujo
async function registerAttempt(apiClient, payload, expect) {
  try {
    const response = await apiClient.post('/api/identity/register-attempt', payload);
    if (response.status() !== 200) {
      console.error('Failed to register attempt:', await response.text());
      throw new Error('Failed to register attempt');
    }
    const body = await response.json();
    console.log('Register Attempt Response Body:', body);
    expect(body.success).toBe(true);
  } catch (error) {
    console.error('Error during register attempt:', error);
    throw error;
  }
}

async function activateEmail(apiClient, payload, expect) {
  try {
    const response = await apiClient.get(`/api/support/client/activation-code/${payload.email}`, {
      'X-QA-Access-Token': 'qa-team-secretz'
    });
    if (response.status() !== 200) {
      console.error('Failed to activate email:', await response.text());
      throw new Error('Failed to activate email');
    }
    const body = await response.json();
    console.log('Activate Email Response Body:', body);

    // Validaciones básicas
    expect(body.success).toBe(true);
    expect(body.code).toBe(200);
    expect(body.userError).toBe('');
    expect(body.exceptionMessage).toBe('');

    // Validar que la respuesta contenga un array de códigos de validación
    expect(Array.isArray(body.response)).toBe(true);
    expect(body.response.length).toBeGreaterThan(0);

    // Validar el primer elemento del array
    const firstValidation = body.response[0];
    expect(typeof firstValidation.id).toBe('number');
    expect(typeof firstValidation.validationCode).toBe('string');
    expect(typeof firstValidation.creationDate).toBe('string');
    expect(typeof firstValidation.updateDate).toBe('string');
    expect(firstValidation.email).toBe(payload.email);
    expect(firstValidation.channel).toBe('APP');
  } catch (error) {
    console.error('Error during email activation:', error);
    throw error;
  }
}
