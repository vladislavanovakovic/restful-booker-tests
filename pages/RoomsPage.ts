import { test, Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'
import { tr } from '@faker-js/faker'

export class RoomsPage extends BasePage {
  readonly roomNameField: Locator
  readonly roomTypeDropdown: Locator
  readonly roomAccessibleDropdown: Locator
  readonly roomPriceField: Locator
  readonly wifiCheckbox: Locator
  readonly tvCheckbox: Locator
  readonly radioCheckbox: Locator
  readonly refreshmentsCheckbox: Locator
  readonly safeCheckbox: Locator
  readonly viewsCheckbox: Locator
  readonly createButton: Locator
  readonly errorMessageBox: Locator

  constructor(page: Page) {
    super(page)
    this.roomNameField = page.locator('#roomName')
    this.roomTypeDropdown = page.locator('#type')
    this.roomAccessibleDropdown = page.locator('#accessible')
    this.roomPriceField = page.locator('#roomPrice')
    this.wifiCheckbox = page.getByLabel('WiFi')
    this.wifiCheckbox = page.getByLabel('TV')
    this.wifiCheckbox = page.getByLabel('Radio')
    this.wifiCheckbox = page.getByLabel('Refreshments')
    this.wifiCheckbox = page.getByLabel('Safe')
    this.wifiCheckbox = page.getByLabel('Views')
    this.createButton = page.getByRole('button', { name: 'Create' })
    this.errorMessageBox = page.locator('.alert-danger')
  }
  async goto() {
    await this.page.goto('/#/admin')
  }
  async selectRoomType(type: RoomType) {
    await this.roomTypeDropdown.selectOption(type)
  }
  async selectRoomFeatures(features: RoomFeatures) {
    //if (features.wifi) await this.wifiCheckbox.check({force:true})
    //else await this.wifiCheckbox.uncheck()
    //if (features.tv) await this.tvCheckbox.check({force:true})
    //else await this.tvCheckbox.uncheck();
  }

  async createRoom(roomName: string, roomType: RoomType, roomAccessibleDropdown: boolean, roomPrice: number, roomFeatures: RoomFeatures) {
    await this.roomNameField.fill(roomName)
    await this.selectRoomType(roomType)
    await this.roomAccessibleDropdown.selectOption(roomAccessibleDropdown ? 'true' : 'false')
    await this.roomPriceField.fill(roomPrice.toString())
    //await this.selectRoomFeatures(roomFeatures)
    await this.createButton.click()
  }
}
export enum RoomType {
  SINGLE = 'Single',
  TWIN = 'Twin',
  DOUBLE = 'Double',
  FAMILY = 'Family',
  SUITE = 'Suite'
}
export type RoomFeatures = {
  wifi: boolean
  tv: boolean
  radio: boolean
  refreshments: boolean
  safe: boolean
  views: boolean
}
export function getRoomFeaturesAsAList(roomFeatures: RoomFeatures) {
  const features: string[] = []
  if (roomFeatures.wifi) features.push('WiFi')
  if (roomFeatures.tv) features.push('TV')
  if (roomFeatures.radio) features.push('Radio')
  if (roomFeatures.refreshments) features.push('Refreshments')
  if (roomFeatures.safe) features.push('Safe')
  if (roomFeatures.views) features.push('Views')
  return features
}
