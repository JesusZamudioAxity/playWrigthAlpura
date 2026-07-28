import { globalData } from '@core/test-data/global.data';
import {
  generarId,
  generarUsername,
  generarEmail
} from '@core/utils/dataGenerator';

export type Usuario = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
};

export const crearUsuarioValido = (
  overrides?: Partial<Usuario>
): Usuario => ({
  id: generarId(),
  username: generarUsername(),
  firstName: globalData.firstName,
  lastName: globalData.lastName,
  email: generarEmail(),
  password: globalData.password,
  phone: globalData.phone,
  userStatus: globalData.userStatusActive,
  ...overrides
});

/*import { globalData } from '@core/test-data/global.data';
import {
  generarId,
  generarUsername,
  generarEmail
} from '@core/utils/dataGenerator';

export const crearUsuarioValido = () => ({
  id: generarId(), 
  username: generarUsername(),
  firstName: globalData.firstName,
  lastName: globalData.lastName,
  email: generarEmail(),
  password: globalData.password,
  phone: globalData.phone,
  userStatus: globalData.userStatusActive
});*/


/*export const usuarioValido = {
  id: 0,
  username: "Daniel",
  firstName: "Zamudio",
  lastName: "Pineda",
  email: "zamudio@pruebas.com",
  password: "zamudio12345",
  phone: "5511551155",
  userStatus: 0
};*/