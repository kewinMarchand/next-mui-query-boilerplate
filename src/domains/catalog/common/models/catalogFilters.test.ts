import {
  countFacets,
  filterProducts,
  paginate,
  paginationWindow,
  sortProducts,
} from './catalogFilters'
import { DEFAULT_QUERY } from './catalogQuery'

import type { Catalog } from './catalog'

const product = (id: string, overrides: Partial<Catalog.Product>): Catalog.Product => ({
  id,
  slug: id,
  name: id,
  categorySlug: 'monstera',
  price: 1000,
  exposure: 'soleil',
  size: 'M',
  inStock: true,
  image: 1,
  ...overrides,
})

const PRODUCTS = [
  product('b', { exposure: 'soleil', size: 'S', price: 3000 }),
  product('a', { exposure: 'ombre', size: 'M', price: 1000, inStock: false }),
  product('c', { exposure: 'ombre', size: 'L', price: 2000 }),
]

describe('filterProducts', () => {
  it('combine exposition, prix en euros et disponibilité', () => {
    const result = filterProducts(PRODUCTS, {
      ...DEFAULT_QUERY,
      exposures: ['ombre'],
      priceMin: 15,
      inStock: true,
    })

    expect(result.map((item) => item.id)).toEqual(['c'])
  })
})

describe('countFacets', () => {
  it('compte chaque facette sur les résultats filtrés par les autres', () => {
    const facets = countFacets(PRODUCTS, { ...DEFAULT_QUERY, exposures: ['ombre'], sizes: ['S'] })

    expect(facets.exposure.map((facet) => facet.count)).toEqual([1, 0, 0])
    expect(facets.size.map((facet) => facet.count)).toEqual([0, 1, 1])
  })
})

describe('sortProducts', () => {
  it('trie par prix et par nom sans muter l’entrée', () => {
    expect(sortProducts(PRODUCTS, 'prix-asc').map((item) => item.id)).toEqual(['a', 'c', 'b'])
    expect(sortProducts(PRODUCTS, 'prix-desc').map((item) => item.id)).toEqual(['b', 'c', 'a'])
    expect(sortProducts(PRODUCTS, 'nom').map((item) => item.id)).toEqual(['a', 'b', 'c'])
    expect(PRODUCTS.map((item) => item.id)).toEqual(['b', 'a', 'c'])
  })
})

describe('paginate', () => {
  it('découpe par page et borne la page demandée', () => {
    const items = Array.from({ length: 25 }, (_, index) => index)

    expect(paginate(items, 3)).toEqual({ items: [24], page: 3, pageCount: 3 })
    expect(paginate(items, 9).page).toBe(3)
    expect(paginate([], 1)).toEqual({ items: [], page: 1, pageCount: 1 })
  })
})

describe('paginationWindow', () => {
  it('liste toutes les pages jusqu’à 7', () => {
    expect(paginationWindow(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('insère des ellipses au-delà de 7 pages', () => {
    expect(paginationWindow(5, 10)).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 10])
    expect(paginationWindow(1, 10)).toEqual([1, 2, 'ellipsis', 10])
    expect(paginationWindow(10, 10)).toEqual([1, 'ellipsis', 9, 10])
  })
})
