import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/env/server'

const { url, anonKey } = env.supabase

export function createClient() {
  return createBrowserClient(url, anonKey)
}
