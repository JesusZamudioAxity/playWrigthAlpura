import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('@usuarios @ui @smoke Login exitoso', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');
  await loginPage.validarLoginExitoso();
});


test('@usuarios @ui @regression Login inválido', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'passwordIncorrecto');
  await loginPage.validarMensajeError();
});