import { Layer, Source } from 'react-map-gl'

type Props = {
  coordinates: number[][]
}
export default function LineString({ coordinates }: Props) {
  return (
    <Source
      type="geojson"
      data={{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      }}
    >
      <Layer
        id="lineLayer"
        type="line"
        source="my-data"
        paint={{
          'line-color': '#a3a3a3',
          'line-width': 5,
        }}
      />
    </Source>
  )
}
