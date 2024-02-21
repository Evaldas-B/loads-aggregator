import { z } from 'zod'
import { defaultLocation, locationSchema } from '../formPrimitives'

export type LoadsQueryByPoints = z.infer<typeof loadsQueryByPointsSchema>
export const loadsQueryByPointsSchema = z.object({
  queryType: z.literal('byPoints').default('byPoints'),

  pickup: locationSchema.default(defaultLocation),
  pickupRadius: z.coerce.number().default(30),

  delivery: locationSchema.default(defaultLocation),
  deliveryRadius: z.coerce.number().default(30),
})
