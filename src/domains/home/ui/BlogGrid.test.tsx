import { render, screen } from '@testing-library/react'

import { BlogGrid } from './BlogGrid'

const ARTICLES = [
  {
    id: '1',
    title: 'Premier',
    excerpt: 'Extrait 1',
    publishedAt: '2026-09-29',
    image: '/images/blog-1',
  },
  {
    id: '2',
    title: 'Second',
    excerpt: 'Extrait 2',
    publishedAt: '2026-09-15',
    image: '/images/blog-2',
  },
]

describe('BlogGrid', () => {
  it('affiche un squelette pendant le chargement', () => {
    render(<BlogGrid status="pending" articles={undefined} />)
    expect(screen.getByTestId('home-blog-loading')).toBeInTheDocument()
  })

  it("affiche le message d'erreur", () => {
    render(<BlogGrid status="error" articles={undefined} errorMessage="Oups" />)
    expect(screen.getByTestId('home-blog-error')).toHaveTextContent('Oups')
  })

  it('affiche un message amical quand il n’y a aucun article', () => {
    render(<BlogGrid status="success" articles={[]} />)
    expect(screen.getByTestId('home-blog-empty')).toBeInTheDocument()
    expect(screen.queryByTestId('home-blog-card')).not.toBeInTheDocument()
  })

  it('affiche chaque article avec sa date lisible et machine', () => {
    render(<BlogGrid status="success" articles={ARTICLES} />)

    expect(screen.getAllByTestId('home-blog-card')).toHaveLength(2)
    expect(screen.getByRole('heading', { level: 3, name: 'Premier' })).toBeInTheDocument()
    expect(screen.getByText('29 septembre 2026')).toHaveAttribute('datetime', '2026-09-29')
  })
})
