import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Rooms } from '../factories/rooms.factory';

export class ReservationPage extends BasePage {
    private readonly roomFeatures = this.page.locator('.row.g-3.d-flex.flex-wrap');
    private readonly totalPrice = this.page.locator('.fw-bold span').last();
    private readonly reserveNowButton = this.page.getByRole('button', {
    name: 'Reserve now',
});

    constructor(page: Page) {
    super(page);
  }
  async checkTotalPrice(nights: number, room: Rooms) {
    const pricePerNight = room.price;
    const cleaningFee = 25;
    const serviceFee = 15;

    const expectedTotal = (nights * pricePerNight) + cleaningFee + serviceFee;

    await expect(this.totalPrice).toHaveText(`£${expectedTotal}`);
  }

  async waitForPage() {
    await this.roomFeatures.waitFor();
  }

  async checkRoomFeatures(featureName: string): Promise<boolean> {
    return await this.roomFeatures.locator(`span:has-text("${featureName}")`).isVisible();
  }

  async reserveRoom() {
    await this.reserveNowButton.click();
  }
}