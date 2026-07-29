import { test, expect } from '@core/fixtures/usuario.fixture';
import {
  crearUsuario,
  obtenerUsuario
} from '@domains/usuarios/services/usuarios.services';

import { crearUsuarioValido } from '@domains/usuarios/test-data/usuarios.data';
import { validateSchema } from '@core/contracts/schemaValidator';
import usuarioSchema from '@core/contracts/schemas/usuario.schema.json';


/**
 * ✅ SMOKE + INTEGRATION
 */
test('@usuarios @api @smoke @integration createUser - exitoso', async () => {

  const usuario = crearUsuarioValido();

  const response = await crearUsuario(usuario);
  expect(response.status()).toBe(200);

  const getResponse = await obtenerUsuario(usuario.username);
  expect(getResponse.status()).toBe(200);

  const body = await getResponse.json();
  expect(body.username).toBe(usuario.username);
});


/**
 * ✅ CONTRACT
 */
test('@usuarios @api @contract @regression createUser - cumple contrato', async ({ usuario }) => {

  const response = await obtenerUsuario(usuario.username);
  expect(response.status()).toBe(200);

  const body = await response.json();
  validateSchema(usuarioSchema, body);
});


test('@usuarios @api @contract-negative @regression getUserByName - fallo de contrato',
  async ({ usuario }) => {

    const response = await obtenerUsuario(usuario.username);
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Simular cambio inesperado del backend
    delete body.email;

     validateSchema(usuarioSchema, body);
  /*  await expect(() => {
      validateSchema(usuarioSchema, body);
    }).toThrow(/email/);*/
});

/**
 * ❌ NEGATIVE
 
test('@usuarios @api @negative @regression createUser - sin username', async () => {

  const { username, ...usuarioSinUsername } = crearUsuarioValido();

  const response = await crearUsuario(usuarioSinUsername as any);

  expect([400, 405]).toContain(response.status());
});*/
