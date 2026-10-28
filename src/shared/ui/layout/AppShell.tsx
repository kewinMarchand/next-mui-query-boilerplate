import Box from '@mui/material/Box'
import { Suspense } from 'react'

import { isAudienceMeasurementEnabled, MatomoTracker } from '@/shared/observability'

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
    {isAudienceMeasurementEnabled && (
      // Avant la page : React exécute les effets dans l'ordre du rendu, ceux du traceur (dont
      // disableCookies) passent ainsi avant ceux d'une page qui envoie un événement au chargement.
      // useSearchParams impose une frontière Suspense sur les pages statiques.
      <Suspense fallback={null}>
        <MatomoTracker />
      </Suspense>
    )}
    <SkipLink />
    <Header categoryMenu={categoryMenu} />
    <Box component="main" id="main" tabIndex={-1} sx={{ flexGrow: 1 }}>
      {children}
    </Box>
    <Footer />
  </Box>
)
