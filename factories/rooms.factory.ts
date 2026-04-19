type RoomEquipment = 'tv' | 'wifi' | 'radio' | 'safe';

export type Rooms = {
  name: string;
  price: number,
  equipment: Record<RoomEquipment, boolean>;
};

export const RoomsFactory = {
  singleRoom(overrides?: Partial<Rooms>): Rooms {
    return {
      name: 'Single',
      price: 100,
      equipment: { tv: true, wifi: true, safe: true, radio: false },
      ...overrides,
    };
  },

  doubleRoom(overrides?: Partial<Rooms>): Rooms {
    return {
      name: 'Double',
      price: 150,
      equipment: { tv: true, wifi: false, safe: true, radio: true },
      ...overrides,
    };
  },

  suiteRoom(overrides?: Partial<Rooms>): Rooms {
    return {
      name: 'Suite',
      price: 225,
      equipment: { tv: false, wifi: true, safe: true, radio: true },
      ...overrides,
    };
  },
};
