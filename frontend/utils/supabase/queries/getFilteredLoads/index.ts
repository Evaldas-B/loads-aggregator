import { createClient } from '../../client'

const supabaseClient = createClient()

type SupabaseClient = ReturnType<typeof createClient>

export type FilteredLoad = Exclude<
  Awaited<ReturnType<typeof getFilteredLoads>>['data'],
  null
>[number]

export type FilteredLoadLocation = FilteredLoad['pickup'][number]

export default function getFilteredLoads(
  {
    supabase,
  }: {
    supabase: SupabaseClient
  } = { supabase: supabaseClient },
) {
  return supabase
    .from('agg_loads')
    .select(
      `
    *, 
    pickup:agg_locations(*),
    delivery: agg_locations(*)
    `,
    )
    .eq('pickup.type', 'pickup')
    .eq('delivery.type', 'delivery')
}
