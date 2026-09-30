import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Link } from '@/core/ui/ui-kit'

export default function NotFound() {
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Page introuvable
      </Typography>
      <Typography sx={{ mb: 3 }}>La page demandée n'existe pas ou a été déplacée.</Typography>
      <Button component={Link} href="/" variant="contained">
        Retour à l'accueil
      </Button>
    </>
  )
}
