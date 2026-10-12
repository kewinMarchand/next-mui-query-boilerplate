import { resolveCategoryPath, trailHrefs } from './categories'

describe('resolveCategoryPath', () => {
  it('résout un chemin valide jusqu’à trois niveaux', () => {
    const match = resolveCategoryPath(['plantes-interieur', 'feuillages', 'monstera'])

    expect(match?.current?.name).toBe('Monstera')
    expect(match && trailHrefs(match.trail).at(-1)?.href).toBe(
      '/catalogue/plantes-interieur/feuillages/monstera',
    )
  })

  it('refuse un slug inconnu ou mal placé', () => {
    expect(resolveCategoryPath(['inconnu'])).toBeNull()
    expect(resolveCategoryPath(['feuillages'])).toBeNull()
  })

  it('donne les catégories racines sans slug', () => {
    expect(resolveCategoryPath([])?.children).toHaveLength(3)
  })
})
