import { categoryHref } from '@/core/config'
import { buildMetadata } from '@/core/seo'

import { isFilteredOrSorted } from '../common/models/catalogQuery'
import { resolveCategoryPath } from '../common/models/categories'
import { parseCatalogQuery } from '../common/models/parseCatalogQuery'

import type { SearchParams } from '../common/models/catalogQuery'
import type { Metadata } from 'next'

const ROOT_DESCRIPTION =
  'Catalogue de démonstration d’une jardinerie tropicale : plantes d’intérieur, d’extérieur et aquatiques, filtrables par exposition, taille, prix et stock.'

export const buildCatalogMetadata = (slugs: string[], searchParams: SearchParams): Metadata => {
  const match = resolveCategoryPath(slugs)
  if (!match) return { title: 'Page introuvable', robots: { index: false, follow: true } }

  const query = parseCatalogQuery(searchParams)
  const path = categoryHref(slugs)
  const name = match.current?.name
  const canonical = query.page > 1 ? `${path}?page=${query.page}` : path

  return buildMetadata({
    title: name ? `${name} · Catalogue` : 'Catalogue de plantes tropicales',
    description: name
      ? `${name} : sélection de plantes tropicales de démonstration, à filtrer par exposition, taille, prix et disponibilité, avec tri et pagination.`
      : ROOT_DESCRIPTION,
    path: canonical,
    noindex: isFilteredOrSorted(query),
  })
}
