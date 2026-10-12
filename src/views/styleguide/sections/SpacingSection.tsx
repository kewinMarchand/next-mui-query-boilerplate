'use client'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { StyleguideSection } from '../StyleguideSection'

const STEPS = [0.5, 1, 1.5, 2, 3, 4, 6, 8]

export const SpacingSection = () => {
  const theme = useTheme()

  return (
    <StyleguideSection title="Espacements et rayons">
      {STEPS.map((step) => (
        <Box key={step} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="body2" sx={{ width: 140 }}>
            spacing({step})
          </Typography>
          <Box sx={{ width: theme.spacing(step), height: 16, bgcolor: 'primary.main' }} />
        </Box>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <Box sx={{ width: 64, height: 64, bgcolor: 'grey.300', borderRadius: 1 }} />
        <Typography variant="body2">shape.borderRadius = {theme.shape.borderRadius} px</Typography>
      </Box>
    </StyleguideSection>
  )
}
