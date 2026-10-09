import type { CategoryNode } from '@/core/config'

export const EXPOSURES = ['soleil', 'mi-ombre', 'ombre'] as const
export const SIZES = ['S', 'M', 'L'] as const
export const SORTS = ['pertinence', 'prix-asc', 'prix-desc', 'nom'] as const
export const VIEWS = ['grille', 'liste'] as const
export const PAGE_SIZE = 12

export const EXPOSURE_LABELS: Record<Catalog.Exposure, string> = {
  soleil: 'Soleil',
  'mi-ombre': 'Mi-ombre',
  ombre: 'Ombre',
}

export const SORT_LABELS: Record<Catalog.Sort, string> = {
  pertinence: 'Pertinence',
  'prix-asc': 'Prix croissant',
  'prix-desc': 'Prix décroissant',
  nom: 'Nom',
}

export declare namespace Catalog {
  type Exposure = (typeof EXPOSURES)[number]
  type Size = (typeof SIZES)[number]
  type Sort = (typeof SORTS)[number]
  type View = (typeof VIEWS)[number]
  type Category = CategoryNode

  interface Product {
    id: string
    slug: string
    name: string
    categorySlug: string
    price: number
    exposure: Exposure
    size: Size
    inStock: boolean
    image: number
  }

  interface Query {
    exposures: Exposure[]
    sizes: Size[]
    priceMin: number | null
    priceMax: number | null
    inStock: boolean
    sort: Sort
    view: View
    page: number
  }

  interface Facet<T extends string> {
    value: T
    label: string
    count: number
  }

  interface Facets {
    exposure: Facet<Exposure>[]
    size: Facet<Size>[]
  }

  interface CategoryLink {
    href: string
    name: string
    count: number
  }

  interface Result {
    products: Product[]
    total: number
    page: number
    pageCount: number
    facets: Facets
  }
}

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100)
