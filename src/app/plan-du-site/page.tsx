import { buildMetadata } from '@/core/seo'
import { SitemapView } from '@/domains/legal'

import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Plan du site',
  description:
    'Plan du site : liste de toutes les pages, générée depuis la configuration de navigation qui alimente aussi le sitemap XML.',
  path: '/plan-du-site',
})

export default function SitemapPage() {
  return <SitemapView />
}
