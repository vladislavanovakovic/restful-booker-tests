import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { AuthAPi } from '../api/AuthApi'
import { RoomType, RoomsPage, RoomFeatures } from '../pages/RoomsPage'
import { faker } from '@faker-js/faker'

const roomName: string = faker.number.int({ min: 100, max: 999 }).toString()
const roomPrice: number = faker.number.int({ min: 100, max: 999 })
const roomType: RoomType = faker.helpers.arrayElement([RoomType.SINGLE, RoomType.TWIN, RoomType.DOUBLE, RoomType.FAMILY, RoomType.SUITE])
const isRoomAccesible: boolean = faker.datatype.boolean()

const roomFeatures: RoomFeatures = {
  wifi: faker.datatype.boolean(),
  tv: faker.datatype.boolean(),
  radio: faker.datatype.boolean(),
  refreshments: faker.datatype.boolean(),
  safe: faker.datatype.boolean(),
  views: faker.datatype.boolean()
}

test.describe('Creating room', () => {
  let loginPage: LoginPage
  let roomsPage: RoomsPage
  let authApi: AuthAPi

  test.beforeEach(async ({ page, request }) => {
    loginPage = new LoginPage(page)
    roomsPage = new RoomsPage(page)
    authApi = new AuthAPi(request)

    await loginPage.goto()
    await loginPage.loginToTheApp('admin', 'password')
    await expect(loginPage.logoutButton).toBeVisible()
  })

  test('Admin user must be able to create new room by filling up all mandatory fields @sanity', async ({ page }) => {
    await roomsPage.createRoom(roomName, roomType, isRoomAccesible, roomPrice, roomFeatures)
    const createdRoom = page.locator(`//div[@data-testid='roomlisting'][.//p[contains(@id,'${roomName}')]]`).last()
    await expect(createdRoom).toBeVisible()
  })
  test('Admin user must NOT be able to create new room with the room name empty', async ({ page }) => {
    
  })
})
