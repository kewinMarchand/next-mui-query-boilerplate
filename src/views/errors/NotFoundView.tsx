import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { CATALOG_NAVIGATION } from '@/shared/config'
import { Link } from '@/shared/ui/kit'
import { Breadcrumb, buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

export const NotFoundView = () => (
  <PageContainer>
    <Breadcrumb
      items={buildBreadcrumb('/', [{ label: 'Page introuvable', href: '/404' }])}
      withJsonLd={false}
    />
    <Typography variant="h1" gutterBottom>
      Page introuvable
    </Typography>
    <Typography sx={{ mb: 3 }}>
      La page demandée n'existe pas ou a été déplacée. Ces liens peuvent vous aider à retrouver
      votre chemin.
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2 }}>
      <Button component={Link} href="/" variant="contained" data-testid="errors-home-link">
        Retour à l'accueil
      </Button>
      <Button component={Link} href="/plan-du-site" variant="outlined">
        Plan du site
      </Button>
      <Button component={Link} href={CATALOG_NAVIGATION.href} variant="outlined">
        Catalogue
      </Button>
    </Stack>
  </PageContainer>
)
