import { render, screen } from '@testing-library/react'

import { Icon } from './Icon'

describe('Icon', () => {
  it('pointe vers le symbole du sprite et reste masquée sans libellé', () => {
    const { container } = render(<Icon name="mail" />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.querySelector('use')).toHaveAttribute('href', '/icons.svg#mail')
  })

  it('porte un nom accessible quand un libellé est fourni', () => {
    render(<Icon name="circle-alert" label="Erreur" />)

    expect(screen.getByRole('img', { name: 'Erreur' })).toBeInTheDocument()
  })
})
