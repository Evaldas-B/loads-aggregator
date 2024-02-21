import { supabaseClient } from '@/utils/supabase/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { NavBar } from './NavBar'

const redirectAuthenticatedUsers = async () => {
  const cookieStore = cookies()
  const supabase = supabaseClient(cookieStore)

  const { data: auth } = await supabase.auth.getUser()

  if (!auth.user) return redirect('/auth/signin')
}

export default async function AnonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await redirectAuthenticatedUsers()

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <NavBar />
      <main className="flex flex-grow flex-col overflow-hidden p-3">
        {children}
      </main>
    </div>
  )
}
