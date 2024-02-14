import { z } from 'zod'

const envSchema = z.object({
  isTestEnv: z.coerce.boolean(),

  supabase: z.object({
    url: z.string(),
    anonKey: z.string(),
  }),
})

export const env = envSchema.parse({
  // Is set to true when launched by vitest
  isTestEnv: process.env.VITEST,

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
})
