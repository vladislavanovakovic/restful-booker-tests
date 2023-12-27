import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
    readonly pageLocator: Locator
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator
    readonly logoutButton: Locator

    constructor(page: Page) {
        super(page)

        this.usernameField = page.locator('#username')
        this.passwordField = page.locator('#password')
        this.loginButton = page.locator('#doLogin')
        this.logoutButton = page.getByRole('link', { name: 'Logout' })

}
async goto() {
    await this.page.goto('https://automationintesting.online/#/admin')
  }

  async loginToTheApp(username: string, password: string) {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.loginButton.click()
}
}