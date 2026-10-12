import { z } from 'zod'

import { EXPOSURES, SIZES, SORTS, VIEWS } from './catalog'

import type { Catalog } from './catalog'
import type { SearchParams } from './catalogQuery'

// Séparé de catalogQuery.ts pour que zod reste côté serveur : les composants client n'importent que les fonctions d'URL.
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
