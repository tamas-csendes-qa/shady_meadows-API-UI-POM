import { APIResponse } from '@playwright/test';
import { Booking } from '../factories/booking.factory';

export interface IBookingApi {
  createBooking(booking: Booking): Promise<number>;
  getBooking(id: number): Promise<APIResponse>;
  updateBooking(id: number, data: Booking, token: string): Promise<APIResponse>;
  partialUpdateBooking(id: number, data: Partial<Booking>, token: string): Promise<APIResponse>;
  deleteBooking(id: number, token: string): Promise<APIResponse>;
  getBookingIds(): Promise<APIResponse>;
}