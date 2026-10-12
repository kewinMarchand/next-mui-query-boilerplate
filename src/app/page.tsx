import { SITE } from '@/shared/config'
import { buildMetadata } from '@/shared/seo'
import { HomeView } from '@/views/home'

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
