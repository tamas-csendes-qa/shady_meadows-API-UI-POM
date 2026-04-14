import { test, expect, request } from '@playwright/test';
import { AuthApi } from '../../api/auth.api';
import { BookingFactory } from '../../factories/booking.factory';

test('POST /booking - create & delete booking', async () => {
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

  const authAPI = new AuthApi(apiContext);
  const token = await authAPI.getToken();

  const deleteResponse = await apiContext.delete(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  expect(deleteResponse.status()).toBe(201);
});
