import { geocodingV6 } from '@/utils/mapbox'

export type PlaceAutocompleteOption = Awaited<
  ReturnType<typeof placeAutocompleteService>
>[number]

export default async function placeAutocompleteService(input: string) {
  if (!input) return []

  const geocodingResults = await geocodingV6
    .forwardGeocode({
      query: input,
      limit: 5,
      types: ['place'],
      bbox: [-11, 34.5, 41.5, 71.5], // Europe
    })
    .send()

  const { features } = geocodingResults.body

  return features.map(({ id, geometry, properties }) => {
    const [lng, lat] = geometry.coordinates
    const { name } = properties
    const country = properties.context.country?.name

    return {
      id,
      coordinates: { lng, lat },
      name,
      country: country,
    }
  })
}
