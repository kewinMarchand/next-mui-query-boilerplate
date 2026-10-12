import Box from '@mui/material/Box'

export const SkipLink = () => (
  <Box
    component="a"
    href="#main"
    sx={{
      position: 'absolute',
      left: 8,
      top: -64,
      zIndex: 'tooltip',
      p: 1.5,
      bgcolor: 'background.paper',
      color: 'primary.main',
      borderRadius: 1,
      '&:focus-visible': { top: 8, outline: '3px solid', outlineColor: 'primary.main' },
    }}
  >
    Aller au contenu principal
  </Box>
)
