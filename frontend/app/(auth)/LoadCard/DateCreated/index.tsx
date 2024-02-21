import { IconCalendarMonth } from '@tabler/icons-react'

type Props = {
  dateString: string
}

export default function DateCreated({ dateString }: Props) {
  const date = new Date(dateString)
  const time = date.toLocaleTimeString('lt')
  const formattedDate = date.toLocaleDateString('lt')

  return (
    <div className="flex items-center gap-1">
      <IconCalendarMonth className="h-5 w-5 text-neutral-500" />
      {time} {formattedDate}
    </div>
  )
}
