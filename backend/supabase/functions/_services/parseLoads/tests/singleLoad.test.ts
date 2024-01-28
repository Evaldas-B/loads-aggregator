import { assertEquals } from "https://deno.land/std@0.213.0/assert/assert_equals.ts";
import { parseEmailWithLLM } from "../index.ts";

Deno.test({
  name: "Aachen -> Hannover",
  // ignore: !Deno.args.includes("--llm"),
}, async () => {
  const fnCalls = await parseEmailWithLLM("Aachen -> Hannover");

  assertEquals(fnCalls.length, 1);
  assertEquals(fnCalls, [
    {
      type: "function",
      id: fnCalls[0].id,
      function: {
        name: "parseLoad",
        arguments: {
          pickup: [{ city: "Aachen" }],
          delivery: [{ city: "Hannover" }],
        },
      },
    },
  ]);
});

Deno.test({
  name: "Aachen, Rotterdam -> Hannover",
  // ignore: !Deno.args.includes("--llm"),
}, async () => {
  const fnCalls = await parseEmailWithLLM("Aachen, Rotterdam -> Hannover");

  assertEquals(fnCalls.length, 1);
  assertEquals(fnCalls, [
    {
      type: "function",
      id: fnCalls[0].id,
      function: {
        name: "parseLoad",
        arguments: {
          pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
          delivery: [{ city: "Hannover" }],
        },
      },
    },
  ]);
});

Deno.test({
  name: "Aachen, Rotterdam -> Hannover, Berlin",
  // ignore: !Deno.args.includes("--llm"),
}, async () => {
  const fnCalls = await parseEmailWithLLM(
    "Aachen, Rotterdam -> Hannover, Berlin",
  );

  assertEquals(fnCalls.length, 1);
  assertEquals(fnCalls, [
    {
      type: "function",
      id: fnCalls[0].id,
      function: {
        name: "parseLoad",
        arguments: {
          pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
          delivery: [{ city: "Hannover" }, { city: "Berlin" }],
        },
      },
    },
  ]);
});

Deno.test({
  name: "Aachen, Rotterdam -> Hannover, Berlin LF3",
  // ignore: !Deno.args.includes("--llm"),
}, async () => {
  const fnCalls = await parseEmailWithLLM(
    "Aachen, Rotterdam -> Hannover, Berlin LF3",
  );

  assertEquals(fnCalls.length, 1);
  assertEquals(fnCalls, [
    {
      type: "function",
      id: fnCalls[0].id,
      function: {
        name: "parseLoad",
        arguments: {
          pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
          delivery: [{ city: "Hannover" }, { city: "Berlin" }],
          load_factors: [3],
        },
      },
    },
  ]);
});

Deno.test({
  name: "Aachen, Rotterdam -> Hannover, Berlin LF3 1800Eur",
  // ignore: !Deno.args.includes("--llm"),
}, async () => {
  const fnCalls = await parseEmailWithLLM(
    "Aachen, Rotterdam -> Hannover, Berlin LF3 1800Eur",
  );

  assertEquals(fnCalls.length, 1);
  assertEquals(fnCalls, [
    {
      type: "function",
      id: fnCalls[0].id,
      function: {
        name: "parseLoad",
        arguments: {
          pickup: [{ city: "Aachen" }, { city: "Rotterdam" }],
          delivery: [{ city: "Hannover" }, { city: "Berlin" }],
          load_factors: [3],
          prices: [1800],
        },
      },
    },
  ]);
});
