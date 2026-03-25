import { test, expect } from '../../fixtures/api.fixture.js';
import flowData from '../../test-data/member/register/register-valid.json' assert { type: 'json' };

test('Integration - Registro válido completo', async ({ apiClient }) => {

  // 1️⃣ Generar NIP
    const nipResponse = await apiClient.post(
        '/api/outsider/register/sms/nip',
        flowData.nip
    );

   // console.log('NIP Status:', nipResponse.status());
    const nipRaw = await nipResponse.text();
   // console.log('NIP Raw:', nipRaw);

    expect(nipResponse.status()).toBe(200);

    const nipBody = JSON.parse(nipRaw);
    expect(nipBody.success).toBe(true);

    // 2️⃣ Check NIP
    const checkResponse = await apiClient.post(
        '/api/support/recovery/nip',
        flowData.checkNip,
        {
            'X-QA-Confirmed-Number': 'true',
            'X-QA-Access-Token': 'qa-team-secretz'
    });

    //console.log('Check Status:', checkResponse.status());
    const checkRaw = await checkResponse.text();
   // console.log('Check Raw:', checkRaw);

    expect(checkResponse.status()).toBe(200);

    const checkBody = JSON.parse(checkRaw);
    expect(checkBody.success).toBe(true);

  // 3️⃣ Registro
  const registerResponse = await apiClient.post(
    '/api/identity/register-attempt',
    flowData.register
  );

  expect(registerResponse.status()).toBe(200);

  const registerBody = await registerResponse.json();
  //console.log('REGISTER BODY:\n', JSON.stringify(registerBody, null, 2));
  expect(registerBody.success).toBe(true);
  expect(registerBody.code).toBe(200);
  expect(registerBody.userError).toBe('');
  expect(registerBody.exceptionMessage).toBe('');
  expect(registerBody.response).toBe('Código enviado');
  expect(registerBody.message).toBeNull();

});