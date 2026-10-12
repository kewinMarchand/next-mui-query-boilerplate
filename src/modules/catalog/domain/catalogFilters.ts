import { EXPOSURE_LABELS, EXPOSURES, PAGE_SIZE, SIZES } from './catalog'

import type { Catalog } from './catalog'

type Criteria = Omit<Catalog.Query, 'sort' | 'view' | 'page'>

const matches = (product: Catalog.Product, criteria: Criteria) =>
  (!criteria.exposures.length || criteria.exposures.includes(product.exposure)) &&
  (!criteria.sizes.length || criteria.sizes.includes(product.size)) &&
  (criteria.priceMin === null || product.price >= criteria.priceMin * 100) &&
  (criteria.priceMax === null || product.price <= criteria.priceMax * 100) &&
  (!criteria.inStock || product.inStock)

export const filterProducts = (products: Catalog.Product[], criteria: Criteria) =>
  products.filter((product) => matches(product, criteria))

/** Comptage disjonctif : chaque facette est comptée sur les résultats filtrés par les autres. */
export const countFacets = (products: Catalog.Product[], query: Catalog.Query): Catalog.Facets => {
  const withoutExposure = filterProducts(products, { ...query, exposures: [] })
  const withoutSize = filterProducts(products, { ...query, sizes: [] })

  return {
    exposure: EXPOSURES.map((value) => ({
      value,
      label: EXPOSURE_LABELS[value],
      count: withoutExposure.filter((product) => product.exposure === value).length,
    })),
    size: SIZES.map((value) => ({
      value,
      label: `Taille ${value}`,
      count: withoutSize.filter((product) => product.size === value).length,
    })),
  }
}

const COLLATOR = new Intl.Collator('fr')

export const sortProducts = (products: Catalog.Product[], sort: Catalog.Sort) => {
  const sorted = [...products]
  if (sort === 'prix-asc') sorted.sort((a, b) => a.price - b.price)
  if (sort === 'prix-desc') sorted.sort((a, b) => b.price - a.price)
  if (sort === 'nom') sorted.sort((a, b) => COLLATOR.compare(a.name, b.name))
  return sorted
}

export const paginate = <T>(items: T[], page: number, pageSize = PAGE_SIZE) => {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(page, pageCount)
  return {
    items: items.slice((current - 1) * pageSize, current * pageSize),
    page: current,
    pageCount,
  }
}

export type PaginationEntry = number | 'ellipsis'

const MAX_PAGES_WITHOUT_ELLIPSIS = 7

/** 1, courante − 1, courante, courante + 1, dernière, avec ellipses au-delà de 7 pages. */
export const paginationWindow = (current: number, pageCount: number): PaginationEntry[] => {
  if (pageCount <= MAX_PAGES_WITHOUT_ELLIPSIS) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const pages = [1, current - 1, current, current + 1, pageCount].filter(
    (page, index, all) => page >= 1 && page <= pageCount && all.indexOf(page) === index,
  )
  return pages.flatMap((page, index) => {
    const previous = pages[index - 1]
    return previous !== undefined && page - previous > 1 ? ['ellipsis' as const, page] : [page]
  })
}
