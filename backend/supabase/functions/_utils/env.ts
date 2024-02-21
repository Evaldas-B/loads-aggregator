import { load } from "https://deno.land/std@0.213.0/dotenv/mod.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const isTestEnvironment = Deno.mainModule.endsWith(".test.ts");

// If in test environment load in environment variables from .env file and set them in Deno environment
if (isTestEnvironment) {
  const envVars = await load({
    envPath: "./backend/supabase/functions/.env.local",
  });

  for (const key in envVars) {
    Deno.env.set(key, envVars[key]);
  }
}

const schema = z.object({
  openAI: z.object({
    key: z.string(),
  }),
  mapbox: z.object({
    key: z.string(),
  }),
  supabase: z.object({
    url: z.string(),
    anonKey: z.string(),
  }),
});

/**
 * Don't forget to [set secrets in production](https://supabase.com/docs/guides/functions/secrets#local-secrets)
 */
export const env = schema.parse({
  openAI: {
    key: Deno.env.get("OPEN_AI_KEY"),
  },
  mapbox: {
    key: Deno.env.get("MAPBOX_KEY"),
  },
  supabase: {
    url: Deno.env.get("SUPABASE_URL"),
    anonKey: Deno.env.get("SUPABASE_ANON_KEY"),
  },
});
