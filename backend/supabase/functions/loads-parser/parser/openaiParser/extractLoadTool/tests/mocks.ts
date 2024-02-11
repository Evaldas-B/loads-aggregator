import { LoadSchema } from "../index.ts";

const loadMocks = {
  "Aachen -> Hannover": {
    loadMock: {
      pickup: [{ city: "Aachen" }],
      delivery: [{ city: "Hannover" }],
    },
    coordinatesMock: {
      pickup: [{ lng: 6.083862, lat: 50.776351 }],
      delivery: [{ lat: 52.374478, lng: 9.738553 }],
    },
  },

  "Aachen -> FR": {
    loadMock: {
      pickup: [{ city: "Aachen" }],
      delivery: [{ country: "FR" }],
    },
    coordinatesMock: {
      pickup: [{ lng: 6.083862, lat: 50.776351 }],
      delivery: [{ lng: 2.618786, lat: 47.824904 }],
    },
  },

  "Aachen, DE-52070 -> Hannover, DE-30177": {
    loadMock: {
      pickup: [{ city: "Aachen", postcode: "52070", country: "DE" }],
      delivery: [{ city: "Hannover", postcode: "30177", country: "DE" }],
    },
    coordinatesMock: {
      pickup: [{ lng: 6.087801, lat: 50.797538 }],
      delivery: [{ lng: 9.7713, lat: 52.400954 }],
    },
  },
} satisfies Record<string, {
  loadMock: LoadSchema;
  coordinatesMock: {
    pickup: { lng: number; lat: number }[];
    delivery: { lng: number; lat: number }[];
  };
}>;

type LoadName = keyof typeof loadMocks;

export const getLoadMock = <N extends LoadName>(
  loadName: N,
) => loadMocks[loadName];
