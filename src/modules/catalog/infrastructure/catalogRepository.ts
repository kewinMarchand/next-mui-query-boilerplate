import { categoryHref } from '../domain/categoryPath'
import { childCategories, collectSlugs, findCategoryChain } from '../domain/categoryTree'
import { CATEGORY_TREE, PRODUCTS } from './in-memory/catalogData'
import { countFacets, filterProducts, paginate, sortProducts } from './in-memory/productSearch'

import type { Catalog } from '../domain/catalog'

const LATENCY_MS = 150

const productsOfBranch = (nodes: Catalog.Category[], isRoot: boolean) => {
  if (isRoot) return PRODUCTS
  const slugs = new Set(collectSlugs(nodes))
  return PRODUCTS.filter((product) => slugs.has(product.categorySlug))
}

export interface CatalogPage extends Catalog.Result {
  subcategories: Catalog.CategoryLink[]
}

export const findCatalogPage = (slugs: string[], query: Catalog.Query): Promise<CatalogPage> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const chain = findCategoryChain(CATEGORY_TREE, slugs)
      if (!chain) return reject(new Error(`Catégorie inconnue : ${slugs.join('/')}`))

      const current = chain.at(-1)
      const branch = productsOfBranch(current ? [current] : CATEGORY_TREE, !current)
      const filtered = sortProducts(filterProducts(branch, query), query.sort)
      const { items, page, pageCount } = paginate(filtered, query.page)

      resolve({
        products: items,
        total: filtered.length,
        page,
        pageCount,
        facets: countFacets(branch, query),
        subcategories: childCategories(CATEGORY_TREE, chain).map((child) => ({
          href: categoryHref([...slugs, child.slug]),
          name: child.name,
          count: productsOfBranch([child], false).length,
        })),
      })
    }, LATENCY_MS),
  )

export const findCategoryTree = (): Catalog.Category[] => CATEGORY_TREE
