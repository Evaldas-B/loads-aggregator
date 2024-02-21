import {
  LoadsQueryByPoints,
  loadsQueryByPointsSchema,
} from '@/app/(auth)/Filters/LoadsQueryForm/FilterByPointsForm/schema'
import { Supabase } from '@/utils/supabase/client'
import { FunctionArgs } from '@/utils/supabase/utils'
import * as qs from 'qs'

const formatQuery = (query?: LoadsQueryByPoints | null) => {
  if (!query) return

  const formattedQuery: ByPickupDeliveryRadiusFilters = {}

  const pLng = query.pickup.coordinates?.lng
  const pLat = query.pickup.coordinates?.lat

  if (pLng && pLat && query.pickupRadius) {
    formattedQuery.pickup_center = `POINT(${pLng} ${pLat})`
    formattedQuery.pickup_radius = query.pickupRadius
  }

  const dLng = query.delivery.coordinates?.lng
  const dLat = query.delivery.coordinates?.lat

  if (dLng && dLat && query.deliveryRadius) {
    formattedQuery.delivery_center = `POINT(${dLng} ${dLat})`
    formattedQuery.delivery_radius = query.deliveryRadius
  }

  return formattedQuery
}

export type ByPickupDeliveryRadiusFilters =
  FunctionArgs<'filter_loads_by_pickup_delivery_radius'>
export default function filterByPoints({
  searchParams,
  supabase,
}: {
  searchParams: Record<string, string>
  supabase: Supabase
}) {
  const parsedSearchParams = qs.parse(searchParams).search

  const byPointsFilter = loadsQueryByPointsSchema
    .nullable()
    .catch(null)
    .parse(parsedSearchParams)

  if (!byPointsFilter) return { data: null }

  return supabase
    .rpc('filter_loads_by_pickup_delivery_radius', formatQuery(byPointsFilter))
    .select()
}
