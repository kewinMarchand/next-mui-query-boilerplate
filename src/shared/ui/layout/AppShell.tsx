import Box from '@mui/material/Box'

import { Footer } from './Footer'
import { Header } from './Header'
import { SkipLink } from './SkipLink'

import type { NavigationNode } from '@/shared/config'
import type { ReactNode } from 'react'

interface AppShellProps {
  categoryMenu: NavigationNode[]
  children: ReactNode
}

export const AppShell = ({ categoryMenu, children }: AppShellProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <SkipLink />
    <Header categoryMenu={categoryMenu} />
    <Box component="main" id="main" tabIndex={-1} sx={{ flexGrow: 1 }}>
      {children}
    </Box>
    <Footer />
  </Box>
)
