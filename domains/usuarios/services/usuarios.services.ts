import { ApiClient } from '@core/api/apiClient';

async function getApi() {
  const api = new ApiClient();
  await api.init();
  return api;
}

export async function crearUsuario(data: any) {
  const api = await getApi();
  return api.post('/user', data);
}

export async function obtenerUsuario(username: string) {
  const api = await getApi();
  return api.get(`/user/${username}`);
}

export async function actualizarUsuario(username: string, data: any) {
  const api = await getApi();
  return api.put(`/user/${username}`, data);
}

export async function eliminarUsuario(username: string) {
  const api = await getApi();
  return api.delete(`/user/${username}`);
}

export async function loginUsuario(username: string, password: string) {
  const api = await getApi();
  return api.get(
    `/user/login?username=${username}&password=${password}`
  );
}
/**
 * login evuta problemas de encoding
 * @returns return api.get(
  `/user/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
);
 */

export async function logoutUsuario() {
  const api = await getApi();
  return api.get('/user/logout');
}

export async function crearUsuariosConLista(data: any[]) {
  const api = await getApi();
  return api.post('/user/createWithList', data);
}
     
export async function crearUsuariosConArray(data: any[]) {
  const api = await getApi();
  return api.post('/user/createWithArray', data);
}
