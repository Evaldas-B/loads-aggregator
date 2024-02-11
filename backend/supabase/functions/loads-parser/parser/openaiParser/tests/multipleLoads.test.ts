import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts";
import { extractDataUsingLLM } from "../index.ts";

Deno.test(
  {
    name: "6 well structured loads, no contacts",
    ignore: !Deno.args.includes("--include-llm-tests"),
  },
  async () => {
    const fnCalls = await extractDataUsingLLM(
      `
    Aachen, Rotterdam -> Hannover, Berlin LF3 1800Eur

    Munich, Vienna -> Zurich, Milan LF4 2000Eur

    Paris, Lyon -> Frankfurt, Stuttgart LF3 2200Eur

    Copenhagen, Stockholm -> Hamburg, Bremen LF2 1600Eur

    Barcelona, Valencia -> Dusseldorf, Cologne LF3 2400Eur

    Budapest, Prague -> Amsterdam, Brussels LF3 1900Eur`,
    );

    assertEquals(fnCalls.contacts, undefined);
    assertEquals(fnCalls.loads.length, 6);

    assertEquals(fnCalls.loads[0], {
      pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
      delivery: [{ city: "Hannover" }, { city: "Berlin" }],
      load_factors: [3],
      shipping_prices: [1800],
    });

    assertEquals(fnCalls.loads[1], {
      pickup: [{ city: "Munich" }, { city: "Vienna" }],
      delivery: [{ city: "Zurich" }, { city: "Milan" }],
      load_factors: [4],
      shipping_prices: [2000],
    });

    assertEquals(fnCalls.loads[2], {
      pickup: [{ city: "Paris" }, { city: "Lyon" }],
      delivery: [{ city: "Frankfurt" }, { city: "Stuttgart" }],
      load_factors: [3],
      shipping_prices: [2200],
    });

    assertEquals(fnCalls.loads[3], {
      pickup: [{ city: "Copenhagen" }, { city: "Stockholm" }],
      delivery: [{ city: "Hamburg" }, { city: "Bremen" }],
      load_factors: [2],
      shipping_prices: [1600],
    });

    assertEquals(fnCalls.loads[4], {
      pickup: [{ city: "Barcelona" }, { city: "Valencia" }],
      delivery: [{ city: "Dusseldorf" }, { city: "Cologne" }],
      load_factors: [3],
      shipping_prices: [2400],
    });

    assertEquals(fnCalls.loads[5], {
      pickup: [{ city: "Budapest" }, { city: "Prague" }],
      delivery: [{ city: "Amsterdam" }, { city: "Brussels" }],
      load_factors: [3],
      shipping_prices: [1900],
    });
  },
);
