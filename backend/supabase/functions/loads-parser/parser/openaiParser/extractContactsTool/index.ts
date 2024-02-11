import { ChatCompletionTool } from "https://deno.land/x/openai@v4.26.0/resources/mod.ts";
import z from "https://deno.land/x/zod@v3.22.4/index.ts";

export const extractContactsTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "extractContacts",
    description: "Extract contacts information from the text",
    parameters: {
      type: "object",
      properties: {
        company: {
          type: "string",
        },
        emails: {
          type: "array",
          items: {
            type: "string",
          },
        },
        phones: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: [],
    },
  },
} as const;

export const contactsSchema = z.object({
  company: z.string().optional(),
  emails: z.array(z.string()).optional(),
  phones: z.array(z.string()).optional(),
});

export type ContactsSchema = z.infer<typeof contactsSchema>;
