export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
  email?: string;
  phone?: string;
};

export const BookingFactory = {
  validBooking(overrides?: Partial<Booking>): Booking {
    return {
      firstname: 'Teszt',
      lastname: 'Foglaló',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-04-11',
        checkout: '2026-04-12',
      },
      ...overrides,
    };
  },
};
