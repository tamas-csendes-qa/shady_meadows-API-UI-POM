import { test, expect, request } from '@playwright/test';
import { AuthApi } from '../../api/auth.api';
import { BookingApi } from '../../api/booking.api';
import { BookingFactory } from '../../factories/booking.factory';

test('POST /booking - create & delete booking', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com',
  });

  const booking = BookingFactory.validBooking();
  const bookingApi = new BookingApi(apiContext);
  const bookingId = await bookingApi.createBooking(booking);
  const authAPI = new AuthApi(apiContext);
  const token = await authAPI.getToken();

  const deleteResponse = await apiContext.delete(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  expect(deleteResponse.status()).toBe(201);
});
