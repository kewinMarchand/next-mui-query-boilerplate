'use client'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Icon, Link } from '@/shared/ui/kit'
import { Breadcrumb, buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

export const ServerErrorView = () => (
  <PageContainer>
    <Breadcrumb
      items={buildBreadcrumb('/', [{ label: 'Une erreur est survenue', href: '/500' }])}
      withJsonLd={false}
    />
    <Typography variant="h1" gutterBottom>
      Une erreur est survenue
    </Typography>
    <Typography sx={{ mb: 3 }}>
      La page n'a pas pu s'afficher. Réessayez dans quelques instants, le problème est peut-être
      passager.
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2 }}>
      <Button
        variant="contained"
        startIcon={<Icon name="rotate-cw" />}
        onClick={() => window.location.reload()}
        data-testid="errors-retry"
      >
        Réessayer
      </Button>
      <Button component={Link} href="/" variant="outlined" data-testid="errors-home-link">
        Retour à l'accueil
      </Button>
    </Stack>
  </PageContainer>
)
