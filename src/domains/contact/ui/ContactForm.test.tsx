import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { makeQueryClient } from '@/core/providers'

import { ContactForm } from './ContactForm'

const renderForm = () =>
  render(
    <QueryClientProvider client={makeQueryClient()}>
      <ContactForm />
    </QueryClientProvider>,
  )

describe('ContactForm', () => {
  it('lie le message d’erreur au champ invalide', async () => {
    renderForm()
    await userEvent.click(screen.getByTestId('contact-submit'))

    const email = screen.getByTestId('contact-email')
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAccessibleDescription(/adresse e-mail valide/)
  })

  it('confirme l’envoi quand le formulaire est valide', async () => {
    renderForm()
    await userEvent.type(screen.getByTestId('contact-name'), 'Ada')
    await userEvent.type(screen.getByTestId('contact-email'), 'ada@exemple.fr')
    await userEvent.type(screen.getByTestId('contact-message'), 'Bonjour, ceci est un message.')
    await userEvent.click(screen.getByTestId('contact-submit'))

    expect(await screen.findByTestId('contact-success')).toBeInTheDocument()
  })
})
