import {
  catalogHref,
  clearFilters,
  DEFAULT_QUERY,
  parseCatalogQuery,
  serializeCatalogQuery,
  withFilters,
} from './catalogQuery'

describe('parseCatalogQuery', () => {
  it('retourne la requête par défaut sans paramètre', () => {
    expect(parseCatalogQuery({})).toEqual(DEFAULT_QUERY)
  })

  it('lit les clés répétées et ignore les valeurs invalides', () => {
    const query = parseCatalogQuery({
      exposition: ['soleil', 'lune', 'soleil'],
      taille: 'XL',
      prix_min: 'abc',
      prix_max: '40',
      en_stock: '1',
      tri: 'hasard',
      vue: 'liste',
      page: '-3',
    })

    expect(query).toEqual({
      ...DEFAULT_QUERY,
      exposures: ['soleil'],
      priceMax: 40,
      inStock: true,
      view: 'liste',
    })
  })
})

describe('serializeCatalogQuery', () => {
  it('fait l’aller-retour sans perte et omet les valeurs par défaut', () => {
    const query = {
      ...DEFAULT_QUERY,
      exposures: ['mi-ombre' as const, 'ombre' as const],
      sizes: ['L' as const],
      priceMin: 10,
      sort: 'prix-asc' as const,
      view: 'liste' as const,
      page: 2,
    }
    const search = serializeCatalogQuery(query)

    expect(search.toString()).toBe(
      'exposition=mi-ombre&exposition=ombre&taille=L&prix_min=10&tri=prix-asc&vue=liste&page=2',
    )
    expect(
      parseCatalogQuery(
        Object.fromEntries(
          ['exposition', 'taille', 'prix_min', 'tri', 'vue', 'page'].map((key) => [
            key,
            search.getAll(key),
          ]),
        ),
      ),
    ).toEqual(query)
    expect(catalogHref('/catalogue', DEFAULT_QUERY)).toBe('/catalogue')
  })
})

describe('withFilters et clearFilters', () => {
  it('revient à la page 1 en conservant les autres paramètres', () => {
    const query = { ...DEFAULT_QUERY, view: 'liste' as const, sort: 'nom' as const, page: 3 }

    expect(withFilters(query, { inStock: true })).toEqual({ ...query, inStock: true, page: 1 })
  })

  it('efface filtres et tri mais garde la vue', () => {
    const query = { ...DEFAULT_QUERY, view: 'liste' as const, sort: 'nom' as const, inStock: true }

    expect(clearFilters(query)).toEqual({ ...DEFAULT_QUERY, view: 'liste' })
  })
})
