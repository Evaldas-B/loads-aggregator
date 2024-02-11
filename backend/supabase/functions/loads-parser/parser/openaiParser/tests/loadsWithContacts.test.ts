import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts";
import { extractDataUsingLLM } from "../index.ts";

Deno.test(
  {
    name: "2 loads with contacts",
    ignore: !Deno.args.includes("--include-llm-tests"),
  },
  async () => {
    const fnCalls = await extractDataUsingLLM(
      `
      Aachen, Rotterdam -> Hannover, Berlin LF3 1800Eur
  
  
      Munich, Vienna -> Zurich, Milan LF4 2000Eur
  

      John Doe
      John Doe GmbH
      +49 69 1234 5678
      john.doe@domain.com
      `,
    );

    assertEquals(fnCalls.loads.length, 2);
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

    assertEquals(fnCalls.contacts, {
      company: "John Doe GmbH",
      emails: ["john.doe@domain.com"],
      phones: ["+49 69 1234 5678"],
    });
  },
);
