import { test, expect } from '../../fixtures/api.fixture.js';
import activateEmailData from '../../test-data/member/activate-email/valid.json' assert { type: 'json' };

test('Smoke - Activación email responde correctamente', async ({ apiClient }) => {

  const response = await apiClient.get(
    `/api/support/client/activation-code/${activateEmailData.email}`,
    {
      'X-QA-Access-Token': 'qa-team-secretz'
    }
  );

  expect(response.status()).toBe(200);

});