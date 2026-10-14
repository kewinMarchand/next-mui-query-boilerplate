'use client'

import { createTheme } from '@mui/material/styles'

import { ENHANCED_MODE_STYLES } from '../ui/a11y-mode/a11yMode'
import { MUI_TOKENS } from './tokens'

import type { ThemeOptions } from '@mui/material/styles'

// Points de rupture, palette, typographie et rayon viennent des tokens de boilerplates-ui ; le mode renforcé agrandit
// le texte par les variables --bui-font-size-* de tokens.css. Seule la police reste celle de next/font.
const SITE_OPTIONS: ThemeOptions = {
  cssVariables: true,
  components: {
    MuiCssBaseline: { styleOverrides: ENHANCED_MODE_STYLES },
    MuiContainer: {
      // Largeur maximale du contenu : token container-content (1440 px), plus large que le point de rupture xl
      defaultProps: { maxWidth: false },
      styleOverrides: {
        root: ({ theme }) => ({
          maxWidth: 'var(--bui-container-content)',
          [theme.breakpoints.up('lg')]: { paddingInline: theme.spacing(4) },
        }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 44, textTransform: 'none' } },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { '&.Mui-focusVisible': { outline: '2px solid currentColor', outlineOffset: 2 } },
      },
    },
    MuiLink: { defaultProps: { underline: 'hover' } },
  },
}

// Police fusionnée avant createTheme : chaque variante (h1, body1…) recopie fontFamily à sa création, une
// surcharge passée en second argument n'atteindrait que la valeur générale
export const theme = createTheme({
  ...MUI_TOKENS,
  ...SITE_OPTIONS,
  typography: { ...MUI_TOKENS.typography, fontFamily: 'var(--font-inter), system-ui, sans-serif' },
})
