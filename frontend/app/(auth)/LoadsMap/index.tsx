'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import { env } from '@/env/server'
import Map from 'react-map-gl'
import { FilteredLoad } from '@/utils/supabase/queries/getFilteredLoads'
import LoadsLayer from './LoadsLayer'
import { useState } from 'react'
import FiltersLayer from './FiltersLayer'

type Props = {
  loads: FilteredLoad[]
}

const initialViewState = {
  longitude: 17,
  latitude: 55,
  zoom: 3.4,
}
export default function LoadsMap({ loads }: Props) {
  const [activeLoadId, setActiveLoadId] = useState('')

  return (
    <Map
      mapboxAccessToken={env.mapbox.key}
      initialViewState={initialViewState}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      attributionControl={false}
      onClick={({ originalEvent }) => {
        if (!originalEvent.defaultPrevented) {
          setActiveLoadId('')
        }
      }}
    >
      <LoadsLayer
        loads={loads}
        activeLoadId={activeLoadId}
        setActiveLoadId={setActiveLoadId}
      />

      <FiltersLayer />
    </Map>
  )
}
