import {
  categoryHref,
  categoryTrail,
  listCategoryPaths,
  resolveCategoryPath,
  subcategoryLinks,
  toCategoryMenu,
} from './categoryPath'

import type { Catalog } from './catalog'

const node = (slug: string, children?: Catalog.Category[]): Catalog.Category => ({
  slug,
  name: slug.toUpperCase(),
  ...(children && { children }),
})

const TREE = [
  node('a', [node('a1', [node('a1x', [node('a1x9')]), node('a1y')]), node('a2')]),
  node('b'),
]

describe('chemin de catégorie', () => {
  it('construit l’URL d’une catégorie', () => {
    expect(categoryHref([])).toBe('/catalogue')
    expect(categoryHref(['a', 'a1'])).toBe('/catalogue/a/a1')
  })

  it('résout un chemin connu en chaîne de liens', () => {
    expect(resolveCategoryPath(TREE, ['a', 'a1'])).toEqual([
      { slug: 'a', name: 'A', href: '/catalogue/a' },
      { slug: 'a1', name: 'A1', href: '/catalogue/a/a1' },
    ])
    expect(resolveCategoryPath(TREE, [])).toEqual([])
  })

  it('rejette un slug inconnu, mal placé ou un chemin trop profond', () => {
    expect(resolveCategoryPath(TREE, ['a', 'zz'])).toBeNull()
    expect(resolveCategoryPath(TREE, ['a1'])).toBeNull()
    expect(resolveCategoryPath(TREE, ['a', 'a1', 'a1x', 'a1x9'])).toBeNull()
  })

  it('donne la piste du fil d’Ariane, catégorie courante comprise', () => {
    const path = resolveCategoryPath(TREE, ['a', 'a1']) ?? []
    expect(categoryTrail(path)).toEqual([
      { label: 'A', href: '/catalogue/a' },
      { label: 'A1', href: '/catalogue/a/a1' },
    ])
  })

  it('liste les sous-catégories directes, ou les racines', () => {
    expect(subcategoryLinks(TREE, ['a']).map((link) => link.href)).toEqual([
      '/catalogue/a/a1',
      '/catalogue/a/a2',
    ])
    expect(subcategoryLinks(TREE, [])).toHaveLength(2)
    expect(subcategoryLinks(TREE, ['b'])).toEqual([])
  })

  it('liste les chemins de toutes les catégories et construit le menu', () => {
    expect(listCategoryPaths([node('a', [node('a1')]), node('b')])).toEqual([
      '/catalogue/a',
      '/catalogue/a/a1',
      '/catalogue/b',
    ])
    expect(toCategoryMenu([node('a', [node('a1')])])).toEqual([
      {
        id: 'a',
        label: 'A',
        href: '/catalogue/a',
        children: [{ id: 'a1', label: 'A1', href: '/catalogue/a/a1', children: [] }],
      },
    ])
  })
})
