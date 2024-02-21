'use client'

import { Button } from '@mantine/core'
import RadiusSlider from '../RadiusSlider'
import {
  LoadsQueryByPathFormProvider,
  initialLoadsQueryByPath,
  useLoadsQueryByPathForm,
} from './formContext'
import PlaceAutocomplete from '../PlaceAutocomplete'
import { useRouter } from 'next/navigation'
import * as qs from 'qs'
import { getDirections } from '@/utils/mapbox/getDirections'
import { LoadsQueryByPath } from './schema'

type Props = {
  classNames?: string
}

export default function FilterByPathsForm({ classNames = '' }: Props) {
  const router = useRouter()
  const form = useLoadsQueryByPathForm({
    initialValues: initialLoadsQueryByPath,
  })

  const submitForm = async (values: LoadsQueryByPath) => {
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
          <Button type="submit">Filter</Button>
        </div>
      </form>

      {/* TODO DELETE AFTER DONE TESTING */}
      {/* <div className="absolute bottom-10 right-0 top-10 h-screen w-1/2 border-4 border-red-500 bg-white">
        <pre className="whitespace-pre-wrap rounded-xl border p-3">
          <code>{JSON.stringify(form.values, null, 2)}</code>
        </pre>
      </div> */}
    </LoadsQueryByPathFormProvider>
  )
}
