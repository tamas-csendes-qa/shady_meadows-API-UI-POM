export type Rooms = {
  name: string;
  tv: boolean;
  wifi: boolean;
  safe: boolean;
};

export const RoomsFactory = {
  singleRoom(overrides?: Partial<Rooms>): Rooms {
    return { name: 'Single', tv: true, wifi: true, safe: true, ...overrides };
  },

  doubleRoom(overrides?: Partial<Rooms>): Rooms {
    return { name: 'Double', tv: true, wifi: true, safe: true, ...overrides };
  },

  suiteRoom(overrides?: Partial<Rooms>): Rooms {
    return { name: 'Suite', tv: true, wifi: true, safe: true, ...overrides };
  },
};
