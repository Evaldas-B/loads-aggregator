'use client'

import { Layer, Source } from 'react-map-gl'
import circle from '@turf/circle'
import { useMemo } from 'react'

type Props = {
  coordinates: [number, number]
  radius: number
  fillColor?: string
  fillOpacity?: number
  lineColor?: string
  lineWidth?: number
}

export default function Circle({
  coordinates,
  radius,
  fillColor = 'red',
  fillOpacity = 0.5,
  lineColor = 'red',
  lineWidth = 3,
}: Props) {
  const circleGeoJson = useMemo(
    () => circle(coordinates, radius),
    [coordinates, radius],
  )

  return (
    <Source type="geojson" data={circleGeoJson}>
      <Layer
        type="fill"
        paint={{ 'fill-opacity': fillOpacity, 'fill-color': fillColor }}
      />
      <Layer
        type="line"
        paint={{ 'line-width': lineWidth, 'line-color': lineColor }}
      />
    </Source>
  )
}
