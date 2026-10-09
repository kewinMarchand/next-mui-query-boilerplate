import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

import { Icon } from '@/core/ui/ui-kit'

import { StyleguideSection } from '../StyleguideSection'

const SEVERITIES = [
  ['success', 'Message envoyé.'],
  ['info', 'Les filtres s’appliquent dès qu’ils changent.'],
  ['warning', 'Ce produit est bientôt en rupture.'],
  ['error', 'Impossible de charger les données pour le moment.'],
] as const

export const FeedbackSection = () => (
  <StyleguideSection title="Retours">
    <Stack sx={{ gap: 2 }}>
      {SEVERITIES.map(([severity, message]) => (
        <Alert key={severity} severity={severity}>
          {message}
        </Alert>
      ))}
      <Stack role="status" aria-label="Exemple de chargement" sx={{ gap: 1 }}>
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={48} />
      </Stack>
      <Alert severity="info">Aucun élément pour l’instant. Tout est à jour.</Alert>
      <Alert
        severity="error"
        action={
          <Button color="inherit" startIcon={<Icon name="rotate-cw" />}>
            Réessayer
          </Button>
        }
      >
        Le chargement a échoué.
      </Alert>
    </Stack>
  </StyleguideSection>
)
