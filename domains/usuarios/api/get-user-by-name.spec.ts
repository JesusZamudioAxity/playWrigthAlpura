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

/* after
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
 * ✅ SMOKE + CONTRACT
 *
test('@usuarios @api @smoke @contract getUserByName - 200 OK', async () => {

  const usuario = crearUsuarioValido();
  usuarioCreado = usuario.username;

  await crearUsuario(usuario);

  const response = await obtenerUsuario(usuario.username);

  await test.step('Validar status 200', async () => {
    expect(response.status()).toBe(200);
  });

  const body = await response.json();

  await test.step('Validar contrato', async () => {
    validateSchema(usuarioSchema, body);
  });

  await test.step('Validar username correcto', async () => {
    expect(body.username).toBe(usuario.username);
  });
});


/**
 * ❌ NEGATIVE - usuario inexistente
 *
test('@usuarios @api @negative @regression getUserByName - usuario inexistente', async () => {

  const response = await obtenerUsuario('usuario_que_no_existe_123');

  expect(response.status()).toBe(404);
});


/**
 * ❌ CONTRACT-NEGATIVE
 *
test('@usuarios @api @contract-negative @regression getUserByName - fallo de contrato', async () => {

  const usuario = crearUsuarioValido();
  usuarioCreado = usuario.username;

  await crearUsuario(usuario);

  const response = await obtenerUsuario(usuario.username);
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Simular cambio inesperado
  delete body.email;

  await expect(() => {
    validateSchema(usuarioSchema, body);
  }).toThrow(/email/);
});*/


/*import { test, expect } from '@playwright/test';
import { obtenerUsuario } from '@domains/usuarios/services/usuarios.services';
import { usuarioValido } from '@domains/usuarios/test-data/usuarios.data';
import { validateSchema } from '@core/contracts/schemaValidator';
import usuarioSchema from '@core/contracts/schemas/usuario.schema.json';

test('@usuarios @api @contract @regression Obtener usuario por username', async () => {

   const { username } = usuarioValido;
  const response = await obtenerUsuario(username);
  //const username = usuarioValido.username;
  //const response = await obtenerUsuario(username);

  await test.step('Validar status HTTP 200', async () => {
    expect(response.status()).toBe(200);
  });

  const body = await response.json();

  await test.step('Validar contrato usuario.schema.json', async () => {
    validateSchema(usuarioSchema, body);
  });

  await test.step('Validación funcional username', async () => {
    expect(body.username).toBe(username);
  });
});

test('@usuarios @api @contract-negative Validar fallo de contrato', async () => {

  const { username } = usuarioValido;

  const response = await obtenerUsuario(username);
  const body = await response.json();

  // Simular cambio inesperado del backend
  delete body.email;

  validateSchema(usuarioSchema, body); // 🚨 aquí debe explotar
 /* await expect(() => {
    validateSchema(usuarioSchema, body);
  }).toThrow();
});

/*import { test, expect } from '@playwright/test';

test('@usuarios @api @regression Obtener usuario directo', async ({ request }) => {

  const baseURL = 'https://petstore.swagger.io/v2';
  const username = 'Manuel';

  const response = await request.get(`${baseURL}/user/${username}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log('STATUS:', response.status());
  console.log('BODY RAW:', await response.text());

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.username).toBe(username);
});*/