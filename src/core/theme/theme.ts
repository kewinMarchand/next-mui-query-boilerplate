'use client'

import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: '#1d4ed8' },
    secondary: { main: '#7c3aed' },
  },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    htmlFontSize: 16,
    fontSize: 16,
    h1: { fontSize: '40px', fontWeight: 700 },
    h2: { fontSize: '28px', fontWeight: 600 },
    body1: { fontSize: '16px' },
    body2: { fontSize: '14px' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 44, textTransform: 'none' } },
    },
    MuiLink: { defaultProps: { underline: 'hover' } },
  },
})
