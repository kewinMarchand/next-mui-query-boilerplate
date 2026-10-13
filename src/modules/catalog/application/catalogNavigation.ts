import { listCategoryPaths, resolveCategoryPath, toCategoryMenu } from '../domain/categoryPath'
import { findCategoryTree } from '../infrastructure/catalogRepository'

/** API indisponible, au build compris : arbre vide, la page reste servie. */
const findCategoryTreeOrEmpty = () =>
  findCategoryTree().catch((error: unknown) => {
    console.error(error)
    return []
  })

export const getCategoryMenu = async () => toCategoryMenu(await findCategoryTreeOrEmpty())

export const listCatalogPaths = async () => listCategoryPaths(await findCategoryTreeOrEmpty())

export const findCategoryPath = async (slugs: string[]) =>
  resolveCategoryPath(await findCategoryTree(), slugs)
