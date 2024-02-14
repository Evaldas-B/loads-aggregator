import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { NavBar } from './NavBar'

const redirectAuthenticatedUsers = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

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
    <>
      <NavBar />
      <div className="p-3">{children}</div>
    </>
  )
}
