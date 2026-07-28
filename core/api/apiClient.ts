import { request, APIRequestContext } from '@playwright/test';
import { BASE_URL } from '../config/enviroments';

export class ApiClient {
  private context!: APIRequestContext;
  private token?: string;

  constructor(token?: string) {
    this.token = token;
  }

  async init() {
  this.context = await request.newContext({
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
}

async get(path: string) {
  return this.context.get(`${BASE_URL}${path}`);
}

async post(path: string, body: any) {
  return this.context.post(`${BASE_URL}${path}`, {
    data: body
  });
}

async put(path: string, body: any) {
  return this.context.put(`${BASE_URL}${path}`, {
    data: body
  });
}

async delete(path: string) {
  return this.context.delete(`${BASE_URL}${path}`);
}

 /*222 
 async init() {
    console.log('BASE_URL en ApiClient:', BASE_URL);
    this.context = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
          'Accept': 'application/json',   // 🔥 ESTA ES LA CLAVE
        ...(this.token && { Authorization: `Bearer ${this.token}` })
      }
    });
  }

  async get(path: string, headers: Record<string, string> = {}) {
      console.log('GET URL:', `${BASE_URL}${path}`);
    return this.context.get(path, {
      headers: { ...headers }
    });
  }

  async post(path: string, body: any, headers: Record<string, string> = {}) {
    console.log('POST URL:', `${BASE_URL}${path}`);
  console.log('BODY:', body);
    return this.context.post(path, {
      data: body,
      headers: { ...headers }
    });
  }

  async put(path: string, body: any, headers: Record<string, string> = {}) {
    return this.context.put(path, {
      data: body,
      headers: { ...headers }
    });
  }

  async delete(path: string, headers: Record<string, string> = {}) {
    return this.context.delete(path, {
      headers: { ...headers }
    });
  }*/
}

/*------------------------------------------1*/
/*import { request, APIRequestContext } from '@playwright/test';
import { BASE_URL } from '../config/enviroments.js';

export async function getApiContext(): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  });
}*/

/*-----*/
// services-tests/core/api.client.js
/*export class ApiClient {
  constructor(request, token) {
    this.request = request;
    this.token = token;
  }

  async get(path, additionalHeaders = {}) {
    const headers = { ...this._headers(), ...additionalHeaders };
  //  console.log('GET Request Headers:', headers); // Imprimir los encabezados para verificar

    return this.request.get(path, {
      headers: headers
    });
  }

  async post(path, body, additionalHeaders = {}) {
    const headers = { ...this._headers(), ...additionalHeaders };
   // console.log('POST Request Headers:', headers); // Imprimir los encabezados para verificar

    return this.request.post(path, {
      headers: headers,
      data: body
    });
  }

  async put(path, body, additionalHeaders = {}) {
    const headers = { ...this._headers(), ...additionalHeaders };
    console.log('PUT Request Headers:', headers); // Imprimir los encabezados para verificar

    return this.request.put(path, {
      headers: headers,
      data: body
    });
  }

  async delete(path, additionalHeaders = {}) {
    const headers = { ...this._headers(), ...additionalHeaders };
    console.log('DELETE Request Headers:', headers); // Imprimir los encabezados para verificar

    return this.request.delete(path, {
      headers: headers
    });
  }

  _headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }
}*/
