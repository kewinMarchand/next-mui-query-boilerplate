import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { SITE } from '@/core/config'
import { ENHANCED_MODE_SELECTOR } from '@/core/theme/a11yMode'
import { Link, Picture } from '@/core/ui/ui-kit'

export const HomeHero = () => (
  <Box
    component="section"
    aria-labelledby="home-hero-title"
    data-testid="home-hero"
    sx={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      minHeight: { xs: 480, md: 'min(80vh, 720px)' },
      color: '#fff',
      overflow: 'hidden',
    }}
  >
    <Picture
      src="/images/hero"
      widths={[640, 1280, 1920]}
      width={1920}
      height={1080}
      alt=""
      isPriority
      sizes="100vw"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.6) 100%)',
        [ENHANCED_MODE_SELECTOR]: { background: 'rgba(0, 0, 0, 0.85)' },
      }}
    />
    <Container sx={{ position: 'relative', py: 6 }}>
      <Box sx={{ maxWidth: 720 }}>
        <Typography component="p" variant="overline" sx={{ fontSize: 14, fontWeight: 600 }}>
          Jardinerie tropicale de démonstration
        </Typography>
        <Typography variant="h1" id="home-hero-title" gutterBottom>
          {SITE.name}
        </Typography>
        <Typography sx={{ mb: 4, fontSize: 'calc(18px * var(--font-scale, 1))' }}>
          {SITE.description}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2 }}>
          <Button
            component={Link}
            href="/taches"
            variant="contained"
            size="large"
            data-testid="home-tasks-link"
          >
            Voir la démo TanStack Query
          </Button>
          <Button
            component={Link}
            href="/contact"
            variant="outlined"
            color="inherit"
            size="large"
            data-testid="home-contact-link"
          >
            Voir le formulaire
          </Button>
        </Stack>
      </Box>
    </Container>
  </Box>
)
