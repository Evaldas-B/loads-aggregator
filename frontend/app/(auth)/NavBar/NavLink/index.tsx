import Link from 'next/link'
import React from 'react'

type Props = {
  href: string
  children?: React.ReactNode
}

export default function NavLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="flex h-full min-h-10 items-center px-4 text-sm font-medium hover:bg-gray-100 md:px-2"
    >
      {children}
    </Link>
  )
}
