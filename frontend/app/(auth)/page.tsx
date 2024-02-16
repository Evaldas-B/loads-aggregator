import getFilteredLoads from '@/utils/supabase/queries/getFilteredLoads'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import LoadCard from './LoadCard'
import { Pagination } from '@mantine/core'

export default async function Home() {
  const cookiesStore = cookies()
  const supabase = createClient(cookiesStore)
  const { data: loads } = await getFilteredLoads({ supabase })

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden md:flex md:flex-row">
      <div className="min-h-[350px] border md:order-last md:w-1/2">
        {'<Map/>'}
      </div>

      <div className="flex flex-col gap-3 overflow-hidden md:w-1/2">
        <div className="min-h-20 border">{'<Filters/>'}</div>
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">
          {loads?.map((load) => <LoadCard key={load.id} load={load} />)}

          <Pagination total={10} className="mx-auto my-5" size="md" />
        </div>
      </div>
    </div>
  )
}
