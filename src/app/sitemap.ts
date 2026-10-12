import { SITE, SITEMAP_ENTRIES } from '@/shared/config'

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ENTRIES.map(({ href }) => ({ url: `${SITE.url}${href}` }))
}
