type Props = {
  prices: number[] | null
}

export default function ShippingPrices({ prices }: Props) {
  return (
    <div className="text-xl font-medium text-neutral-500">
      {prices?.join('/') || '-'} €
    </div>
  )
}
