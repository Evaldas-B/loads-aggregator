import { Button } from '@mantine/core'
import Link from 'next/link'

type Props = {
  className?: string
}

export default function NothingFound({ className = '' }: Props) {
  return (
    <div className={`${className} max-w-lg rounded-xl border p-5`}>
      <h4 className="text-center text-2xl font-medium">Nothing found</h4>
      <p className="mt-5 text-center">
        Update your search criteria or{' '}
        <Button size="compact-md" variant="light" component={Link} href="/">
          view all results
        </Button>
      </p>
    </div>
  )
}
