// services-tests/core/api.client.js
export class ApiClient {
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
}
