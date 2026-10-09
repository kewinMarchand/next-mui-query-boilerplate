import Box from '@mui/material/Box'

import { Footer } from './Footer'
import { Header } from './Header'
import { SkipLink } from './SkipLink'

import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export const AppShell = ({ children }: AppShellProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <SkipLink />
    <Header />
    <Box component="main" id="main" tabIndex={-1} sx={{ flexGrow: 1 }}>
      {children}
    </Box>
    <Footer />
  </Box>
)
