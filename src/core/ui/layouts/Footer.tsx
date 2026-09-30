import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { SITE } from '@/core/config'

export const Footer = () => (
  <Box component="footer" sx={{ py: 3, mt: 6, bgcolor: 'grey.100' }}>
    <Container maxWidth="lg">
      <Typography variant="body2" color="text.secondary">
        {SITE.name}
      </Typography>
    </Container>
  </Box>
)
