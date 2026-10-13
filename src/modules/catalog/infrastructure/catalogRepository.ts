import { ApiError } from '@/shared/api/client'
import { serverApiClient, staticApiClient } from '@/shared/api/client.server'

import { toCatalogPage, toCategory, toProductsQuery } from './http/catalogTranslation'

import type { Catalog } from '../domain/catalog'

export interface CatalogPage extends Catalog.Result {
  subcategories: Catalog.CategoryLink[]
}

export const findCategoryTree = async (): Promise<Catalog.Category[]> => {
  const { data, response } = await staticApiClient().GET('/api/categories')
  if (!data) throw new ApiError(response)
  return data.map(toCategory)
}

export const findCatalogPage = async (
  slugs: string[],
  query: Catalog.Query,
): Promise<CatalogPage> => {
  const { data, response } = await (
    await serverApiClient()
  ).GET('/api/products', {
    params: { query: toProductsQuery(slugs, query) },
  })
  if (!data) throw new ApiError(response)
  return toCatalogPage(data, slugs)
}
