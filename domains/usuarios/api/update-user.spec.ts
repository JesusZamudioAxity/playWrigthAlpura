import { test, expect } from '@core/fixtures/usuario.fixture';
import {
  actualizarUsuario,
  obtenerUsuario
} from '@domains/usuarios/services/usuarios.services';

import { validateSchema } from '@core/contracts/schemaValidator';
import usuarioSchema from '@core/contracts/schemas/usuario.schema.json';


/**
 * ✅ Integration
 */
test('@usuarios @api @integration @regression updateUser - actualiza firstName correctamente',
  async ({ usuario }) => {
    console.log('Usuario generado por fixture:', usuario);
    const nuevoNombre = 'NombreActualizado';

    const response = await actualizarUsuario(usuario.username, {
      ...usuario,
      firstName: nuevoNombre
    });

    expect([200, 204]).toContain(response.status());

    const getResponse = await obtenerUsuario(usuario.username);
    expect(getResponse.status()).toBe(200);

    const body = await getResponse.json();
    expect(body.firstName).toBe(nuevoNombre);
});


/**
 * ✅ Contract
 */
test('@usuarios @api @contract @regression updateUser - cumple contrato posterior',
  async ({ usuario }) => {
    console.log('Usuario generado por fixture:', usuario);
    await actualizarUsuario(usuario.username, usuario);

    const getResponse = await obtenerUsuario(usuario.username);
    expect(getResponse.status()).toBe(200);

    const body = await getResponse.json();
    validateSchema(usuarioSchema, body);
});


/**
 * ❌ Negative - usuario inexistente
 
test('@usuarios @api @negative @regression updateUser - usuario inexistente', async () => {

  const response = await actualizarUsuario('usuario_fake_123', {} as any);

  expect([400, 404]).toContain(response.status());
});*/