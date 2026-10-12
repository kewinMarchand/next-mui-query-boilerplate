import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import type { ReactNode } from 'react'

interface LegalSectionProps {
  title: string
  children: ReactNode
}

export const LegalSection = ({ title, children }: LegalSectionProps) => (
  <Box component="section" sx={{ mt: 4, '& p': { mb: 1.5 } }}>
    <Typography variant="h2" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
)
