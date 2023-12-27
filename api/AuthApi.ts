import { test, expect, APIRequestContext } from '@playwright/test'
import { BaseApi } from './BaseApi'

export class AuthAPi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request)
  }

  async loginToTheApplication(username: string, password: string) {
    const response = await this.request.post('https://automationintesting.online/auth/login', {
      data: {
        username: username,
        password: password
      }
    })

    expect(response.status()).toBe(200)
  }
}
