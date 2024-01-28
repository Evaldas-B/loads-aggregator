import { ChatCompletionTool } from "https://deno.land/x/openai@v4.26.0/resources/mod.ts";
import z from "https://deno.land/x/zod@v3.22.4/index.ts";

export const parseLoadTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "parseLoad",
    description: "Parse loading information from text",
    parameters: {
      type: "object",
      properties: {
        pickup: {
          type: "array",
          items: {
            type: "object",
            properties: {
              city: {
                type: "string",
              },
              country: {
                type: "string",
                description: "Optional, 2 letter code",
              },
            },
          },
        },
        delivery: {
          type: "array",
          items: {
            type: "object",
            properties: {
              city: {
                type: "string",
              },
              country: {
                type: "string",
                description: "Optional, 2 letter code",
              },
            },
          },
        },
        load_factors: {
          type: "array",
          description: "Can be expressed as LF3 or LF3/4 or LF3/LF4 or similar",
          items: {
            type: "number",
          },
        },

        prices: {
          type: "array",
          description: "Shipping price",
          items: {
            type: "number",
          },
        },
      },
      required: [],
    },
  },
} as const;

const location = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  postcode: z.string().optional(),
});

export const loadSchema = z.object({
  pickup: z.array(location),
  delivery: z.array(location),

  load_factors: z.array(z.number()).optional(),
}).nullable().catch(null);

export type LoadSchema = z.infer<typeof loadSchema>;
