import { SITE_MAP } from '@/shared/config'

import type { BreadcrumbItem } from '@/shared/seo'

const HOME: BreadcrumbItem = { label: 'Accueil', href: '/' }

export const buildBreadcrumb = (
  path: string,
  trailing: BreadcrumbItem[] = [],
): BreadcrumbItem[] => {
  const page = path === '/' ? undefined : SITE_MAP.find((item) => item.href === path)
  return [HOME, ...(page ? [page] : []), ...trailing]
}
