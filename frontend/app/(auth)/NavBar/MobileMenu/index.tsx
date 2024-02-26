'use client'
import { useDisclosure } from '@mantine/hooks'

import { Divider, Burger, Drawer, ScrollArea } from '@mantine/core'
import NavLink from '../NavLink'
import Logo from '../Logo'

export default function MobileMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)

  return (
    <>
      <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<Logo />}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea>
          <Divider className="mb-2" />

          <NavLink href="/">Loads</NavLink>
          <NavLink href="/transporters" disabled>
            Transporters
          </NavLink>
        </ScrollArea>
      </Drawer>
    </>
  )
}
