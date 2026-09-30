import { MAIN_NAVIGATION, SITE } from '@/core/config'

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return MAIN_NAVIGATION.map(({ href }) => ({ url: `${SITE.url}${href}` }))
}
