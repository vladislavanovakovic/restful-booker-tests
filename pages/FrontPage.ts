import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class FrontPage extends BasePage {
  readonly pageLocator: Locator
  readonly contactFormNameField: Locator
  readonly contactFormEmailField: Locator
  readonly contactFormPhoneField: Locator
  readonly contactFormSubjectField: Locator
  readonly contactFormDescriptionField: Locator
  readonly contactFormSubmitButton: Locator
  readonly contactFormSuccessMessage: Locator
  readonly contactFormErrorMessage: Locator

  readonly bookThisRoomButton: Locator
  readonly bookingFirstNameField: Locator
  readonly bookingLastNameField: Locator
  readonly bookingEmailField: Locator
  readonly bookingPhoneField: Locator
  readonly calendarNextButton: Locator
  readonly bookButton: Locator
  readonly bookingConfirmationDialog: Locator
  readonly bookingErrorMessage: Locator

  constructor(page: Page) {
    super(page)

    this.contactFormNameField = page.locator('#name')
    this.contactFormEmailField = page.locator('#email')
    this.contactFormPhoneField = page.locator('#phone')
    this.contactFormSubjectField = page.locator('#subject')
    this.contactFormDescriptionField = page.locator('#description')
    this.contactFormSubmitButton = page.locator('#submitContact')
    this.contactFormSuccessMessage = page.locator('div.contact h2')
    this.contactFormErrorMessage = page.locator('div.contact .alert.alert-danger')

    this.bookThisRoomButton = page.getByRole('button', { name: 'Book this room' }).last()
    this.bookingFirstNameField = page.locator('.room-firstname')
    this.bookingLastNameField = page.locator('.room-lastname')
    this.bookingEmailField = page.locator('.room-email')
    this.bookingPhoneField = page.locator('.room-phone')
    this.calendarNextButton = page.getByRole('button', { name: 'Next' })
    this.bookButton = page.locator('.book-room').last()
    this.bookingConfirmationDialog = page.locator('.confirmation-modal')
    this.bookingErrorMessage = page.locator('div.hotel-room-info .alert.alert-danger').last()
  }

  async goto() {
    await this.page.goto('https://automationintesting.online/')
  }
  async sendMessage(name: string, email: string, phone: string, subject: string, descrtiption: string) {
    await this.contactFormNameField.fill(name)
    await this.contactFormEmailField.fill(email)
    await this.contactFormPhoneField.fill(phone)
    await this.contactFormSubjectField.fill(subject)
    await this.contactFormDescriptionField.fill(descrtiption)
    await this.contactFormSubmitButton.click()
  }
  async clickBookThisRoomButton() {
        await this.page.locator('.openBooking').last().click();

}
  async fillBookingFields(firstName: string, lastName: string, email: string, phone: string) {
    await this.bookingFirstNameField.fill(firstName)
    await this.bookingLastNameField.fill(lastName)
    await this.bookingEmailField.fill(email)
    await this.bookingPhoneField.fill(phone)
  }
  async selectAvailableDates() {
    await this.calendarNextButton.click()

    const calendarStartDate = this.page.locator('.rbc-day-bg:not(.rbc-off-range-bg)').first()
    const calendarEndDate = this.page.locator('.rbc-day-bg:not(.rbc-off-range-bg)').last()
    await calendarStartDate.hover()
    await this.page.mouse.down()
    await calendarEndDate.hover()
    await this.page.mouse.up()
  }
  async clickBookButton() {
    await this.bookButton.click()
  }
}
