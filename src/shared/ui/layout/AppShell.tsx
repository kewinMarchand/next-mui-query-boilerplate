import { Suspense } from 'react'

import { isAudienceMeasurementEnabled, MatomoTracker } from '@/shared/observability'

import styles from './AppShell.module.css'
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
  <div className={styles.shell}>
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
    <main id="main" tabIndex={-1} className={styles.main}>
      {children}
    </main>
    <Footer />
  </div>
)
