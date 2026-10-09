'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { contrastLevel, contrastRatio } from '@/domains/styleguide/common/models/contrast'

import { StyleguideSection } from '../StyleguideSection'

export const ColorsSection = () => {
  const { palette } = useTheme()
  const surface = palette.background.paper
  const tokens = {
    'primary.main': palette.primary.main,
    'primary.dark': palette.primary.dark,
    'secondary.main': palette.secondary.main,
    'text.primary': palette.text.primary,
    'text.secondary': palette.text.secondary,
    'background.default': palette.background.default,
    'background.paper': palette.background.paper,
    'success.main': palette.success.main,
    'error.main': palette.error.main,
    'info.main': palette.info.main,
    'warning.main': palette.warning.main,
  }

  return (
    <StyleguideSection title="Couleurs">
      <Box
        component="ul"
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))',
          listStyle: 'none',
          m: 0,
          p: 0,
        }}
      >
        {Object.entries(tokens).map(([token, value]) => {
          const isBackground = token.startsWith('background.')
          const ratio = isBackground
            ? contrastRatio(palette.text.primary, value)
            : contrastRatio(value, surface)
          return (
            <Box
              component="li"
              key={token}
              sx={{ border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}
            >
              <Box sx={{ height: 64, bgcolor: token }} />
              <Box sx={{ p: 1.5 }}>
                <Typography sx={{ fontWeight: 600 }}>{`palette.${token}`}</Typography>
                <Typography variant="body2">{value}</Typography>
                <Typography variant="body2">
                  {isBackground ? 'Texte sur ce fond' : 'Contraste sur fond'} : {ratio.toFixed(2)}
                  :1, {contrastLevel(ratio)}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </StyleguideSection>
  )
}
