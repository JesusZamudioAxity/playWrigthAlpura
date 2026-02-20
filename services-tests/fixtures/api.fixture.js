import { test as base } from '@playwright/test';
import { getCachedToken } from '../helpers/auth.manager.js';
import { ApiClient } from '../core/api.client.js';

export const test = base.extend({
  apiClient: async ({ request }, use) => {

    // request YA tiene baseURL aplicado por Playwright
    const token = await getCachedToken(request);

    const client = new ApiClient(request, token);

    await use(client);
  }
});

export const expect = test.expect;