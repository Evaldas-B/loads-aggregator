import { supabaseClient } from '@/utils/supabase/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const redirectAuthenticatedUsers = async () => {
  const cookieStore = cookies()
  const supabase = supabaseClient(cookieStore)

  const { data: auth } = await supabase.auth.getUser()

  if (auth.user) return redirect('/')
}

export default async function AnonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await redirectAuthenticatedUsers()

  return <>{children}</>
}
