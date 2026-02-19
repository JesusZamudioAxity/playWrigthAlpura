import { test as base } from '@playwright/test';
import { getCachedToken } from '../helpers/auth.manager.js';

export const test = base.extend({
  authToken: async ({ request }, use) => {
    const token = await getCachedToken(request);
    await use(token);
  }
});

export const expect = test.expect;