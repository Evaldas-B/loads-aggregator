'use client'

import { Button } from '@mantine/core'
import { IconMapPins, IconRoute } from '@tabler/icons-react'
import FilterByPointsForm from './FilterByPointsForm'
import FilterByPathForm from './FilterByPathForm'
import { useState } from 'react'

export default function LoadsQueryForm() {
  const [formType, setFormType] = useState<'byPoints' | 'byPath'>('byPoints')

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-3">
        {/* Form type toggler */}
        <Button
          variant={formType === 'byPoints' ? 'filled' : 'light'}
          onClick={() => setFormType('byPoints')}
        >
          <IconMapPins className="-ml-0.5 mr-1" /> By Points
        </Button>
        <Button
          variant={formType === 'byPath' ? 'filled' : 'light'}
          onClick={() => setFormType('byPath')}
        >
          <IconRoute className="-ml-0.5 mr-1" /> By Path
        </Button>
      </div>

      {/* Form */}
      {formType === 'byPoints' ? (
        <FilterByPointsForm classNames="flex-grow" />
      ) : (
        <FilterByPathForm classNames="flex-grow" />
      )}
    </div>
  )
}
