import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { Inter } from 'next/font/google'

import { getCategoryMenu } from '@/modules/catalog'
import { SITE } from '@/shared/config'
import { Providers } from '@/shared/providers'
import { A11Y_MODE_SCRIPT } from '@/shared/ui/a11y-mode/a11yMode'
import { AppShell } from '@/shared/ui/layout'

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

// Chaque page lit l'API à la requête (menu de catégories, X-Scenario relayé) : rendu dynamique
// déclaré, sans pré-rendu au build qui buterait sur headers().
export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: '#1d4ed8',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: A11Y_MODE_SCRIPT }} />
      </head>
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <AppShell categoryMenu={await getCategoryMenu()}>{children}</AppShell>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
