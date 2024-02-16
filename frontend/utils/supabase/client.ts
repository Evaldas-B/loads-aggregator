import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/env/server'
import { Database } from 'backend/supabase/functions/databaseTypes'
const { url, anonKey } = env.supabase

export function createClient() {
  return createBrowserClient<Database>(url, anonKey)
}
