import { test, expect } from '@playwright/test';
import { RoomsFactory } from '../../factories/rooms.factory';
import { BookingPage } from '../../pages/BookingPage';

test('booking v1', async ({ page }) => {
  const bookingPage = new BookingPage(page);
  const room = RoomsFactory.doubleRoom();

  await bookingPage.navigate('/');
  await bookingPage.checkIn('11/04/2026');
  await bookingPage.checkOut('12/04/2026');
  await bookingPage.bookRoom(room);
});
