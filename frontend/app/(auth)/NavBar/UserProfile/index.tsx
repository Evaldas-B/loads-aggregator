'use client'

import React, { useState } from 'react'
import { Avatar, UnstyledButton, Group, Text, Menu } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

type Props = {
  user: User
}

const supabase = createClient()

export default function UserProfile({ user }: Props) {
  const [, setUserMenuOpened] = useState(false)
  const router = useRouter()

  return (
    <>
      <Menu
        width={230}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton>
            <Group gap={7}>
              <Avatar alt={`Profile of ${user.email}`} radius="xl" size={25}>
                {user.email?.[0].toUpperCase()}
              </Avatar>
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user.email}
              </Text>
              <IconChevronDown className="h-4 w-4 stroke-2" />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={
              <IconSettings className="h-4 w-4 stroke-2 text-blue-500" />
            }
          >
            Account settings
          </Menu.Item>
          <Menu.Item
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/auth/signin')
            }}
            leftSection={
              <IconLogout className="h-4 w-4 stroke-2 text-red-500" />
            }
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
