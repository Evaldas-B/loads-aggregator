'use client'

import React, { useMemo } from 'react'
import { extractMarkersFromLoads } from '../utils'
import { Marker } from 'react-map-gl'
import { FilteredLoad } from '@/utils/supabase/queries/getFilteredLoads'
import LineString from '../LineString'

type Props = {
  loads: FilteredLoad[]
  activeLoadId: string
  setActiveLoadId: React.Dispatch<React.SetStateAction<string>>
}

export default function LoadsLayer({
  loads,
  activeLoadId,
  setActiveLoadId,
}: Props) {
  const pickupLocations = useMemo(
    () => extractMarkersFromLoads(loads, 'pickup'),
    [loads],
  )

  const activeLoad = useMemo(
    () => loads.filter(({ id }) => id === activeLoadId),
    [loads, activeLoadId],
  )

  const activeLoadRoute = useMemo(
    () => activeLoad[0]?.route_coordinates,
    [activeLoad],
  ) as number[][]

  const deliveryMarkers = useMemo(
    () => extractMarkersFromLoads(activeLoad, 'delivery'),
    [activeLoad],
  )

  return (
    <>
      {pickupLocations.map((marker) => (
        <Marker
          key={marker.location_id}
          longitude={marker.lng!}
          latitude={marker.lat!}
          color="#0284c7"
          onClick={(event) => {
            event.originalEvent.preventDefault()
            setActiveLoadId(marker.load_id)
          }}
          style={{ cursor: 'pointer' }}
        />
      ))}

      {deliveryMarkers?.map((marker) => (
        <Marker
          key={marker.location_id}
          longitude={marker.lng!}
          latitude={marker.lat!}
          color="#059669"
        />
      ))}

      {activeLoadRoute && <LineString coordinates={activeLoadRoute} />}
    </>
  )
}
