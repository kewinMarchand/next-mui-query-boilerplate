import { CATEGORY_TREE, categoryHref } from '@/core/config'

import {
  countFacets,
  filterProducts,
  paginate,
  sortProducts,
} from '../common/models/catalogFilters'
import { collectSlugs, resolveCategoryPath } from '../common/models/categories'

import type { Catalog } from '../common/models/catalog'

type Seed = [
  name: string,
  category: string,
  price: number,
  exposure: Catalog.Exposure,
  size: Catalog.Size,
  inStock: boolean,
]

const SEEDS: Seed[] = [
  ['Monstera deliciosa', 'monstera', 3490, 'mi-ombre', 'L', true],
  ['Monstera adansonii', 'monstera', 1990, 'mi-ombre', 'M', true],
  ['Monstera variegata', 'monstera', 8900, 'mi-ombre', 'S', false],
  ['Fougère de Boston', 'fougeres', 1590, 'ombre', 'M', true],
  ['Fougère nid d’oiseau', 'fougeres', 2290, 'ombre', 'S', true],
  ['Fougère arborescente', 'fougeres', 12900, 'mi-ombre', 'L', true],
  ['Anthurium rouge', 'anthurium', 2490, 'mi-ombre', 'M', true],
  ['Anthurium blanc', 'anthurium', 2690, 'mi-ombre', 'S', false],
  ['Anthurium clarinervium', 'anthurium', 4590, 'ombre', 'S', true],
  ['Strelitzia reginae', 'strelitzia', 3990, 'soleil', 'M', true],
  ['Strelitzia nicolai', 'strelitzia', 6990, 'soleil', 'L', true],
  ['Strelitzia juncea', 'strelitzia', 5490, 'soleil', 'M', false],
  ['Palmier de Chine', 'palmiers', 4990, 'soleil', 'L', true],
  ['Palmier nain', 'palmiers', 2990, 'soleil', 'S', true],
  ['Palmier bleu du Mexique', 'palmiers', 9900, 'soleil', 'L', true],
  ['Heliconia rostrata', 'heliconia', 3290, 'soleil', 'M', true],
  ['Heliconia psittacorum', 'heliconia', 2790, 'mi-ombre', 'M', true],
  ['Heliconia wagneriana', 'heliconia', 4490, 'soleil', 'L', false],
  ['Calliandra rouge', 'calliandra', 3590, 'soleil', 'M', true],
  ['Calliandra blanc', 'calliandra', 3790, 'soleil', 'S', true],
  ['Calliandra nain', 'calliandra', 2490, 'mi-ombre', 'S', true],
  ['Nénuphar blanc', 'nenuphars', 1890, 'soleil', 'S', true],
  ['Nénuphar rose', 'nenuphars', 2190, 'soleil', 'M', true],
  ['Lotus sacré', 'nenuphars', 2990, 'soleil', 'L', true],
]

const slugify = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const PRODUCTS: Catalog.Product[] = SEEDS.map(
  ([name, categorySlug, price, exposure, size, inStock], index) => ({
    id: String(index + 1),
    slug: slugify(name),
    name,
    categorySlug,
    price,
    exposure,
    size,
    inStock,
    image: (index % 12) + 1,
  }),
)

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
      const match = resolveCategoryPath(slugs, CATEGORY_TREE)
      if (!match) return reject(new Error(`Catégorie inconnue : ${slugs.join('/')}`))

      const branch = productsOfBranch(
        match.current ? [match.current] : CATEGORY_TREE,
        !match.current,
      )
      const filtered = sortProducts(filterProducts(branch, query), query.sort)
      const { items, page, pageCount } = paginate(filtered, query.page)

      resolve({
        products: items,
        total: filtered.length,
        page,
        pageCount,
        facets: countFacets(branch, query),
        subcategories: match.children.map((child) => ({
          href: categoryHref([...slugs, child.slug]),
          name: child.name,
          count: productsOfBranch([child], false).length,
        })),
      })
    }, LATENCY_MS),
  )
