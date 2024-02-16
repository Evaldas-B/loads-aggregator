'use client'
import { FilteredLoad } from '@/utils/supabase/queries/getFilteredLoads'
import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Divider } from '@mantine/core'
import { IconMail, IconPhone } from '@tabler/icons-react'

type Props = {
  load: FilteredLoad
}

export default function Contacts({ load }: Props) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal opened={opened} onClose={close} title="Contacts">
        <p className="text-xl font-semibold text-neutral-500">{load.company}</p>

        {load.company && <Divider className="my-3" />}

        <div className="grid grid-cols-2 gap-3">
          {load.phones?.map((phone) => (
            <div
              key={phone}
              className="flex items-center gap-1 text-neutral-500"
            >
              <IconPhone className="h-5 w-5" />
              <a href={`tel: ${phone}`} className="text-blue-400 underline">
                {phone}
              </a>
            </div>
          ))}
          {load.emails?.map((email) => (
            <div
              key={email}
              className="flex items-center gap-1 text-neutral-500"
            >
              <IconMail className="h-5 w-5" />
              <a href={`mailto:${email}`} className="text-blue-400 underline">
                {email}
              </a>
            </div>
          ))}
        </div>
      </Modal>

      <Button onClick={open} variant="light">
        Contacts
      </Button>
    </>
  )
}
