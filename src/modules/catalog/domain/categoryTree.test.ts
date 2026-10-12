import { childCategories, collectSlugs, findCategoryChain } from './categoryTree'

import type { Catalog } from './catalog'

const node = (slug: string, children?: Catalog.Category[]): Catalog.Category => ({
  slug,
  name: slug,
  ...(children && { children }),
})

const TREE = [node('a', [node('a1', [node('a1x')]), node('a2')]), node('b')]

describe('arbre de catégories', () => {
  it('retrouve la chaîne des catégories d’un chemin', () => {
    expect(findCategoryChain(TREE, ['a', 'a1'])?.map((category) => category.slug)).toEqual([
      'a',
      'a1',
    ])
    expect(findCategoryChain(TREE, ['a', 'zz'])).toBeNull()
  })

  it('donne les enfants de la dernière catégorie, ou les racines', () => {
    expect(childCategories(TREE, [])).toBe(TREE)
    expect(childCategories(TREE, findCategoryChain(TREE, ['b']) ?? [])).toEqual([])
  })

  it('collecte tous les slugs d’une branche', () => {
    expect(collectSlugs(TREE.slice(0, 1))).toEqual(['a', 'a1', 'a1x', 'a2'])
  })
})
