import mui from '@kewinmarchand/boilerplates-ui/tokens/mui.json'
import generated from '@kewinmarchand/boilerplates-ui/tokens/tokens.json'

import type { ThemeOptions, TypographyVariantsOptions } from '@mui/material/styles'

// Seul point d'entrée des tokens de boilerplates-ui : thème MUI généré et couleurs du mode renforcé.
// Le JSON importé est typé en chaînes larges : la conversion vers ThemeOptions est sûre, mui.json étant
// produit pour ce type par le générateur de la bibliothèque.
export const MUI_TOKENS = mui as ThemeOptions & { typography: TypographyVariantsOptions }

export const ENHANCED_COLORS = generated.enhanced.color

/** Composantes « r g b » d'une couleur hexadécimale, pour les variables `*Channel` de MUI. */
export const channel = (hex: string) =>
  [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16)).join(' ')
