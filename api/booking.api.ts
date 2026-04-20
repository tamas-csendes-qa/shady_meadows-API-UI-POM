import { APIRequestContext, APIResponse } from '@playwright/test';
import { Booking } from '../factories/booking.factory';

export class BookingApi {
  constructor(private request: APIRequestContext) {}

  async createBooking(booking: Booking): Promise<number> {
    const response = await this.request.post('/booking', {
      data: booking,
    });

    const body = await response.json();
    return body.bookingid;
  }

  async getBooking(id: number): Promise<APIResponse> {
    const response = await this.request.get(`/booking/${id}`);
    return response;
  }

  async updateBooking(id: number, data: Booking, token: string): Promise<APIResponse> {
    const response = await this.request.put(`/booking/${id}`, {
      data: data,
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response;
  }

  async partialUpdateBooking(id: number, data: Partial<Booking>, token: string): Promise<APIResponse> {
    const response = await this.request.patch(`/booking/${id}`, {
      data: data,
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response;
  }

  async deleteBooking(id: number, token: string): Promise<APIResponse> {
    const response = await this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response;
  }

  async getBookingIds(): Promise<APIResponse> {
    const response = await this.request.get(`/booking`);
    return response;
  }
}
