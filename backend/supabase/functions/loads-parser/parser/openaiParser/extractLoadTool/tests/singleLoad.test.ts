import { assertEquals } from "https://deno.land/std@0.213.0/assert/assert_equals.ts";
import { extractDataUsingLLM } from "../../index.ts";

Deno.test({
  name: "Aachen -> Hannover",
  ignore: !Deno.args.includes("--include-llm-tests"),
}, async () => {
  const fnCalls = await extractDataUsingLLM("Aachen -> Hannover");

  assertEquals(fnCalls.contacts, undefined);

  assertEquals(fnCalls.loads.length, 1);
  assertEquals(fnCalls.loads, [{
    pickup: [{ city: "Aachen" }],
    delivery: [{ city: "Hannover" }],
  }]);
});

Deno.test({
  name: "Aachen, Rotterdam -> Hannover",
  ignore: !Deno.args.includes("--include-llm-tests"),
}, async () => {
  const fnCalls = await extractDataUsingLLM("Aachen, Rotterdam -> Hannover");

  assertEquals(fnCalls.contacts, undefined);

  assertEquals(fnCalls.loads.length, 1);
  assertEquals(fnCalls.loads, [{
    pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
    delivery: [{ city: "Hannover" }],
  }]);
});

Deno.test({
  name: "Aachen, Rotterdam -> Hannover, Berlin",
  ignore: !Deno.args.includes("--include-llm-tests"),
}, async () => {
  const fnCalls = await extractDataUsingLLM(
    "Aachen, Rotterdam -> Hannover, Berlin",
  );

  assertEquals(fnCalls.contacts, undefined);

  assertEquals(fnCalls.loads.length, 1);
  assertEquals(fnCalls.loads, [{
    pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
    delivery: [{ city: "Hannover" }, { city: "Berlin" }],
  }]);
});

Deno.test({
  name: "Aachen, Rotterdam -> Hannover, Berlin LF3",
  ignore: !Deno.args.includes("--include-llm-tests"),
}, async () => {
  const fnCalls = await extractDataUsingLLM(
    "Aachen, Rotterdam -> Hannover, Berlin LF3",
  );

  assertEquals(fnCalls.contacts, undefined);

  assertEquals(fnCalls.loads.length, 1);
  assertEquals(fnCalls.loads, [{
    pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
    delivery: [{ city: "Hannover" }, { city: "Berlin" }],
    load_factors: [3],
  }]);
});

Deno.test({
  name: "Aachen, Rotterdam -> Hannover, Berlin LF3 1800Eur",
  ignore: !Deno.args.includes("--include-llm-tests"),
}, async () => {
  const fnCalls = await extractDataUsingLLM(
    "Aachen, Rotterdam -> Hannover, Berlin LF3 1800Eur",
  );

  assertEquals(fnCalls.contacts, undefined);

  assertEquals(fnCalls.loads.length, 1);
  assertEquals(fnCalls.loads, [{
    pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
    delivery: [{ city: "Hannover" }, { city: "Berlin" }],
    load_factors: [3],
    shipping_prices: [1800],
  }]);
});
