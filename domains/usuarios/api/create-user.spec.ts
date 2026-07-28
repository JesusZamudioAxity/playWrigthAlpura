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


/**
 * ❌ NEGATIVE
 
test('@usuarios @api @negative @regression createUser - sin username', async () => {

  const { username, ...usuarioSinUsername } = crearUsuarioValido();

  const response = await crearUsuario(usuarioSinUsername as any);

  expect([400, 405]).toContain(response.status());
});*/


/* con after

import { test, expect } from '@playwright/test';
import {
  crearUsuario,
  obtenerUsuario,
  eliminarUsuario
} from '@domains/usuarios/services/usuarios.services';

import { crearUsuarioValido } from '@domains/usuarios/test-data/usuarios.data';
import { validateSchema } from '@core/contracts/schemaValidator';
import usuarioSchema from '@core/contracts/schemas/usuario.schema.json';

let usuarioCreado: string | null = null;

test.afterEach(async () => {
  if (usuarioCreado) {
    await eliminarUsuario(usuarioCreado);
    usuarioCreado = null;
  }
});


/**
 * ✅ SMOKE + INTEGRATION
 *
test('@usuarios @api @smoke @integration createUser - exitoso', async () => {

  const usuario = crearUsuarioValido();
  usuarioCreado = usuario.username;

  const response = await crearUsuario(usuario);
  expect(response.status()).toBe(200);

  const getResponse = await obtenerUsuario(usuario.username);
  expect(getResponse.status()).toBe(200);

  const body = await getResponse.json();
  expect(body.username).toBe(usuario.username);
});


/**
 * ✅ CONTRACT
 *
test('@usuarios @api @contract @regression createUser - cumple contrato', async () => {

  const usuario = crearUsuarioValido();
  usuarioCreado = usuario.username;

  await crearUsuario(usuario);

  const getResponse = await obtenerUsuario(usuario.username);
  expect(getResponse.status()).toBe(200);

  const body = await getResponse.json();
  validateSchema(usuarioSchema, body);
});


/**
 * ❌ NEGATIVE - sin username
 *
test('@usuarios @api @negative @regression createUser - sin username', async () => {

  const { username, ...usuarioSinUsername } = crearUsuarioValido();

  const response = await crearUsuario(usuarioSinUsername as any);

  expect([400, 405]).toContain(response.status());
});


/**
 * ❌ CONTRACT-NEGATIVE - tipo inválido
 *
test('@usuarios @api @contract-negative @regression createUser - tipo inválido', async () => {

  const usuario = crearUsuarioValido();
  usuario.userStatus = "activo" as any;

  usuarioCreado = usuario.username;

  await crearUsuario(usuario);

  const getResponse = await obtenerUsuario(usuario.username);
  expect(getResponse.status()).toBe(200);

  const body = await getResponse.json();

  await expect(() => {
    validateSchema(usuarioSchema, body);
  }).toThrow(/userStatus/);
});*/

/*import { test, expect } from '@playwright/test';
import { crearUsuario,  obtenerUsuario } from '@domains/usuarios/services/usuarios.services';
import { usuarioValido } from '@domains/usuarios/test-data/usuarios.data';

test('@usuariosCrear @api @smoke @integration Crear usuario exitosamente', async () => {
    const response = await crearUsuario(usuarioValido);
    console.log(await response.text());

  // ✅ Validar status HTTP
  expect(response.status()).toBe(200);

  const body = await response.json();

  // ✅ Validar estructura respuesta
  expect(body.code).toBe(200);
  expect(body.message).toBeDefined();


    // Validar creación
  const getResponse = await obtenerUsuario(usuarioValido.username);
  expect(getResponse.status()).toBe(200);

  const userBody = await getResponse.json();
  expect(userBody.username).toBe(usuarioValido.username);
});*/