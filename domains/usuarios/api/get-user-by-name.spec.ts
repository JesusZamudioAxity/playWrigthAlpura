import { test, expect } from '@core/fixtures/usuario.fixture';
import { obtenerUsuario } from '@domains/usuarios/services/usuarios.services';
import { validateSchema } from '@core/contracts/schemaValidator';
import usuarioSchema from '@core/contracts/schemas/usuario.schema.json';


/**
 * ✅ SMOKE + CONTRACT
 */
test('@usuarios @api @smoke @contract getUserByName - 200 OK', async ({ usuario }) => {
  console.log('Usuario generado por fixture:', usuario); 
  const response = await obtenerUsuario(usuario.username);

  expect(response.status()).toBe(200);

  const body = await response.json();

  validateSchema(usuarioSchema, body);
  expect(body.username).toBe(usuario.username);
});


/**
 * ❌ NEGATIVE
 */
test('@usuarios @api @negative @regression getUserByName - usuario inexistente', async () => {
  const response = await obtenerUsuario('usuario_que_no_existe_123');

  expect(response.status()).toBe(404);
});
