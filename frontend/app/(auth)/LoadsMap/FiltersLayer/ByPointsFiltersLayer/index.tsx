'use client'

import { useSearchParams } from 'next/navigation'
import Circle from '../../Circle'
import * as qs from 'qs'
import { useMemo } from 'react'
import { loadsQueryByPointsSchema } from '@/app/(auth)/Filters/LoadsQueryForm/FilterByPointsForm/schema'

export default function ByPointsFiltersLayer() {
  const searchParams = useSearchParams()
  const parsed = qs.parse(searchParams.toString()).search

  const filters = loadsQueryByPointsSchema.nullable().catch(null).parse(parsed)

  const pickupCoordinates = useMemo(
    () => filters?.pickup.coordinates || null,
    [filters],
  )
  const pickupRadius = useMemo(() => filters?.pickupRadius || null, [filters])

  const deliveryCoordinates = useMemo(
    () => filters?.delivery.coordinates || null,
    [filters],
  )
  const deliveryRadius = useMemo(
    () => filters?.deliveryRadius || null,
    [filters],
  )

  return (
    <>
      {pickupCoordinates && pickupRadius && (
        <Circle
          fillColor="#3b82f6"
          lineColor="#3b82f6"
          fillOpacity={0.25}
          coordinates={[pickupCoordinates.lng, pickupCoordinates.lat]}
          radius={pickupRadius}
        />
      )}

      {deliveryCoordinates && deliveryRadius && (
        <Circle
          fillColor="#047857"
          lineColor="#047857"
          fillOpacity={0.25}
          coordinates={[deliveryCoordinates.lng, deliveryCoordinates.lat]}
          radius={deliveryRadius}
        />
      )}
    </>
  )
}
