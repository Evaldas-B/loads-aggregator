import { Group } from '@mantine/core'

import Logo from './Logo'
import NavLink from './NavLink'
import MobileMenu from './MobileMenu'
import UserProfile from './UserProfile'
import { supabaseClient } from '@/utils/supabase/client'
import { cookies } from 'next/headers'

export async function NavBar() {
  const cookieStore = cookies()
  const supabase = supabaseClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="min-h-14 border-b px-4">
      <Group justify="space-between" h="100%">
        <Logo className="hidden md:block" />

        <Group h="100%" gap={0} visibleFrom="sm">
          <NavLink href="/">Loads</NavLink>
          <NavLink href="/transporters" disabled>
            Transporters
          </NavLink>
        </Group>

        <MobileMenu />

        <UserProfile user={user!} />
      </Group>
    </nav>
  )
}
