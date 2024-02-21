'use client'

import { Button } from '@mantine/core'
import RadiusSlider from '../RadiusSlider'
import {
  LoadsQueryByPointsFormProvider,
  initialLoadsQueryByPoints,
  useLoadsQueryByPointsForm,
} from './formContext'
import PlaceAutocomplete from '../PlaceAutocomplete'
import * as qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoadsQueryByPoints, loadsQueryByPointsSchema } from './schema'

type Props = {
  classNames?: string
}

export default function FilterByPointsForm({ classNames = '' }: Props) {
  const router = useRouter()

  const searchParams = useSearchParams()
  const searchQuery = qs.parse(searchParams.toString()).search
  const initialValues = loadsQueryByPointsSchema
    .nullable()
    .catch(null)
    .parse(searchQuery)

  const form = useLoadsQueryByPointsForm({
    initialValues: initialValues || initialLoadsQueryByPoints,
  })

  const submitForm = (values: LoadsQueryByPoints) => {
    const stringified = qs.stringify({ search: values })
    router.push(`/?${stringified}`)
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
          <Button type="submit">Filter</Button>
        </div>
      </form>
    </LoadsQueryByPointsFormProvider>
  )
}
