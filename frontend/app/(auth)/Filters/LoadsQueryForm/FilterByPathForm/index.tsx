'use client'

import { Button } from '@mantine/core'
import RadiusSlider from '../RadiusSlider'
import {
  LoadsQueryByPathFormProvider,
  useLoadsQueryByPathForm,
  validate,
} from './formContext'
import PlaceAutocomplete from '../PlaceAutocomplete'
import { useRouter, useSearchParams } from 'next/navigation'
import * as qs from 'qs'
import { getDirections } from '@/utils/mapbox/getDirections'
import {
  LoadsQueryByPath,
  emptyForm,
  getFormValuesFromSearchParams,
} from './schema'
import { useEffect, useState } from 'react'

type Props = {
  classNames?: string
}

export default function FilterByPathsForm({ classNames = '' }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const searchParams = useSearchParams()

  useEffect(() => {
    form.setValues(getFormValuesFromSearchParams(searchParams))
  }, [searchParams])

  const form = useLoadsQueryByPathForm({
    initialValues: emptyForm,
    validate,
  })

  const submitForm = async (values: LoadsQueryByPath) => {
    setIsLoading(true)

    const waypoints = form.values.waypoints.map((loc) => {
      const lng = loc.coordinates!.lng
      const lat = loc.coordinates!.lat

      const coordinates: [number, number] = [lng, lat]
      return { coordinates }
    })

    const path = await getDirections(waypoints)
    form.setFieldValue('path', path)

    const stringified = qs.stringify({ search: { ...values, path } })
    router.push(`/?${stringified}`)
    setIsLoading(false)
  }

  return (
    <LoadsQueryByPathFormProvider form={form}>
      <form
        onSubmit={form.onSubmit(submitForm)}
        className={`${classNames} grid gap-3 md:grid-cols-2`}
      >
        <PlaceAutocomplete
          label="Starting point"
          inputPropsInputText={form.getInputProps('waypoints.0.inputText')}
          inputPropsName={form.getInputProps('waypoints.0.name')}
          inputPropsCoordinates={form.getInputProps('waypoints.0.coordinates')}
          className="md:order-1"
        />

        <PlaceAutocomplete
          label="Finish point"
          inputPropsInputText={form.getInputProps('waypoints.1.inputText')}
          inputPropsName={form.getInputProps('waypoints.1.name')}
          inputPropsCoordinates={form.getInputProps('waypoints.1.coordinates')}
          className="md:order-3"
        />

        <RadiusSlider
          label="Path radius"
          className="md:order-2"
          formInputProps={form.getInputProps('pathRadius')}
        />

        <div className="order-last col-span-full flex justify-end gap-3 self-end">
          <Button
            onClick={() => {
              form.reset()
              router.push('/')
            }}
          >
            Clear
          </Button>
          <Button type="submit" loading={isLoading}>
            Filter
          </Button>
        </div>
      </form>
    </LoadsQueryByPathFormProvider>
  )
}
