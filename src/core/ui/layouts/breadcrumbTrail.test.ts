import { buildBreadcrumb } from './breadcrumbTrail'

describe('buildBreadcrumb', () => {
  it('part de l’accueil et reprend le libellé de la navigation', () => {
    expect(buildBreadcrumb('/contact')).toEqual([
      { label: 'Accueil', href: '/' },
      { label: 'Contact', href: '/contact' },
    ])
  })

  it('ajoute les niveaux fournis par la vue', () => {
    const trail = buildBreadcrumb('/catalogue', [
      { label: 'Plantes aquatiques', href: '/catalogue/plantes-aquatiques' },
    ])

    expect(trail.map((item) => item.label)).toEqual(['Accueil', 'Catalogue', 'Plantes aquatiques'])
  })

  it('se limite à l’accueil et au niveau fourni hors navigation', () => {
    expect(buildBreadcrumb('/', [{ label: 'Page introuvable', href: '/404' }])).toHaveLength(2)
  })
})
