import { test, expect } from '@playwright/test';
import { RoomsFactory } from '../../factories/rooms.factory';
import { BookingPage } from '../../pages/BookingPage';
import { ReservationPage } from '../../pages/ReservationPage';

test('booking v1', async ({ page }) => {
  const bookingPage = new BookingPage(page);
  const reservationPage = new ReservationPage(page);
  const room = RoomsFactory.suiteRoom();

  await bookingPage.navigate('/');
  await bookingPage.checkIn('11/05/2026');
  await bookingPage.checkOut('12/05/2026');
  await bookingPage.checkAvailability();
  await bookingPage.bookRoom(room);
  
  expect(await reservationPage.checkRoomFeatures('WiFi')).toBe(room.equipment.wifi);
  expect(await reservationPage.checkRoomFeatures('Radio')).toBe(room.equipment.radio);
  expect(await reservationPage.checkRoomFeatures('Safe')).toBe(room.equipment.safe);

  await reservationPage.checkTotalPrice(1, room);

  await reservationPage.reserveRoom();
});
