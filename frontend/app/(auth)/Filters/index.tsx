'use client'

import { Button, Collapse, Divider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react'
import LoadsQueryForm from './LoadsQueryForm'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function LoadFilters() {
  const [opened, { toggle }] = useDisclosure(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    if (!opened && searchParams.get('search[queryType]')) toggle()
  }, [searchParams])

  return (
    <div className="rounded-lg border p-3 shadow-md">
      <div className="flex items-center justify-between ">
        <h4 className="text-lg font-medium">Filters</h4>
        <Button onClick={toggle}>
          {opened ? <IconCaretUpFilled /> : <IconCaretDownFilled />}
        </Button>
      </div>

      <Collapse in={opened}>
        <Divider className="my-3" />

        <LoadsQueryForm />
      </Collapse>
    </div>
  )
}
