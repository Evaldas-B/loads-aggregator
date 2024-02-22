import { Supabase } from '../../client'
import filterByPoints from './filterByPoints'
import filterByPath from './filterByPath'

export type FilteredLoad = Exclude<
  Awaited<ReturnType<typeof getFilteredLoads>>['data'],
  null
>[number]

export type FilteredLoadLocation = FilteredLoad['pickup'][number]

export default async function getFilteredLoads({
  searchParams,
  supabase,
}: {
  searchParams: Record<string, string>
  supabase: Supabase
}) {
  const query = supabase
    .from('agg_loads')
    .select(
      `
    *,
    route_coordinates, 
    pickup:agg_locations(*, lng, lat),
    delivery: agg_locations(*, lng, lat)
    `,
    )
    .eq('pickup.type', 'pickup')
    .eq('delivery.type', 'delivery')
    .order('created_at', { ascending: false })

  // Filter by pickup/delivery points
  const { data: filteredByPoints } = await filterByPoints({
    searchParams,
    supabase,
  })

  if (filteredByPoints) {
    const filteredLoadIds = filteredByPoints.map(({ load_id }) => load_id)

    query.in('id', filteredLoadIds)
    return query
  }

  // Filter by path radius
  const { data: filteredByPath } = await filterByPath({
    searchParams,
    supabase,
  })

  if (filteredByPath) {
    const filteredByPathIds = filteredByPath.map(({ load_id }) => load_id)

    query.in('id', filteredByPathIds)
    return query
  }

  // Return with no filters
  return query
}
