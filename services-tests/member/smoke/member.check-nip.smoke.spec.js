import { test, expect } from '../../fixtures/api.fixture.js';

test('Smoke - Verificar NIP correctamente', async ({ apiClient }) => {
  const response = await apiClient.post('/api/support/recovery/nip', {
    PhoneNumber: '525664687979'
  }, {
    'X-QA-Confirmed-Number': 'true',
    'X-QA-Access-Token': 'qa-team-secretz'
  });

  const status = response.status();
  const body = await response.json();
  //console.log('Response Body:', body);

  expect(status).toBe(200);
});




