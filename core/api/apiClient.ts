import { request, APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../config/enviroments';

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
    return this.context.get(`${API_BASE_URL}${path}`);
  }

  async post(path: string, body: any) {
    return this.context.post(`${API_BASE_URL}${path}`, {
      data: body
    });
  }

  async put(path: string, body: any) {
    return this.context.put(`${API_BASE_URL}${path}`, {
      data: body
    });
  }

  async delete(path: string) {
    return this.context.delete(`${API_BASE_URL}${path}`);
  }

}