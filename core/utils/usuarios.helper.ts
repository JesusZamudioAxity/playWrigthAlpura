// core/utils/usuarios.helper.ts

import {
  crearUsuario,
  eliminarUsuario
} from '@domains/usuarios/services/usuarios.services';

import { crearUsuarioValido } from '@domains/usuarios/test-data/usuarios.data';

export const crearUsuarioParaTest = async () => {
  const usuario = crearUsuarioValido();
  await crearUsuario(usuario);
  return usuario;
};

export const eliminarUsuarioSiExiste = async (username: string) => {
  try {
    await eliminarUsuario(username);
  } catch {
    // Evita romper el test si ya fue eliminado
  }
};