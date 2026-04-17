type RoomEquipment = 'tv' | 'wifi' | 'radio' | 'safe';

export type Rooms = {
  name: string;
  equipment: Record<RoomEquipment, boolean>;
};

export const RoomsFactory = {
  singleRoom(overrides?: Partial<Rooms>): Rooms {
    return {
      name: 'Single',
      equipment: { tv: true, wifi: true, safe: true, radio: false },
      ...overrides,
    };
  },

  doubleRoom(overrides?: Partial<Rooms>): Rooms {
    return {
      name: 'Double',
      equipment: { tv: true, wifi: false, safe: true, radio: true },
      ...overrides,
    };
  },

  suiteRoom(overrides?: Partial<Rooms>): Rooms {
    return {
      name: 'Suite',
      equipment: { tv: false, wifi: true, safe: true, radio: true },
      ...overrides,
    };
  },
};
