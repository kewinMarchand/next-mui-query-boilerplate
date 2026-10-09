import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SITE } from '@/core/config'
import { Icon, ICON_NAMES, LogoMark } from '@/core/ui/ui-kit'

import { StyleguideSection } from '../StyleguideSection'

const LOGO_BACKGROUNDS = [
  { label: 'Fond clair', bgcolor: 'background.paper', color: 'text.primary' },
  { label: 'Fond sombre', bgcolor: 'primary.dark', color: 'common.white' },
] as const

export const IconsLogoSection = () => (
  <>
    <StyleguideSection title="Icônes">
      <Box
        component="ul"
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          listStyle: 'none',
          p: 0,
        }}
      >
        {ICON_NAMES.map((name) => (
          <Box component="li" key={name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon name={name} size={24} />
            <Typography variant="body2">{name}</Typography>
          </Box>
        ))}
      </Box>
    </StyleguideSection>
    <StyleguideSection title="Logo">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {LOGO_BACKGROUNDS.map((background) => (
          <Box
            key={background.label}
            sx={{
              p: 3,
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
              bgcolor: background.bgcolor,
              color: background.color,
            }}
          >
            <Typography variant="body2" sx={{ mb: 2 }}>
              {background.label}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LogoMark size={48} />
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.5,
                  typography: 'h6',
                  fontWeight: 700,
                }}
              >
                <LogoMark size={36} />
                {SITE.name}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </StyleguideSection>
  </>
)
