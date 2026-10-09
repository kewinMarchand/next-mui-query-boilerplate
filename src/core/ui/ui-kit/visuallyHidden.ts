// Valeurs en chaînes : dans `sx`, `width: 1` vaut 100 % et `m: -1` un pas d'espacement.
export const VISUALLY_HIDDEN = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const
