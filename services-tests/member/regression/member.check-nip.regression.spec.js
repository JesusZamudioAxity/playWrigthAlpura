
// services-tests/member/regression/member.check-nip.regression.spec.js
import { test, expect } from '../../fixtures/api.fixture.js';

test('Regression - Verificar NIP con diferentes escenarios', async ({ apiClient }) => {
  const scenarios = [
    { PhoneNumber: '525533176234' },
    { PhoneNumber: '525533176235' },
    // Agrega más escenarios según sea necesario
  ];

  for (const scenario of scenarios) {
    const response = await apiClient.post('/api/support/recovery/nip', {
      data: scenario,
      headers: {
        'X-QA-Confirmed-Number': 'true',
        'X-QA-Access-Token': 'qa-team-secretz'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.code).toBe(200);
    expect(typeof body.response).toBe('string');
    expect(body.response).toMatch(/^\d{4}$/); // Verifica que sea un NIP de 4 dígitos
  }
});
