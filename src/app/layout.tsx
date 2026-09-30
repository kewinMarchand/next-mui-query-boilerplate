import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { Inter } from 'next/font/google'

import { SITE } from '@/core/config'
import { Providers } from '@/core/providers'
import { AppShell } from '@/core/ui/layouts'

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: '/',
    locale: SITE.locale,
  },
  twitter: { card: 'summary', title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: '#1d4ed8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
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
