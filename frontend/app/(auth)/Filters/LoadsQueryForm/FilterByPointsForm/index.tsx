'use client'

import { Button } from '@mantine/core'
import RadiusSlider from '../RadiusSlider'
import {
  LoadsQueryByPointsFormProvider,
  useLoadsQueryByPointsForm,
  validate,
} from './formContext'
import PlaceAutocomplete from '../PlaceAutocomplete'
import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  LoadsQueryByPoints,
  emptyForm,
  getFormValuesFromSearchParams,
} from './schema'
import { useEffect, useState } from 'react'

type Props = {
  classNames?: string
}

export default function FilterByPointsForm({ classNames = '' }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const searchParams = useSearchParams()

  useEffect(() => {
    form.setValues(getFormValuesFromSearchParams(searchParams))
  }, [searchParams])

  const form = useLoadsQueryByPointsForm({
    initialValues: emptyForm,
    validate,
  })

  const submitForm = (values: LoadsQueryByPoints) => {
    setIsLoading(true)

    const stringified = qs.stringify({ search: values })
    router.push(`/?${stringified}`)

    setIsLoading(false)
  }

  return (
    <LoadsQueryByPointsFormProvider form={form}>
      <form
        onSubmit={form.onSubmit(submitForm)}
        className={`${classNames} grid gap-3 md:grid-cols-2`}
      >
        <PlaceAutocomplete
          label="Pickup"
          inputPropsInputText={form.getInputProps('pickup.inputText')}
          inputPropsName={form.getInputProps('pickup.name')}
          inputPropsCoordinates={form.getInputProps('pickup.coordinates')}
          className="md:order-1"
        />

        <RadiusSlider
          label="Pickup radius"
          className="md:order-3"
          formInputProps={form.getInputProps('pickupRadius')}
        />

        <PlaceAutocomplete
          label="Delivery"
          inputPropsInputText={form.getInputProps('delivery.inputText')}
          inputPropsName={form.getInputProps('delivery.name')}
          inputPropsCoordinates={form.getInputProps('delivery.coordinates')}
          className="md:order-2"
        />

        <RadiusSlider
          label="Delivery radius"
          className="md:order-4"
          formInputProps={form.getInputProps('deliveryRadius')}
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
    </LoadsQueryByPointsFormProvider>
  )
}
