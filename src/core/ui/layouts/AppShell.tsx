import Container from '@mui/material/Container'

import { Footer } from './Footer'
import { Header } from './Header'
import { SkipLink } from './SkipLink'

import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export const AppShell = ({ children }: AppShellProps) => (
  <>
    <SkipLink />
    <Header />
    <Container component="main" id="main" tabIndex={-1} maxWidth="lg" sx={{ py: 4 }}>
      {children}
    </Container>
    <Footer />
  </>
)
