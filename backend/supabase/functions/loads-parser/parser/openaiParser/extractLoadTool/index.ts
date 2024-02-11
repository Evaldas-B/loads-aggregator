import { ChatCompletionTool } from "https://deno.land/x/openai@v4.26.0/resources/mod.ts";
import z from "https://deno.land/x/zod@v3.22.4/index.ts";

export const extractLoadTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "extractLoad",
    description: "extract loading information from text",
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

        shipping_prices: {
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

export const locationSchema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  postcode: z.string().optional(),
});

export type LocationSchema = z.infer<typeof locationSchema>;

export const loadSchema = z.object({
  pickup: z.array(locationSchema),
  delivery: z.array(locationSchema),

  load_factors: z.array(z.number()).optional(),
  shipping_prices: z.array(z.number()).optional(),
});

export type LoadSchema = z.infer<typeof loadSchema>;
