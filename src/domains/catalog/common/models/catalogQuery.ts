import type { Catalog } from './catalog'

export type SearchParams = Record<string, string | string[] | undefined>

export const DEFAULT_QUERY: Catalog.Query = {
  exposures: [],
  sizes: [],
  priceMin: null,
  priceMax: null,
  inStock: false,
  sort: 'pertinence',
  view: 'grille',
  page: 1,
}

export const serializeCatalogQuery = (query: Catalog.Query) => {
  const params = new URLSearchParams()
  query.exposures.forEach((value) => params.append('exposition', value))
  query.sizes.forEach((value) => params.append('taille', value))
  if (query.priceMin !== null) params.set('prix_min', String(query.priceMin))
  if (query.priceMax !== null) params.set('prix_max', String(query.priceMax))
  if (query.inStock) params.set('en_stock', '1')
  if (query.sort !== DEFAULT_QUERY.sort) params.set('tri', query.sort)
  if (query.view !== DEFAULT_QUERY.view) params.set('vue', query.view)
  if (query.page > 1) params.set('page', String(query.page))
  return params
}

export const catalogHref = (path: string, query: Catalog.Query) => {
  const search = serializeCatalogQuery(query).toString()
  return search ? `${path}?${search}` : path
}

/** Tout changement de filtre ou de tri revient à la page 1 et conserve le reste. */
export const withFilters = (
  query: Catalog.Query,
  changes: Partial<Catalog.Query>,
): Catalog.Query => ({
  ...query,
  ...changes,
  page: 1,
})

export const clearFilters = (query: Catalog.Query): Catalog.Query => ({
  ...DEFAULT_QUERY,
  view: query.view,
})

export const countActiveFilters = (query: Catalog.Query) =>
  query.exposures.length +
  query.sizes.length +
  (query.priceMin !== null ? 1 : 0) +
  (query.priceMax !== null ? 1 : 0) +
  (query.inStock ? 1 : 0)

export const isFilteredOrSorted = (query: Catalog.Query) =>
  countActiveFilters(query) > 0 || query.sort !== DEFAULT_QUERY.sort
