import { CatalogLoadError } from './CatalogLoadError'
import { resolveCategoryPath, subcategoryLinks } from '../domain/categoryPath'
import { parseCatalogQuery } from '../domain/parseCatalogQuery'
import { findCatalogPage, findCategoryTree } from '../infrastructure/catalogRepository'

import type { Catalog } from '../domain/catalog'
import type { SearchParams } from '../domain/catalogQuery'
import type { CatalogPage } from '../infrastructure/catalogRepository'

export type CatalogPageResult =
  { status: 'success'; page: CatalogPage } | { status: 'error'; message: string }

export type CatalogPageLoad =
  | { status: 'not-found' }
  | {
      status: 'ok'
      query: Catalog.Query
      categoryPath: Catalog.CategoryPath
      subcategories: Catalog.CategoryPathLink[]
      result: CatalogPageResult
    }

/**
 * Cas d'utilisation « afficher une page du catalogue » : valide le chemin contre l'arbre, lit
 * l'état de recherche, interroge le dépôt, puis décide. Catégorie inconnue : introuvable. Échec
 * du dépôt : résultat en erreur, que l'interface affiche avec une relance.
 */
export const loadCatalogPage = async (
  slugs: string[],
  searchParams: SearchParams,
): Promise<CatalogPageLoad> => {
  const tree = findCategoryTree()
  const categoryPath = resolveCategoryPath(tree, slugs)
  if (!categoryPath) return { status: 'not-found' }

  const query = parseCatalogQuery(searchParams)
  const base = {
    status: 'ok' as const,
    query,
    categoryPath,
    subcategories: subcategoryLinks(tree, slugs),
  }

  try {
    return { ...base, result: { status: 'success', page: await findCatalogPage(slugs, query) } }
  } catch (error) {
    console.error(error)
    return { ...base, result: { status: 'error', message: new CatalogLoadError().message } }
  }
}
