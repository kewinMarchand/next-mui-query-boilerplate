import { loadCatalogPage } from './loadCatalogPage'
import { findCatalogPage } from '../infrastructure/catalogRepository'

import type * as CatalogRepository from '../infrastructure/catalogRepository'

vi.mock('../infrastructure/catalogRepository', async (importOriginal) => {
  const original = await importOriginal<typeof CatalogRepository>()
  return { ...original, findCatalogPage: vi.fn(original.findCatalogPage) }
})

describe('loadCatalogPage', () => {
  it('renvoie la page d’une catégorie connue', async () => {
    const load = await loadCatalogPage(['plantes-interieur', 'feuillages'], { tri: 'nom' })

    expect(load.status).toBe('ok')
    if (load.status !== 'ok' || load.result.status !== 'success') throw new Error('page attendue')
    expect(load.query.sort).toBe('nom')
    expect(load.categoryPath.map((link) => link.slug)).toEqual(['plantes-interieur', 'feuillages'])
    expect(load.subcategories.map((link) => link.slug)).toEqual(['monstera', 'fougeres'])
    expect(load.result.page.total).toBeGreaterThan(0)
  })

  it('déclare introuvables une catégorie inconnue et un chemin trop profond', async () => {
    expect(await loadCatalogPage(['inconnue'], {})).toEqual({ status: 'not-found' })
    expect(await loadCatalogPage(['a', 'b', 'c', 'd'], {})).toEqual({ status: 'not-found' })
  })

  it('transforme un échec du dépôt en résultat d’erreur affichable', async () => {
    vi.mocked(findCatalogPage).mockRejectedValueOnce(new Error('panne'))
    vi.spyOn(console, 'error').mockImplementationOnce(() => {})

    const load = await loadCatalogPage([], {})

    expect(load).toMatchObject({
      status: 'ok',
      query: expect.objectContaining({ page: 1 }),
      result: { status: 'error', message: 'Impossible de charger le catalogue pour le moment.' },
    })
  })
})
