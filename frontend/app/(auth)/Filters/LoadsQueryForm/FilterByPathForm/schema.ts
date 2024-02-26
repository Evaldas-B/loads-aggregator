import { z } from 'zod'
import {
  defaultLocation,
  latLngTupleSchema,
  locationSchema,
} from '../formPrimitives'
import { ReadonlyURLSearchParams } from 'next/navigation'
import qs from 'qs'

export type LoadsQueryByPath = z.infer<typeof loadsQueryByPathSchema>
export const loadsQueryByPathSchema = z.object({
  queryType: z.literal('byPath').default('byPath'),

  waypoints: z
    .array(locationSchema)
    .default([defaultLocation, defaultLocation]),
  pathRadius: z.coerce.number().default(20),

  path: z.array(latLngTupleSchema).default([]),
})

export const emptyForm = loadsQueryByPathSchema.parse({})

export const getFormValuesFromSearchParams = (
  searchParams: string | ReadonlyURLSearchParams,
) => {
  const searchQuery = qs.parse(searchParams.toString(), {
    arrayLimit: 3000,
  }).search

  return (
    loadsQueryByPathSchema.nullable().catch(null).parse(searchQuery) ||
    emptyForm
  )
}
