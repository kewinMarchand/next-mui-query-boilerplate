import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { Inter } from 'next/font/google'

import { SITE } from '@/core/config'
import { Providers } from '@/core/providers'
import { A11Y_MODE_SCRIPT } from '@/core/theme/a11yMode'
import { AppShell } from '@/core/ui/layouts'

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: A11Y_MODE_SCRIPT }} />
      </head>
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <AppShell>{children}</AppShell>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
