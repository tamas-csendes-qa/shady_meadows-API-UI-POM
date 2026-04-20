import { test, expect } from '../../fixtures/api.fixture'
import { BookingApi } from '../../api/booking.api';
import { BookingFactory } from '../../factories/booking.factory';

test('GET /booking - get booking by id', async ({ apiContext, bookingId }) => {
    const bookingApi = new BookingApi(apiContext);
    const booking = BookingFactory.validBooking();

    const response = await bookingApi.getBooking(bookingId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe(booking.firstname);
});

test('PUT /booking - update booking', async ({ apiContext, bookingId, token }) => {
    const bookingApi = new BookingApi(apiContext);
    const updatedBooking = BookingFactory.validBooking({
        firstname: 'NewName',
        lastname: 'NewLastName',
        totalprice: 100,
        bookingdates: { checkin: '2026-05-01', checkout: '2026-05-02' },
    });

    const response = await bookingApi.updateBooking(bookingId, updatedBooking, token);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('NewName');
});

test('PATCH /booking - partial update', async ({ apiContext, bookingId, token }) => {
    const bookingApi = new BookingApi(apiContext);
    const booking = BookingFactory.validBooking({
      firstname: 'Updated First Name',
    });

    const response = await bookingApi.partialUpdateBooking(
      bookingId,
      booking,
      token
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe(booking.firstname);
  });

test('DELETE /booking - delete booking', async ({ apiContext, bookingId, token }) => {
    const bookingApi = new BookingApi(apiContext);
    const deleteBooking = await bookingApi.deleteBooking(bookingId, token);
    expect(deleteBooking.status()).toBe(201);
});

test('Get /booking ID s', async ({ apiContext }) => {
  const bookingApi = new BookingApi(apiContext);
  const getByID = await bookingApi.getBookingIds();
  expect(getByID.status()).toBe(200);
  const getBody = await getByID.json();
  expect(getBody.length).toBeGreaterThan(0);
});
