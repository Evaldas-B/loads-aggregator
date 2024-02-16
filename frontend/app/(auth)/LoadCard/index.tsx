import { FilteredLoad } from '@/utils/supabase/queries/getFilteredLoads'
import { Divider } from '@mantine/core'
import { IconRoute } from '@tabler/icons-react'
import ShippingPrices from './ShippingPrices'
import LoadFactors from './LoadFactors'
import Location from './Location'
import DateCreated from './DateCreated'
import Contacts from './Contacts'

type Props = {
  load: FilteredLoad
}
export default function LoadCard({ load }: Props) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl ">
      <div className="flex">
        <div className="flex flex-grow flex-col gap-1">
          {/* PICKUP */}
          <p className="font-semibold text-neutral-400">Pickup:</p>

          {load.pickup?.map((loc) => <Location key={loc.id} location={loc} />)}

          {/* Delivery */}
          <p className="font-semibold text-neutral-400">Delivery:</p>
          {load.delivery.map((loc) => (
            <Location key={loc.id} location={loc} />
          ))}
        </div>

        <div className="flex flex-col items-end text-right">
          <div className="flex-grow">
            <ShippingPrices prices={load.shipping_prices} />
            <LoadFactors lf={load.load_factors} />
          </div>

          <Contacts load={load} />
        </div>
      </div>

      <Divider className="my-3" />
      <div className="flex gap-3 text-sm font-medium text-neutral-500">
        <DateCreated dateString={load.created_at} />

        <div className="flex items-center gap-1">
          <IconRoute className="h-5 w-5 text-neutral-500" />
          {Math.round(load.distance / 1000)} km
        </div>
      </div>
    </div>
  )
}
