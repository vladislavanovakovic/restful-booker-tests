import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Login To The Website', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test('Customer must be able to log in to the hotel website by filling up mandatory fields @sanity', async ({ page }) => {
    await loginPage.loginToTheApp('admin', 'password')

    await expect(loginPage.logoutButton).toBeVisible()
  })

  test('Customer must NOT be able to log in to the hotel website without filling up the username field', async ({ page }) => {
    await loginPage.loginToTheApp('', 'password')

    await expect(loginPage.logoutButton).not.toBeVisible()
  })
  test('Customer must NOT be able to log in to the hotel website without filling up the password field', async ({ page }) => {
    await loginPage.loginToTheApp('admin', '')
    await expect(loginPage.logoutButton).not.toBeVisible()
  })
})
