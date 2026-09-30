'use client'

import Button from '@mui/material/Button'
import { usePathname } from 'next/navigation'

import { Link } from '@/core/ui/ui-kit'

import type { NavigationItem } from '@/core/config'

export const NavLink = ({ href, label }: NavigationItem) => {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Button
      component={Link}
      href={href}
      color="inherit"
      aria-current={isActive ? 'page' : undefined}
      sx={{ fontWeight: isActive ? 700 : 400, textDecoration: isActive ? 'underline' : 'none' }}
    >
      {label}
    </Button>
  )
}
