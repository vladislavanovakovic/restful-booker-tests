import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { FrontPage } from '../pages/FrontPage'
import { AuthAPi } from '../api/AuthApi'
import { RoomApi } from '../api/RoomApi'
import { RoomType,RoomFeatures } from '../pages/RoomsPage'

const customerFirstName = faker.person.firstName()
const customerLastName = faker.person.lastName()
const customerEmail = faker.internet.email()
const customerPhoneNumber = faker.phone.number()

test.describe('Book a Room', () => {
  let frontPage: FrontPage
  let authAPi: AuthAPi
  let roomApi: RoomApi

  const roomName: string = faker.number.int({ min: 100, max: 999 }).toString()
  const roomType: RoomType = faker.helpers.arrayElement([RoomType.SINGLE, RoomType.TWIN, RoomType.DOUBLE, RoomType.FAMILY, RoomType.SUITE])
  const roomIsAccessible: boolean = faker.datatype.boolean()
  const roomPrice: number = faker.number.int({ min: 100, max: 999 })
  const roomFeatures: RoomFeatures = {
    wifi: faker.datatype.boolean(),
    tv: faker.datatype.boolean(),
    radio: faker.datatype.boolean(),
    refreshments: faker.datatype.boolean(),
    safe: faker.datatype.boolean(),
    views: faker.datatype.boolean()
  };

  test.beforeEach(async ({ page, request }) => {
    await page.goto('https://automationintesting.online/#/admin')
    frontPage = new FrontPage(page)
    authAPi = new AuthAPi(request)
    roomApi = new RoomApi(request)
    await authAPi.loginToTheApplication('admin', 'password')
    await roomApi.createARoom(roomName, roomType, roomIsAccessible,roomFeatures, roomPrice )
    await frontPage.goto()
  })
  test('Customer must be able to book a room by filling up mandatory fields @sanity', async ({ page }) => {
    await frontPage.clickBookThisRoomButton()
    await frontPage.fillBookingFields(customerFirstName, customerLastName, customerEmail, customerPhoneNumber)
    await frontPage.selectAvailableDates()
    await frontPage.clickBookButton()

    const bookingSuccessMessage = 'Booking Successful!'
    const bookingConfirmationMessage = 'Congratulations! Your booking has been confirmed'
    await expect(frontPage.bookingConfirmationDialog).toBeVisible()
    await expect(frontPage.bookingConfirmationDialog).toContainText(bookingSuccessMessage)
    await expect(frontPage.bookingConfirmationDialog).toContainText(bookingConfirmationMessage)
    await page.getByRole('button', { name: 'Close' }).click()
  })
  test('Customer must NOT be able to book a room without filling up the First name field', async ({ page }) => {
    await frontPage.clickBookThisRoomButton()
    await frontPage.fillBookingFields('', customerLastName, customerEmail, customerPhoneNumber)
    await frontPage.selectAvailableDates()
    await frontPage.clickBookButton()

    const errorMessage = 'Firstname should not be blank'
    const validationMessage = 'size must be between 3 and 18'
    await expect(frontPage.bookingErrorMessage).toBeVisible()
    await expect(frontPage.bookingErrorMessage).toContainText(errorMessage)
    await expect(frontPage.bookingErrorMessage).toContainText(validationMessage)
  })
  test('Customer must NOT be able to book a room without filling up the Last name field', async ({ page }) => {
    await frontPage.clickBookThisRoomButton()
    await frontPage.fillBookingFields(customerFirstName, '', customerEmail, customerPhoneNumber)
    await frontPage.selectAvailableDates()
    await frontPage.clickBookButton()

    const errorMessage = 'Lastname should not be blank'
    const validationMessage = 'size must be between 3 and 30'
    await expect(frontPage.bookingErrorMessage).toBeVisible()
    await expect(frontPage.bookingErrorMessage).toContainText(errorMessage)
    await expect(frontPage.bookingErrorMessage).toContainText(validationMessage)
  })
  test('Customer must NOT be able to book a room without filling up the Email field', async ({ page }) => {
    await frontPage.clickBookThisRoomButton()
    await frontPage.fillBookingFields(customerFirstName, customerLastName, '', customerPhoneNumber)
    await frontPage.selectAvailableDates()
    await frontPage.clickBookButton()

    const errorMessage = 'must not be empty'
    await expect(frontPage.bookingErrorMessage).toBeVisible()
    await expect(frontPage.bookingErrorMessage).toContainText(errorMessage)
  })
  test('Customer must NOT be able to book a room without filling up the Phone field', async ({ page }) => {
    await frontPage.clickBookThisRoomButton()
    await frontPage.fillBookingFields(customerFirstName, customerLastName, customerEmail, '')
    await frontPage.selectAvailableDates()
    await frontPage.clickBookButton()

    const errorMessage = 'must not be empty'
    const validationMessage = 'size must be between 11 and 21'
    await expect(frontPage.bookingErrorMessage).toBeVisible()
    await expect(frontPage.bookingErrorMessage).toContainText(errorMessage)
    await expect(frontPage.bookingErrorMessage).toContainText(validationMessage)

  })
})
