import { Alert, Button, Skeleton, Stack } from '@kewinmarchand/boilerplates-ui/react'

import { Icon } from '@/shared/ui/kit'

import { StyleguideSection } from '../StyleguideSection'

const VARIANTS = [
  ['success', 'Message envoyé.'],
  ['info', 'Les filtres s’appliquent dès qu’ils changent.'],
  ['warning', 'Ce produit est bientôt en rupture.'],
  ['error', 'Impossible de charger les données pour le moment.'],
] as const

export const FeedbackSection = () => (
  <StyleguideSection title="Retours">
    <Stack gap="4">
      {VARIANTS.map(([variant, message]) => (
        <Alert key={variant} variant={variant}>
          {message}
        </Alert>
      ))}
      <Stack role="status" aria-label="Exemple de chargement" gap="2">
        <Skeleton height="48px" />
        <Skeleton height="48px" />
      </Stack>
      <Alert>Aucun élément pour l’instant. Tout est à jour.</Alert>
      <Alert
        variant="error"
        action={
          <Button variant="ghost">
            <Icon name="rotate-cw" />
            Réessayer
          </Button>
        }
      >
        Le chargement a échoué.
      </Alert>
    </Stack>
  </StyleguideSection>
)
