'use client'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { Icon } from '@/shared/ui/kit'

import { useContactForm } from './hooks/useContactForm'

// Mention écrite dans le libellé (RGAA 11.10), plutôt que l'astérisque de MUI, masqué aux lecteurs d'écran
const requiredLabel = (label: string) => (
  <>
    {label}
    <Box component="span" sx={{ color: 'text.secondary' }}>
      &nbsp;(obligatoire)
    </Box>
  </>
)

export const ContactForm = () => {
  const { form, mutation, onSubmit } = useContactForm()
  const { errors } = form.formState

  return (
    <Stack component="form" spacing={2} noValidate onSubmit={onSubmit} sx={{ maxWidth: 560 }}>
      <TextField
        label={requiredLabel('Nom')}
        autoComplete="name"
        required
        error={!!errors.name}
        helperText={errors.name?.message}
        slotProps={{
          inputLabel: { required: false },
          htmlInput: { 'data-testid': 'contact-name' },
        }}
        {...form.register('name')}
      />
      <TextField
        label={requiredLabel('E-mail')}
        type="email"
        autoComplete="email"
        required
        error={!!errors.email}
        helperText={errors.email?.message}
        slotProps={{
          inputLabel: { required: false },
          htmlInput: { 'data-testid': 'contact-email' },
        }}
        {...form.register('email')}
      />
      <TextField
        label={requiredLabel('Message')}
        multiline
        minRows={4}
        required
        error={!!errors.message}
        helperText={errors.message?.message}
        slotProps={{
          inputLabel: { required: false },
          htmlInput: { 'data-testid': 'contact-message' },
        }}
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
        {mutation.data?.status === 'sent' && (
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
