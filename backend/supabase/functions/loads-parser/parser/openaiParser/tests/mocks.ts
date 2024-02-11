import { extractDataUsingLLM } from "../index.ts";

type OriginalFn = Awaited<typeof extractDataUsingLLM>;

const mockData = {
  mock1: {
    input: `
    Aachen, Rotterdam -> Hannover, Berlin LF3 1800Eur
      
    Munich, Vienna -> Zurich, Milan LF4 2000Eur

    John Doe
    John Doe GmbH
    +49 69 1234 5678
    john.doe@domain.com`,

    output: {
      loads: [{
        pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
        delivery: [{ city: "Hannover" }, { city: "Berlin" }],
        load_factors: [3],
        shipping_prices: [1800],
      }, {
        pickup: [{ city: "Munich" }, { city: "Vienna" }],
        delivery: [{ city: "Zurich" }, { city: "Milan" }],
        load_factors: [4],
        shipping_prices: [2000],
      }],
      contacts: {
        company: "John Doe GmbH",
        emails: ["john.doe@domain.com"],
        phones: ["+49 69 1234 5678"],
      },
    },
  },
} satisfies Record<
  string,
  { input: string; output: Awaited<ReturnType<OriginalFn>> }
>;

export const extractDataUsingLLMMock = (
  mockName: keyof typeof mockData,
): OriginalFn => {
  return async (_text) => mockData[mockName].output;
};
