import { test, expect } from '../../fixtures/api.fixture.js';
import { activateEmailSchema } from '../../schemas/member.activate-email.schema.js';
import { validateSchema } from '../../helpers/validateSchema.js';
import activateEmailData from '../../test-data/member/activate-email/valid.json' assert { type: 'json' };

test('Contract - Activación email estructura válida', async ({ apiClient }) => {

  const response = await apiClient.get(
    `/api/support/client/activation-code/${activateEmailData.email}`,
    {
      'X-QA-Access-Token': 'qa-team-secretz'
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(validateSchema(activateEmailSchema, body)).toBe(true);

});