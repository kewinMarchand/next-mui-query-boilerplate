import type { Catalog } from './catalog'

/** Catégories traversées par les slugs, de la racine à la dernière, ou null si un slug est inconnu. */
export const findCategoryChain = (
  tree: Catalog.Category[],
  slugs: string[],
): Catalog.Category[] | null => {
  const chain: Catalog.Category[] = []
  let nodes = tree
  for (const slug of slugs) {
    const node = nodes.find((item) => item.slug === slug)
    if (!node) return null
    chain.push(node)
    nodes = node.children ?? []
  }
  return chain
}

/** Enfants de la dernière catégorie de la chaîne, ou les racines pour une chaîne vide. */
export const childCategories = (tree: Catalog.Category[], chain: Catalog.Category[]) =>
  chain.length > 0 ? (chain.at(-1)?.children ?? []) : tree

export const collectSlugs = (nodes: Catalog.Category[]): string[] =>
  nodes.flatMap((node) => [node.slug, ...collectSlugs(node.children ?? [])])
