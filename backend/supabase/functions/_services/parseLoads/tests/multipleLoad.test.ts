import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.213.0/assert/mod.ts";
import { parseEmailWithLLM } from "../index.ts";

Deno.test(
  {
    name: "Aachen, Rotterdam -> Hannover, Berlin LF3 1800Eur",
    // ignore: !Deno.args.includes("--llm"),
  },
  async () => {
    const fnCalls = await parseEmailWithLLM(
      `
    Aachen, Rotterdam -> Hannover, Berlin LF3 1800Eur


    Munich, Vienna -> Zurich, Milan LF3 2000Eur


    Paris, Lyon -> Frankfurt, Stuttgart LF3 2200Eur


    Copenhagen, Stockholm -> Hamburg, Bremen LF3 1600Eur


    Barcelona, Valencia -> Dusseldorf, Cologne LF3 2400Eur


    Budapest, Prague -> Amsterdam, Brussels LF3 1900Eur`,
    );

    assertEquals(fnCalls.length, 6);
    assertArrayIncludes(fnCalls, [
      {
        type: "function",
        id: fnCalls[0].id,
        function: {
          name: "parseLoad",
          arguments: {
            pickup: [
              { city: "Aachen" },
              {
                city: "Rotterdam",
              },
            ],
            delivery: [
              { city: "Hannover" },
              {
                city: "Berlin",
              },
            ],
            load_factors: [3],
            prices: [1800],
          },
        },
      },
      {
        type: "function",
        id: fnCalls[1].id,
        function: {
          name: "parseLoad",
          arguments: {
            pickup: [
              { city: "Munich" },
              {
                city: "Vienna",
              },
            ],
            delivery: [
              { city: "Zurich" },
              {
                city: "Milan",
              },
            ],
            load_factors: [3],
            prices: [2000],
          },
        },
      },
      {
        type: "function",
        id: fnCalls[2].id,
        function: {
          name: "parseLoad",
          arguments: {
            pickup: [
              { city: "Paris" },
              {
                city: "Lyon",
              },
            ],
            delivery: [
              { city: "Frankfurt" },
              {
                city: "Stuttgart",
              },
            ],
            load_factors: [3],
            prices: [2200],
          },
        },
      },
      {
        type: "function",
        id: fnCalls[3].id,
        function: {
          name: "parseLoad",
          arguments: {
            pickup: [
              { city: "Copenhagen" },
              {
                city: "Stockholm",
              },
            ],
            delivery: [
              { city: "Hamburg" },
              {
                city: "Bremen",
              },
            ],
            load_factors: [3],
            prices: [1600],
          },
        },
      },
      {
        type: "function",
        id: fnCalls[4].id,
        function: {
          name: "parseLoad",
          arguments: {
            pickup: [
              { city: "Barcelona" },
              {
                city: "Valencia",
              },
            ],
            delivery: [
              { city: "Dusseldorf" },
              {
                city: "Cologne",
              },
            ],
            load_factors: [3],
            prices: [2400],
          },
        },
      },
      {
        type: "function",
        id: fnCalls[5].id,
        function: {
          name: "parseLoad",
          arguments: {
            pickup: [
              { city: "Budapest" },
              {
                city: "Prague",
              },
            ],
            delivery: [
              { city: "Amsterdam" },
              {
                city: "Brussels",
              },
            ],
            load_factors: [3],
            prices: [1900],
          },
        },
      },
    ]);
  },
);
