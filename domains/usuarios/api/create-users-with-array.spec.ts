import { test, expect } from '@playwright/test';
import {
  crearUsuariosConArray,
  obtenerUsuario,
  eliminarUsuario
} from '@domains/usuarios/services/usuarios.services';

import { crearUsuarioValido } from '@domains/usuarios/test-data/usuarios.data';


test('@usuarios @api @integration @regression createUsersWithArrayInput - crea múltiples usuarios',
  async () => {

    const usuarios = [crearUsuarioValido(), crearUsuarioValido()];
    console.log('Usuarios generados:\n', JSON.stringify(usuarios, null, 2));

    const response = await crearUsuariosConArray(usuarios);
    expect(response.status()).toBe(200);

    for (const user of usuarios) {
      const getResponse = await obtenerUsuario(user.username);
      expect(getResponse.status()).toBe(200);

      await eliminarUsuario(user.username);
    }
});