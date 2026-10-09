import { z } from 'zod'

import { EXPOSURES, SIZES, SORTS, VIEWS } from './catalog'

import type { Catalog } from './catalog'

export type SearchParams = Record<string, string | string[] | undefined>

const exposureSchema = z.enum(EXPOSURES)
const sizeSchema = z.enum(SIZES)
const priceSchema = z.coerce.number().int().min(0).nullable().catch(null)

const toArray = (value: string | string[] | undefined) =>
  value === undefined ? [] : Array.isArray(value) ? value : [value]

const first = (value: string | string[] | undefined) => toArray(value)[0]

const validValues = <T extends string>(
  schema: z.ZodType<T>,
  value: string | string[] | undefined,
) => [
  ...new Set(
    toArray(value).flatMap((item) => {
      const result = schema.safeParse(item)
      return result.success ? [result.data] : []
    }),
  ),
]

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

export const parseCatalogQuery = (params: SearchParams): Catalog.Query => {
  const price = (key: string) => {
    const raw = first(params[key])
    return raw === undefined || raw === '' ? null : priceSchema.parse(raw)
  }

  return {
    exposures: validValues(exposureSchema, params.exposition),
    sizes: validValues(sizeSchema, params.taille),
    priceMin: price('prix_min'),
    priceMax: price('prix_max'),
    inStock: first(params.en_stock) === '1',
    sort: z.enum(SORTS).catch('pertinence').parse(first(params.tri)),
    view: z.enum(VIEWS).catch('grille').parse(first(params.vue)),
    page: z.coerce
      .number()
      .int()
      .min(1)
      .catch(1)
      .parse(first(params.page) ?? 1),
  }
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
