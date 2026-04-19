import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Rooms } from '../factories/rooms.factory';

export class BookingPage extends BasePage {
  private readonly checkInInput = this.page.locator('label:has-text("Check In") + div input');
  private readonly checkOutInput = this.page.locator('label:has-text("Check Out") + div input');
  private readonly checkAvailabilityButton = this.page.getByRole('button', {
    name: 'Check Availability',
  });

  constructor(page: Page) {
    super(page);
  }

  async checkIn(date: string) {
    await this.checkInInput.fill(date);
  }

  async checkOut(date: string) {
    await this.checkOutInput.fill(date);
  }

  async checkAvailability() {
    await this.checkAvailabilityButton.click();
  }

  async bookRoom(room: Rooms) {
    await this.page
      .locator('.room-card')
      .filter({ hasText: room.name })
      .locator('a.btn-primary')
      .click();
  }
}
