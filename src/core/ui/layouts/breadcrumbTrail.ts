import { SITE_MAP } from '@/core/config'

import type { BreadcrumbItem } from '@/core/seo'

const HOME: BreadcrumbItem = { label: 'Accueil', href: '/' }

export const buildBreadcrumb = (
  path: string,
  trailing: BreadcrumbItem[] = [],
): BreadcrumbItem[] => {
  const page = path === '/' ? undefined : SITE_MAP.find((item) => item.href === path)
  return [HOME, ...(page ? [page] : []), ...trailing]
}
