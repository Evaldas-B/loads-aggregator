import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type cookies } from 'next/headers'
import { env } from '@/env/server'
import { Database } from 'backend/supabase/functions/databaseTypes'

const { url, anonKey } = env.supabase

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient<Database>(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
