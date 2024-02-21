import { FilteredLoad } from '@/utils/supabase/queries/getFilteredLoads'

export const extractMarkersFromLoads = (
  loads: FilteredLoad[],
  type: 'pickup' | 'delivery',
) => {
  return loads.flatMap((load) =>
    load[type].flatMap(({ load_id, id, lng, lat }) => ({
      load_id,
      location_id: id,
      lng,
      lat,
    })),
  )
}
