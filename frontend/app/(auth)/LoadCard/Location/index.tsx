import { FilteredLoadLocation } from '@/utils/supabase/queries/getFilteredLoads'

type Props = {
  location: FilteredLoadLocation
}

export default function Location({
  location: { city, country, postcode },
}: Props) {
  return (
    <div className="text-sm font-medium">
      {city} {postcode} {country}
    </div>
  )
}
