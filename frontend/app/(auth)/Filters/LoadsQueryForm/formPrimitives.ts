import { z } from 'zod'

export type LatLngTuple = z.infer<typeof latLngTupleSchema>
export const latLngTupleSchema = z.array(z.coerce.number())

export type LngLat = z.infer<typeof lngLatSchema>
export const lngLatSchema = z.object({
  lng: z.coerce.number(),
  lat: z.coerce.number(),
})

export type Location = z.infer<typeof locationSchema>
export const locationSchema = z.object({
  name: z.string(),
  coordinates: lngLatSchema.nullable().catch(null),
  inputText: z.string(),
})

export const defaultLocation: Location = {
  name: '',
  coordinates: null,
  inputText: '',
}
