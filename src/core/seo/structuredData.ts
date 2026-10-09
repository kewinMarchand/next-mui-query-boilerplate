import { SITE } from '@/core/config'

import { absoluteUrl } from './buildMetadata'

export interface BreadcrumbItem {
  label: string
  href: string
}

export const breadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: absoluteUrl(item.href),
  })),
})

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.publisher.legalName,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/icons/icon-512.png'),
  email: SITE.publisher.email,
})

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: absoluteUrl('/'),
  inLanguage: 'fr-FR',
})

export const itemListJsonLd = (pagePath: string, names: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: names.map((name, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    url: absoluteUrl(`${pagePath}#produit-${index + 1}`),
  })),
})
