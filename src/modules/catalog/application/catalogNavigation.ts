import { listCategoryPaths, resolveCategoryPath, toCategoryMenu } from '../domain/categoryPath'
import { findCategoryTree } from '../infrastructure/catalogRepository'

/** Menu des catégories. API indisponible : menu vide, la page reste servie. */
export const getCategoryMenu = async () =>
  toCategoryMenu(
    await findCategoryTree().catch((error: unknown) => {
      console.error(error)
      return []
    }),
  )

export const listCatalogPaths = async () => listCategoryPaths(await findCategoryTree())

export const findCategoryPath = async (slugs: string[]) =>
  resolveCategoryPath(await findCategoryTree(), slugs)
