import { CATEGORY_TREE, categoryHref } from '@/core/config'

import type { Catalog } from './catalog'

export interface CategoryMatch {
  trail: Catalog.Category[]
  current: Catalog.Category | undefined
  children: Catalog.Category[]
}

/** Résout un chemin de slugs dans l'arbre, ou null si un segment n'existe pas. */
export const resolveCategoryPath = (
  slugs: string[],
  tree: Catalog.Category[] = CATEGORY_TREE,
): CategoryMatch | null => {
  const trail: Catalog.Category[] = []
  let nodes = tree
  for (const slug of slugs) {
    const node = nodes.find((item) => item.slug === slug)
    if (!node) return null
    trail.push(node)
    nodes = node.children ?? []
  }
  return { trail, current: trail.at(-1), children: nodes }
}

export const collectSlugs = (nodes: Catalog.Category[]): string[] =>
  nodes.flatMap((node) => [node.slug, ...collectSlugs(node.children ?? [])])

export const trailHrefs = (trail: Catalog.Category[]) =>
  trail.map((node, index) => ({
    label: node.name,
    href: categoryHref(trail.slice(0, index + 1).map((item) => item.slug)),
  }))
