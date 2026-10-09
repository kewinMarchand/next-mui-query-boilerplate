import { SITE } from '@/core/config'
import { buildMetadata } from '@/core/seo'
import { HomeView } from '@/domains/home'

import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: SITE.name,
  description: SITE.description,
  path: '/',
  isAbsoluteTitle: true,
})

export default function HomePage() {
  return <HomeView />
}
