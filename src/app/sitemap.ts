import { listCatalogPaths } from '@/modules/catalog'
import { SITE, SITE_MAP } from '@/shared/config'

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [...SITE_MAP.map(({ href }) => href), ...listCatalogPaths()].map((href) => ({
    url: `${SITE.url}${href}`,
  }))
}
