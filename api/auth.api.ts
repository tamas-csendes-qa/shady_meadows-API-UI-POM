import { APIRequestContext } from '@playwright/test';

export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async getToken(): Promise<string> {
    try {
      const response = await this.request.post('/auth', {
        data: {
          username: 'admin',
          password: 'password123',
        },
      });

      const body = await response.json();
      return body.token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API error: ${error.message}`);
      }
      throw error;
    }
  }
}
