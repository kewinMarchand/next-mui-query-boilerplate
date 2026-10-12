'use client'

import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { StyleguideSection } from '../StyleguideSection'

const VARIANTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2'] as const

export const TypographySection = () => {
  const { typography } = useTheme()

  return (
    <StyleguideSection title="Typographie">
      <Stack sx={{ gap: 2 }}>
        {VARIANTS.map((variant) => (
          <div key={variant}>
            <Typography variant={variant} component="p">
              {variant} : Plantes tropicales de démonstration
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Taille {String(typography[variant].fontSize)}, interlignage{' '}
              {String(typography[variant].lineHeight)}
            </Typography>
          </div>
        ))}
      </Stack>
    </StyleguideSection>
  )
}
