/**
 * Un helper debe:

✅ Orquestar acciones repetidas
✅ Preparar contexto de prueba
✅ Simplificar specs
✅ Encapsular setup común
 */

import {
  crearUsuario,
  eliminarUsuario
} from '@domains/usuarios/services/usuarios.services';

import { crearUsuarioValido } from '@domains/usuarios/test-data/usuarios.data';



/**
 * Crea un usuario dinámico y lo persiste
 */
export const crearUsuarioParaTest = async () => {
  const usuario = crearUsuarioValido();
  await crearUsuario(usuario);
  return usuario;
};


/**
 * Crea múltiples usuarios
 */
export const crearMultiplesUsuariosParaTest = async (cantidad: number) => {
  const usuarios = [];

  for (let i = 0; i < cantidad; i++) {
    const usuario = await crearUsuarioParaTest();
    usuarios.push(usuario);
  }

  return usuarios;
};


/**
 * Limpia usuario
 */
export const eliminarUsuarioSiExiste = async (username: string) => {
  try {
    await eliminarUsuario(username);
  } catch {
    // Evita que el test falle si ya no existe
  }
};