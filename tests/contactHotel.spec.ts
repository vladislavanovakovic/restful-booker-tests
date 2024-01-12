import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {FrontPage} from '../pages/FrontPage'

  const customerName = faker.person.fullName()
  const customerEmail = faker.internet.email()
  const customerPhoneNumber = faker.phone.number()
  const customerSubject = faker.lorem.sentence(3)
  const customerMessage = faker.lorem.lines(5)

test.describe('Contact Hotel', () => {
  let frontPage: FrontPage

  test.beforeEach(async ({ page }) => {
    frontPage = new FrontPage(page)
    await frontPage.goto()
      
  
  })

  test('Customer must be able to contact hotel by filling up all mandatory fields @sanity', async ({ page }) => {
    await frontPage.sendMessage(customerName, customerEmail, customerPhoneNumber, customerSubject, customerMessage)
        
    const successMessage = `Thanks for getting in touch ${customerName}`
    await expect(frontPage.contactFormSuccessMessage).toContainText(successMessage)

  })
  test('Customer must NOT be able to contact hotel without filling up the Name field', async ({ page }) => {
     
    await frontPage.sendMessage('', customerEmail, customerPhoneNumber, customerSubject, customerMessage)

    const errorMessage = 'Name may not be blank'
    await expect(frontPage.contactFormErrorMessage).toContainText(errorMessage)

  })
  test('Customer must NOT be able to contact hotel without filling up an Email field', async ({ page }) => {
     
    await frontPage.sendMessage(customerName, '', customerPhoneNumber, customerSubject, customerMessage)

    const errorMessage = 'Email may not be blank'
    await expect(frontPage.contactFormErrorMessage).toContainText(errorMessage)

  })
  test('Customer must NOT be able to contact hotel without filling up the Phone field', async ({ page }) => {
     
    await frontPage.sendMessage(customerName, customerEmail, '', customerSubject, customerMessage)

    const errorMessage = 'Phone may not be blank'
    const validationMessage = 'Phone must be between 11 and 21 characters'
    await expect(frontPage.contactFormErrorMessage).toContainText(errorMessage)
    await expect(frontPage.contactFormErrorMessage).toContainText(validationMessage)

  })
  test('Customer must NOT be able to contact hotel without filling up the Subject field', async ({ page }) => {
     
    await frontPage.sendMessage(customerName, customerEmail, customerPhoneNumber, '', customerMessage)

    const errorMessage = 'Subject must be between 5 and 100 characters.'
    const validationMessage = 'Subject may not be blank'
    await expect(frontPage.contactFormErrorMessage).toContainText(errorMessage)
    await expect(frontPage.contactFormErrorMessage).toContainText(validationMessage)

  })
  test('Customer must NOT be able to contact hotel without filling up the Message field', async ({ page }) => {
     
    await frontPage.sendMessage(customerName, customerEmail, customerPhoneNumber, customerSubject, '')

    const errorMessage = 'Message must be between 20 and 2000 characters.33'
    const validationMessage = 'Message may not be blank'
    await expect(frontPage.contactFormErrorMessage).toContainText(errorMessage)
    await expect(frontPage.contactFormErrorMessage).toContainText(validationMessage)

  })
})
