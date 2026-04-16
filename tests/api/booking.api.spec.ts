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

  const getBooking = await bookingApi.getBooking(bookingId);
  expect(getBooking.status()).toBe(200);
  const getBody = await getBooking.json();
  expect(getBody.firstname).toBe(booking.firstname);
  expect(getBody.bookingdates.checkin).toBe(booking.bookingdates.checkin);

  //const updateBooking = await bookingApi.updateBooking(bookingId, booking, token);
  const updatedBooking = BookingFactory.validBooking({
    firstname: 'NewName',
    lastname: 'NewLastName',
    totalprice: 100,
    bookingdates: { checkin: '2026-05-01', checkout: '2026-05-02' },
  });

  const updateResponse = await bookingApi.updateBooking(bookingId, updatedBooking, token);
  expect(updateResponse.status()).toBe(200);
  const updateBody = await updateResponse.json();
  expect(updateBody.firstname).toBe('NewName');
  expect(updateBody.bookingdates.checkin).toBe('2026-05-01');

  const partialUpdatedBooking = BookingFactory.validBooking({
    firstname: 'Updated First Name',
  });

  const partialUpdateResponse = await bookingApi.partialUpdateBooking(
    bookingId,
    partialUpdatedBooking,
    token
  );
  expect(partialUpdateResponse.status()).toBe(200);
  expect(getBody.firstname).toBe(booking.firstname);

  const deleteBooking = await bookingApi.deleteBooking(bookingId, token);
  expect(deleteBooking.status()).toBe(201);
});

test('Get /booking ID s', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com',
  });

  const bookingApi = new BookingApi(apiContext);
  const getByID = await bookingApi.getBookingIds();
  expect(getByID.status()).toBe(200);
  const getBody = await getByID.json();
  expect(getBody.length).toBeGreaterThan(0);
});
