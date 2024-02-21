import {
  LoadsQueryByPath,
  loadsQueryByPathSchema,
} from '@/app/(auth)/Filters/LoadsQueryForm/FilterByPathForm/schema'
import { Supabase } from '@/utils/supabase/client'
import { FunctionArgs } from '@/utils/supabase/utils'
import * as qs from 'qs'

const formatQuery = (query?: LoadsQueryByPath | null) => {
  if (!query) return

  const formattedQuery: ByPathRadiusFilters = {}

  const pathCoordinates = query.path.map(([lng, lat]) => `${lng} ${lat}`)

  formattedQuery.path = `LineString(${pathCoordinates.join(',')})`
  formattedQuery.radius = query.pathRadius

  return formattedQuery
}

export type ByPathRadiusFilters = FunctionArgs<'filter_loads_by_path_radius'>
export default function filterByPath({
  searchParams,
  supabase,
}: {
  searchParams: Record<string, string>
  supabase: Supabase
}) {
  const parsedSearchParams = qs.parse(searchParams, { arrayLimit: 3000 })
    .search as Record<string, string>

  const byPathRadiusFilter = loadsQueryByPathSchema
    .nullable()
    .catch(null)
    .parse(parsedSearchParams)

  if (!byPathRadiusFilter) return { data: null }

  return supabase
    .rpc('filter_loads_by_path_radius', formatQuery(byPathRadiusFilter))
    .select()
}
