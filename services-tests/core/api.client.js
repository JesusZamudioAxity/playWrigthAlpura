export class ApiClient {
  constructor(request, token) {
    this.request = request;
    this.token = token;
  }

  async get(path) {
    return this.request.get(path, {
      headers: this._headers()
    });
  }

  async post(path, body) {
    return this.request.post(path, {
      headers: this._headers(),
      data: body
    });
  }

  async put(path, body) {
    return this.request.put(path, {
      headers: this._headers(),
      data: body
    });
  }

  async delete(path) {
    return this.request.delete(path, {
      headers: this._headers()
    });
  }

  _headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }
}