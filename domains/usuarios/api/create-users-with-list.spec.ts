import { test, expect } from '@playwright/test';
import {
  crearUsuariosConLista,
  obtenerUsuario,
  eliminarUsuario
} from '@domains/usuarios/services/usuarios.services';

import { crearUsuarioValido } from '@domains/usuarios/test-data/usuarios.data';
import { validateSchema } from '@core/contracts/schemaValidator';
import usuarioSchema from '@core/contracts/schemas/usuario.schema.json';


test('@usuarios @api @integration @regression createUsersWithListInput - crea múltiples usuarios',
  async () => {

    const usuarios = [crearUsuarioValido(), crearUsuarioValido()];
     console.log('Usuarios generados:\n', JSON.stringify(usuarios, null, 2));

    const response = await crearUsuariosConLista(usuarios);
    expect(response.status()).toBe(200);

    for (const user of usuarios) {
      const getResponse = await obtenerUsuario(user.username);
      expect(getResponse.status()).toBe(200);

      const body = await getResponse.json();
      validateSchema(usuarioSchema, body);

      await eliminarUsuario(user.username);
    }
});