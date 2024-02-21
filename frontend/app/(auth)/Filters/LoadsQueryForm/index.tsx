'use client'

import { Center, SegmentedControl } from '@mantine/core'
import { IconMapPins, IconRoute } from '@tabler/icons-react'
import FilterByPointsForm from './FilterByPointsForm'
import FilterByPathForm from './FilterByPathForm'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LoadsQueryForm() {
  const [formType, setFormType] = useState('byPoints')

  const searchParams = useSearchParams()

  useEffect(() => {
    setFormType(searchParams.get('search[queryType]') || 'byPoints')
  }, [searchParams])

  const segments = [
    {
      value: 'byPoints',
      label: (
        <Center style={{ gap: 10 }}>
          <IconMapPins />
          <span>By Points</span>
        </Center>
      ),
    },
    {
      value: 'byPath',
      label: (
        <Center style={{ gap: 10 }}>
          <IconRoute />
          <span>By Path</span>
        </Center>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      <SegmentedControl
        color="blue"
        className="mx-auto"
        value={formType}
        onChange={setFormType}
        data={segments}
      />

      {formType === 'byPoints' ? <FilterByPointsForm /> : <FilterByPathForm />}
    </div>
  )
}
