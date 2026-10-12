import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import type { ReactNode } from 'react'

interface StyleguideSectionProps {
  title: string
  children: ReactNode
}

export const StyleguideSection = ({ title, children }: StyleguideSectionProps) => (
  <Box component="section" sx={{ mt: 6 }} data-testid="styleguide-section">
    <Typography variant="h2" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
)
