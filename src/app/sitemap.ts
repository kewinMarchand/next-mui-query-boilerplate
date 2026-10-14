import { SITE, SITE_MAP } from '@/shared/config'

import { listCatalogPaths } from '@/modules/catalog'

import type { MetadataRoute } from 'next'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...SITE_MAP.map(({ href }) => href), ...(await listCatalogPaths())].map((href) => ({
    url: `${SITE.url}${href}`,
  }))
}
