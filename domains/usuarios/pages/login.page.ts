import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async llenarUsuario(username: string) {
    await this.page.locator('input[name="username"]').fill(username);
  }

  async llenarPassword(password: string) {
    await this.page.locator('input[name="password"]').fill(password);
  }

  async clickLogin() {
    await this.page.locator('button[type="submit"]').click();
  }

  async login(username: string, password: string) {
    await this.llenarUsuario(username);
    await this.llenarPassword(password);
    await this.clickLogin();
  }

  async validarLoginExitoso() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async validarMensajeError() {
    await expect(
      this.page.locator('.oxd-alert-content-text')
    ).toBeVisible();
  }
}