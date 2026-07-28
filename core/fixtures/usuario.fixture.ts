// core/fixtures/usuario.fixture.ts

import { test as base } from '@playwright/test';
import {
  crearUsuarioParaTest,
  eliminarUsuarioSiExiste
} from '@core/utils/usuarios.helper';

type UsuarioFixture = {
  usuario: Awaited<ReturnType<typeof crearUsuarioParaTest>>;
};

export const test = base.extend<UsuarioFixture>({
  usuario: async ({}, use) => {
    const usuario = await crearUsuarioParaTest();
    await use(usuario);
   // await eliminarUsuarioSiExiste(usuario.username);
  }
});

export { expect } from '@playwright/test';