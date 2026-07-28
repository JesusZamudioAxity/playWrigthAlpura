import { test, expect } from '@playwright/test';
import { logoutUsuario } from '@domains/usuarios/services/usuarios.services';


test('@usuarios @api @smoke logoutUser - exitoso', async () => {

  const response = await logoutUsuario();

  expect([200, 204]).toContain(response.status());
});