/*
 Datos dinámicos
Aquí sí va lógica.

Responsabilidad:

Generar valores únicos
Evitar colisiones
Crear datos random
Helpers reutilizables
*/

// Generadores reutilizables en todo el proyecto

/*export const generarId = (): number => Date.now();

export const generarUsername = (): string =>
  `user_${Date.now()}`;

export const generarEmail = (): string =>
  `test_${Date.now()}@mail.com`;

--- segunda opcion
export const generarId = (): number =>
  Date.now() + Math.floor(Math.random() * 10000);

export const generarUsername = (): string =>
  `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

export const generarEmail = (): string =>
  `test_${Date.now()}_${Math.floor(Math.random() * 10000)}@mail.com`;*/

import { randomUUID } from 'crypto';

export const generarUsername = (): string =>
  `user_${randomUUID()}`;

export const generarEmail = (): string =>
  `${randomUUID()}@mail.com`;

export const generarId = (): number =>
  Math.floor(Math.random() * 1000000);