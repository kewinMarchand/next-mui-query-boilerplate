'use client'

import { Alert, Button, TextArea, TextField } from '@kewinmarchand/boilerplates-ui/react'

import styles from './ContactForm.module.css'
import { useContactForm } from './hooks/useContactForm'

export const ContactForm = () => {
  const { form, mutation, onSubmit } = useContactForm()
  const { errors } = form.formState

  return (
    <form noValidate onSubmit={onSubmit} className={`bui-stack ${styles.form}`}>
      <TextField
        id="contact-nom"
        label="Nom"
        autoComplete="name"
        required
        error={errors.name?.message ?? ''}
        data-testid="contact-name"
        {...form.register('name')}
      />
      <TextField
        id="contact-email"
        label="E-mail"
        type="email"
        autoComplete="email"
        required
        error={errors.email?.message ?? ''}
        data-testid="contact-email"
        {...form.register('email')}
      />
      <TextArea
        id="contact-message"
        label="Message"
        required
        error={errors.message?.message ?? ''}
        data-testid="contact-message"
        {...form.register('message')}
      />
      <Button type="submit" icon="mail" loading={mutation.isPending} data-testid="contact-submit">
        Envoyer
      </Button>
      <div aria-live="polite">
        {mutation.data?.status === 'sent' && (
          <div data-testid="contact-success">
            <Alert variant="success">Merci, votre message a bien été envoyé.</Alert>
          </div>
        )}
        {mutation.isError && (
          <div data-testid="contact-error">
            <Alert variant="error">L'envoi a échoué. Réessayez dans quelques instants.</Alert>
          </div>
        )}
      </div>
    </form>
  )
}
