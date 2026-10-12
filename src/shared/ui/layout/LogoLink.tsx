'use client'

import Box from '@mui/material/Box'
import { usePathname } from 'next/navigation'

import { SITE } from '@/shared/config'
import { Link, LogoMark } from '@/shared/ui/kit'

export const LogoLink = () => {
  const pathname = usePathname()

  return (
    <Box
      component={Link}
      href="/"
      aria-current={pathname === '/' ? 'page' : undefined}
      data-testid="layout-logo"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        minHeight: 44,
        color: 'inherit',
        textDecoration: 'none',
        typography: 'h6',
        fontWeight: 700,
        mr: 'auto',
      }}
    >
      <LogoMark size={36} />
      {SITE.name}
    </Box>
  )
}
