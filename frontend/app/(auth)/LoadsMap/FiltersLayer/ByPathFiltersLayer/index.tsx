import { useSearchParams } from 'next/navigation'
import * as qs from 'qs'
import buffer from '@turf/buffer'
import { lineString } from '@turf/helpers'
import { Layer, Source } from 'react-map-gl'
import { loadsQueryByPathSchema } from '@/app/(auth)/Filters/LoadsQueryForm/FilterByPathForm/schema'

export default function ByPathFiltersLayer() {
  const searchParams = useSearchParams()
  const parsed = qs.parse(searchParams.toString(), { arrayLimit: 3000 }).search

  const filters = loadsQueryByPathSchema.nullable().catch(null).parse(parsed)

  if (!filters?.path || !filters.pathRadius) return null

  const line = lineString(filters.path)
  const radius = filters.pathRadius

  const bufferedLine = buffer(line, radius)

  return (
    <Source type="geojson" data={bufferedLine}>
      <Layer
        type="fill"
        paint={{ 'fill-opacity': 0.3, 'fill-color': '#047857' }}
      />
      <Layer type="line" paint={{ 'line-width': 3, 'line-color': '#047857' }} />
    </Source>
  )
}
