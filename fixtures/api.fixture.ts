import { test as base, request, APIRequestContext} from '@playwright/test';
import { AuthApi } from '../api/auth.api';
import { BookingApi } from '../api/booking.api';
import { BookingFactory } from '../factories/booking.factory';

type ApiFixtures = {
    apiContext: APIRequestContext;
    bookingId: number;
    token: string;
}

export const test = base.extend<ApiFixtures>({
    apiContext: async ({}, use) => {
    const apiContext = await request.newContext({
        baseURL: process.env.API_URL,
    })
        await use(apiContext);
    },

    bookingId: async ({ apiContext, token }, use) => {
    const booking = BookingFactory.validBooking();
    const bookingApi = new BookingApi(apiContext);
    const bookingId = await bookingApi.createBooking(booking);

    if (typeof bookingId !== 'number') {
      throw new Error(`bookingId is not a number: ${bookingId}`);
    }

    await use(bookingId);
    
    await bookingApi.deleteBooking(bookingId, token);
    },

    token: async ({ apiContext }, use) => {
    const authAPI = new AuthApi(apiContext);
    const token = await authAPI.getToken();

    await use(token);
    },
});

export { expect } from '@playwright/test';