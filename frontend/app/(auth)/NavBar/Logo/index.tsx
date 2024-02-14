import Link from 'next/link'

type Props = {
  className?: string
}

export default function Logo({ className = '' }: Props) {
  return (
    <Link href="/" className={`${className} border p-1.5`}>
      <span className="font-bold">FVL</span> <span>Marketplace</span>
    </Link>
  )
}
