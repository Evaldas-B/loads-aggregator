import { z } from 'zod'
import { defaultLocation, locationSchema } from '../formPrimitives'
import qs from 'qs'
import { ReadonlyURLSearchParams } from 'next/navigation'

export type LoadsQueryByPoints = z.infer<typeof loadsQueryByPointsSchema>
export const loadsQueryByPointsSchema = z.object({
  queryType: z.literal('byPoints').default('byPoints'),

  pickup: locationSchema.default(defaultLocation),
  pickupRadius: z.coerce.number().default(30),

  delivery: locationSchema.default(defaultLocation),
  deliveryRadius: z.coerce.number().default(30),
})

export const emptyForm = loadsQueryByPointsSchema.parse({})

export const getFormValuesFromSearchParams = (
  searchParams: string | ReadonlyURLSearchParams,
) => {
  const searchQuery = qs.parse(searchParams.toString()).search

  return (
    loadsQueryByPointsSchema.nullable().catch(null).parse(searchQuery) ||
    emptyForm
  )
}
