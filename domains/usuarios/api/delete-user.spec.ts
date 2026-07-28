import { test, expect } from '@core/fixtures/usuario.fixture';
import {
  eliminarUsuario,
  obtenerUsuario
} from '@domains/usuarios/services/usuarios.services';


/**
 * ✅ Integration
 */
test('@usuarios @api @integration @regression deleteUser - elimina correctamente',
  async ({ usuario }) => {
    console.log('Usuario generado por fixture:', usuario);
    const response = await eliminarUsuario(usuario.username);

    expect([200, 204]).toContain(response.status());

    const getResponse = await obtenerUsuario(usuario.username);
    expect(getResponse.status()).toBe(404);
});


/**
 * ❌ Negative
 */
test('@usuarios @api @negative @regression deleteUser - usuario inexistente', async () => {

  const response = await eliminarUsuario('usuario_no_existe_456');

  expect([400, 404]).toContain(response.status());
});