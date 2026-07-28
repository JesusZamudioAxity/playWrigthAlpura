import { test as base } from '@playwright/test';
import { getCachedToken } from '../api/auth.manager.js';
import { ApiClient } from '../api/api.client.js';

export const test = base.extend({
  apiClient: async ({ request }, use) => {

    // request YA tiene baseURL aplicado por Playwright
    const token = await getCachedToken(request);
   // console.log('Using Token:', token); // Imprimir el token para verificar
    

    const client = new ApiClient(request, token);

    await use(client);
  }
});

export const expect = test.expect;