'use client'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Icon } from '@/shared/ui/kit'

import { useContactForm } from './hooks/useContactForm'

export const ContactForm = () => {
  const { form, mutation, onSubmit } = useContactForm()
  const { errors } = form.formState

  return (
    <Stack component="form" spacing={2} noValidate onSubmit={onSubmit} sx={{ maxWidth: 560 }}>
      <Typography variant="body2" data-testid="contact-required-legend">
        Les champs marqués d'un astérisque (*) sont obligatoires.
      </Typography>
      <TextField
        label="Nom"
        autoComplete="name"
        required
        error={!!errors.name}
        helperText={errors.name?.message}
        slotProps={{ htmlInput: { 'data-testid': 'contact-name' } }}
        {...form.register('name')}
      />
      <TextField
        label="E-mail"
        type="email"
        autoComplete="email"
        required
        error={!!errors.email}
        helperText={errors.email?.message}
        slotProps={{ htmlInput: { 'data-testid': 'contact-email' } }}
        {...form.register('email')}
      />
      <TextField
        label="Message"
        multiline
        minRows={4}
        required
        error={!!errors.message}
        helperText={errors.message?.message}
        slotProps={{ htmlInput: { 'data-testid': 'contact-message' } }}
        {...form.register('message')}
      />
      <Button
        type="submit"
        variant="contained"
        loading={mutation.isPending}
        startIcon={<Icon name="mail" />}
        data-testid="contact-submit"
      >
        Envoyer
      </Button>
      <div aria-live="polite">
        {mutation.isSuccess && (
          <Alert severity="success" data-testid="contact-success">
            Merci, votre message a bien été envoyé.
          </Alert>
        )}
        {mutation.isError && (
          <Alert severity="error" data-testid="contact-error">
            L'envoi a échoué. Réessayez dans quelques instants.
          </Alert>
        )}
      </div>
    </Stack>
  )
}
