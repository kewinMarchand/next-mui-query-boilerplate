import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { A11yModeToggle } from './A11yModeToggle'

describe('A11yModeToggle', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-a11y-mode')
    localStorage.clear()
  })

  it('est désactivé par défaut', () => {
    render(<A11yModeToggle />)

    expect(screen.getByTestId('a11y-mode-toggle')).toHaveAttribute('aria-pressed', 'false')
    expect(document.documentElement).not.toHaveAttribute('data-a11y-mode')
  })

  it('active puis désactive le mode et le persiste', async () => {
    render(<A11yModeToggle />)
    const toggle = screen.getByTestId('a11y-mode-toggle')

    await userEvent.click(toggle)
    await waitFor(() => expect(toggle).toHaveAttribute('aria-pressed', 'true'))
    expect(document.documentElement).toHaveAttribute('data-a11y-mode', 'enhanced')
    expect(localStorage.getItem('a11y-mode')).toBe('enhanced')

    await userEvent.click(toggle)
    await waitFor(() => expect(toggle).toHaveAttribute('aria-pressed', 'false'))
    expect(document.documentElement).not.toHaveAttribute('data-a11y-mode')
    expect(localStorage.getItem('a11y-mode')).toBeNull()
  })

  it('reflète un mode déjà posé par le script inline', () => {
    document.documentElement.setAttribute('data-a11y-mode', 'enhanced')
    render(<A11yModeToggle />)

    expect(screen.getByTestId('a11y-mode-toggle')).toHaveAttribute('aria-pressed', 'true')
  })
})
