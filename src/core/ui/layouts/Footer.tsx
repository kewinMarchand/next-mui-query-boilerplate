import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { ACCESSIBILITY_COMPLIANCE, LEGAL_NAVIGATION, SITE } from '@/core/config'
import { Link, LogoMark } from '@/core/ui/ui-kit'

// Le RGAA impose l'état de conformité dans le lien du pied de page, pas ailleurs.
const ACCESSIBILITY_PATH = '/accessibilite'

export const Footer = () => (
  <Box component="footer" sx={{ py: 3, mt: 6, bgcolor: 'grey.100' }}>
    <Container>
      <Box
        component="nav"
        aria-label="Liens légaux"
        sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 3, rowGap: 1, mb: 2 }}
      >
        {LEGAL_NAVIGATION.map(({ href, label }) => (
          <MuiLink
            key={href}
            component={Link}
            href={href}
            variant="body2"
            sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}
          >
            {href === ACCESSIBILITY_PATH ? `Accessibilité : ${ACCESSIBILITY_COMPLIANCE}` : label}
          </MuiLink>
        ))}
      </Box>
      {process.env.NODE_ENV !== 'production' && (
        <MuiLink
          component={Link}
          href="/charte-graphique"
          variant="body2"
          sx={{ display: 'inline-flex', minHeight: 44, alignItems: 'center' }}
        >
          Charte graphique (développement)
        </MuiLink>
      )}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <LogoMark size={20} />
        {SITE.name}
      </Typography>
    </Container>
  </Box>
)
