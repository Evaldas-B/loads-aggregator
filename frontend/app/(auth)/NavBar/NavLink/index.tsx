import Link from 'next/link'
import React from 'react'

type Props = {
  href: string
  children?: React.ReactNode
  disabled?: boolean
}

export default function NavLink({ href, children, disabled = false }: Props) {
  return (
    <Link
      href={href}
      className={`${disabled ? 'pointer-events-none text-neutral-400' : ''} flex h-full min-h-10 items-center px-4 text-sm font-medium hover:bg-gray-100 md:px-2`}
    >
      {children}
    </Link>
  )
}
