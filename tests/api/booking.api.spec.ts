import { test, expect, request } from '@playwright/test';
import { BookingFactory } from '../../factories/booking.factory';

test('POST /booking - create booking', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com',
  });

  const booking = BookingFactory.validBooking();
  const response = await apiContext.post('/booking', {
    data: booking,
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.booking.firstname).toBe(booking.firstname);
  expect(body.bookingid).toBeTruthy();

  const bookingId = body.bookingid;

  const getResponse = await apiContext.get(`/booking/${bookingId}`);
  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();
  expect(getBody.firstname).toBe(booking.firstname);
  expect(getBody.lastname).toBe(booking.lastname);
  expect(getBody.bookingdates.checkin).toBe(booking.bookingdates.checkin);
  expect(getBody.bookingdates.checkout).toBe(booking.bookingdates.checkout);
});
