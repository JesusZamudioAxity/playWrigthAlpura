import { test, expect } from '../../fixtures/api.fixture.js';
import activateEmailData from '../../test-data/member/activate-email/valid.json' assert { type: 'json' };

test('Regression - Activación email devuelve códigos correctos', async ({ apiClient }) => {

  const response = await apiClient.get(
    `/api/support/client/activation-code/${activateEmailData.email}`,
    {
      'X-QA-Access-Token': 'qa-team-secretz'
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.code).toBe(200);
  expect(body.userError).toBe('');
  expect(body.exceptionMessage).toBe('');

  expect(Array.isArray(body.response)).toBe(true);
  expect(body.response.length).toBeGreaterThan(0);

  const firstValidation = body.response[0];

  expect(typeof firstValidation.id).toBe('number');
  expect(typeof firstValidation.validationCode).toBe('string');
  expect(typeof firstValidation.creationDate).toBe('string');
  expect(typeof firstValidation.updateDate).toBe('string');
  expect(firstValidation.email).toBe(activateEmailData.email);
  expect(firstValidation.channel).toBe('APP');

});