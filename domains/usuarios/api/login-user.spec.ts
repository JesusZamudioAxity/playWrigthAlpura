import { test, expect } from '@core/fixtures/usuario.fixture';
import { loginUsuario } from '@domains/usuarios/services/usuarios.services';


/**
 * ✅ Smoke
 */
test('@usuarios @api @smoke @integration loginUser - login válido',
  async ({ usuario }) => {
     console.log('Usuario generado por fixture:', usuario);
    const response = await loginUsuario(usuario.username, usuario.password);

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(typeof body).toBe('string');

    expect(response.headers()['x-rate-limit']).toBeDefined();
    expect(response.headers()['x-expires-after']).toBeDefined();
});


/**
 * ❌ Negative
 
test('@usuarios @api @negative @regression loginUser - password incorrecto',
  async ({ usuario }) => {
    console.log('Usuario generado por fixture:', usuario);
    const response = await loginUsuario(usuario.username, 'passwordIncorrecto');

    expect([400, 401]).toContain(response.status());
});*/