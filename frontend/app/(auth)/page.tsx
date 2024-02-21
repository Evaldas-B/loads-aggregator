import getFilteredLoads from '@/utils/supabase/queries/getFilteredLoads'
import { cookies } from 'next/headers'
import LoadCard from './LoadCard'
import { Pagination } from '@mantine/core'
import LoadFilters from './Filters'
import LoadsMap from './LoadsMap'
import { supabaseClient } from '@/utils/supabase/client'

type Props = {
  searchParams: Record<string, string>
}

export default async function Home({ searchParams }: Props) {
  const cookiesStore = cookies()
  const supabase = supabaseClient(cookiesStore)
  const { data: loads } = await getFilteredLoads({ searchParams, supabase })

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto md:flex md:flex-row md:overflow-hidden">
      <div className="min-h-[350px] overflow-hidden rounded-lg md:order-last md:w-1/2">
        <LoadsMap loads={loads || []} />
      </div>

      <div className="flex flex-col gap-3 md:w-1/2 md:overflow-hidden">
        <LoadFilters />
        <div className="flex flex-col gap-3 md:overflow-y-auto">
          {loads?.map((load) => <LoadCard key={load.id} load={load} />)}

          <Pagination total={10} className="mx-auto my-5" size="md" />
        </div>
      </div>
    </div>
  )
}
