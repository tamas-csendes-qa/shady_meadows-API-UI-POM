import { APIRequestContext } from '@playwright/test';
import { Booking } from '../factories/booking.factory';

export class BookingApi {
  constructor(private request: APIRequestContext) {}

  async createBooking(booking: Booking): Promise<string> {
    const response = await this.request.post('/booking', {
      data: booking,
    });

    const body = await response.json();
    return body.bookingid;
  }
}
/*async getBooking(id: number): Promise<string> {
    const response = await this.request.get(`/booking/${id}`, {});
  }
}
/*createBooking(data: Booking) → POST /booking
- getBooking(id: number) → GET /booking/{id}
- deleteBooking(id: number, token: string) → DELETE /booking/{id}
- updateBooking(id: number, data: Booking, token: string) → PUT /booking/{id}
- partialUpdateBooking(id: number, data: Partial<Booking>, token: string) → PATCH /booking/{id}
- getBookingIds() → GET /booking
*/
