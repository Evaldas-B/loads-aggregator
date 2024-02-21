import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { createClient as createServerClient } from './server'
import { createClient } from './client'

export type Supabase = ReturnType<typeof supabaseClient>
export const supabaseClient = (cookies?: ReadonlyRequestCookies) => {
  if (cookies) return createServerClient(cookies)

  return createClient()
}
