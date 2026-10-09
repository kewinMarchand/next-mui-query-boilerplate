'use client'

import { createTheme } from '@mui/material/styles'

import { ENHANCED_MODE_STYLES } from './a11yMode'

export const theme = createTheme({
  cssVariables: true,
  breakpoints: { values: { xs: 0, sm: 600, md: 1024, lg: 1200, xl: 1440 } },
  palette: {
    primary: { main: '#1d4ed8' },
    secondary: { main: '#7c3aed' },
  },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    htmlFontSize: 16,
    fontSize: 16,
    h1: { fontSize: 'calc(40px * var(--font-scale, 1))', fontWeight: 700 },
    h2: { fontSize: 'calc(28px * var(--font-scale, 1))', fontWeight: 600 },
    h3: { fontSize: 'calc(20px * var(--font-scale, 1))', fontWeight: 600 },
    body1: { fontSize: 'calc(16px * var(--font-scale, 1))' },
    body2: { fontSize: 'calc(14px * var(--font-scale, 1))' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: { styleOverrides: ENHANCED_MODE_STYLES },
    MuiContainer: {
      defaultProps: { maxWidth: 'xl' },
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.up('md')]: { paddingInline: theme.spacing(4) },
        }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 44, textTransform: 'none' } },
    },
    MuiLink: { defaultProps: { underline: 'hover' } },
  },
})
