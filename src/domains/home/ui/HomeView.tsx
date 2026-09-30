import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { SITE } from '@/core/config'
import { Link } from '@/core/ui/ui-kit'

export const HomeView = () => (
  <>
    <Typography variant="h1" gutterBottom>
      {SITE.name}
    </Typography>
    <Typography sx={{ mb: 3, maxWidth: 720 }}>{SITE.description}</Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Button component={Link} href="/taches" variant="contained" data-testid="home-tasks-link">
        Voir la démo TanStack Query
      </Button>
      <Button component={Link} href="/contact" variant="outlined" data-testid="home-contact-link">
        Voir le formulaire
      </Button>
    </Stack>
  </>
)
