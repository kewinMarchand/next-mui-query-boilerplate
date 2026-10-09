import { buildMetadata } from './buildMetadata'
import { breadcrumbJsonLd } from './structuredData'

describe('buildMetadata', () => {
  it('pose canonique, Open Graph et carte Twitter', () => {
    const metadata = buildMetadata({ title: 'Contact', description: 'Desc', path: '/contact' })

    expect(metadata.alternates?.canonical).toBe('/contact')
    expect(metadata.robots).toEqual({ index: true, follow: true })
    expect(metadata.openGraph).toMatchObject({ title: 'Contact', url: '/contact' })
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' })
  })

  it('passe la page en noindex, follow sur demande', () => {
    const metadata = buildMetadata({ title: 'T', description: 'D', path: '/', noindex: true })

    expect(metadata.robots).toEqual({ index: false, follow: true })
  })
})

describe('breadcrumbJsonLd', () => {
  it('numérote les éléments et rend les URL absolues', () => {
    const data = breadcrumbJsonLd([
      { label: 'Accueil', href: '/' },
      { label: 'Contact', href: '/contact' },
    ])

    expect(data.itemListElement).toHaveLength(2)
    expect(data.itemListElement[1]).toMatchObject({ position: 2, name: 'Contact' })
    expect(data.itemListElement[1]?.item).toMatch(/^https?:\/\/.+\/contact$/)
  })
})
