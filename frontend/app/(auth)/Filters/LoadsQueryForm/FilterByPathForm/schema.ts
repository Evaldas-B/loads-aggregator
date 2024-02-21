import { z } from 'zod'
import {
  defaultLocation,
  latLngTupleSchema,
  locationSchema,
} from '../formPrimitives'

export type LoadsQueryByPath = z.infer<typeof loadsQueryByPathSchema>
export const loadsQueryByPathSchema = z.object({
  queryType: z.literal('byPath').default('byPath'),

  waypoints: z
    .array(locationSchema)
    .default([defaultLocation, defaultLocation]),
  pathRadius: z.coerce.number().default(20),

  path: z.array(latLngTupleSchema).default([]),
})
