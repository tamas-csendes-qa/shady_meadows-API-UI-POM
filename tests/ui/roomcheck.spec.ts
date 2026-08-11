import { test, expect } from '@playwright/test';
import { RoomsFactory } from '../../factories/rooms.factory';
import { BookingPage } from '../../pages/BookingPage';
import { ReservationPage } from '../../pages/ReservationPage';

/** Returns a date offset from today in DD/MM/YYYY format. */
function getDateOffsetFromToday(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${day}/${month}/${date.getFullYear()}`;
}

test('Suite room shows the expected features and total price on the reservation page', async ({
  page,
}) => {
  const bookingPage = new BookingPage(page);
  const reservationPage = new ReservationPage(page);
  const room = RoomsFactory.suiteRoom();

  const checkInDate = getDateOffsetFromToday(1);
  const checkOutDate = getDateOffsetFromToday(2);

  await bookingPage.navigate('/');
  await bookingPage.checkIn(checkInDate);
  await bookingPage.checkOut(checkOutDate);
  await bookingPage.checkAvailability();
  await bookingPage.bookRoom(room);

  expect(await reservationPage.checkRoomFeatures('WiFi')).toBe(room.equipment.wifi);
  expect(await reservationPage.checkRoomFeatures('Radio')).toBe(room.equipment.radio);
  expect(await reservationPage.checkRoomFeatures('Safe')).toBe(room.equipment.safe);

  await reservationPage.checkTotalPrice(1, room);

  await reservationPage.reserveRoom();
});
