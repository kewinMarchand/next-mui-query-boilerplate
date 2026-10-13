import { listCatalogPaths } from '@/modules/catalog'
import { SITE, SITE_MAP } from '@/shared/config'

import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...SITE_MAP.map(({ href }) => href), ...(await listCatalogPaths())].map((href) => ({
    url: `${SITE.url}${href}`,
  }))
}
