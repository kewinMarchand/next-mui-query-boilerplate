/**
 * Simulateur de l'API : filtre, comptage disjonctif, tri et pagination appartiennent au
 * fournisseur. Au branchement de l'API, ce dossier disparaît ou ne sert plus qu'aux tests.
 */
import { EXPOSURES, PAGE_SIZE, SIZES } from '@/modules/catalog/domain/catalog'
import { eurosToCents } from '@/modules/catalog/domain/price'

import type { Catalog } from '@/modules/catalog/domain/catalog'

type Criteria = Omit<Catalog.Query, 'sort' | 'view' | 'page'>

const matches = (product: Catalog.Product, criteria: Criteria) =>
  (!criteria.exposures.length || criteria.exposures.includes(product.exposure)) &&
  (!criteria.sizes.length || criteria.sizes.includes(product.size)) &&
  (criteria.priceMin === null || product.price >= eurosToCents(criteria.priceMin)) &&
  (criteria.priceMax === null || product.price <= eurosToCents(criteria.priceMax)) &&
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
      count: withoutExposure.filter((product) => product.exposure === value).length,
    })),
    size: SIZES.map((value) => ({
      value,
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
