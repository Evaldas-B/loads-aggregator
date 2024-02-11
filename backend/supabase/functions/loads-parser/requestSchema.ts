import z from "https://deno.land/x/zod@v3.22.4/index.ts";

export const requestSchema = z.object({
  from: z.string().email(),
  subject: z.string().optional(),
  body: z.string().optional(),
  bodyHtml: z.string().optional(),
});

export type RequestSchema = z.infer<typeof requestSchema>;
