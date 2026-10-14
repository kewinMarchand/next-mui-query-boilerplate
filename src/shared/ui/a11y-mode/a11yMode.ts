import { channel, ENHANCED_COLORS, ENHANCED_VARIABLES } from '@/shared/theme/tokens'

export const A11Y_MODE = {
  attribute: 'data-a11y-mode',
  storageKey: 'a11y-mode',
  enhanced: 'enhanced',
} as const

const { attribute, storageKey, enhanced } = A11Y_MODE

// Exécuté avant l'hydratation : le mode est posé sur <html> avant le premier rendu, sans flash.
export const A11Y_MODE_SCRIPT = `try{if(localStorage.getItem('${storageKey}')==='${enhanced}')document.documentElement.setAttribute('${attribute}','${enhanced}')}catch(e){}`

const ENHANCED = `html[${attribute}="${enhanced}"]`

export const ENHANCED_MODE_SELECTOR = `${ENHANCED} &`

// Les listes de mise en page (puces, grilles, menus) portent une classe : seules les listes de texte sont visées.
const CONTENT_TEXT = `${ENHANCED} main :is(p, dd, dt, td, th, ul:not([class]) > li, ol:not([class]) > li):not(nav *, aside *)`

export const ENHANCED_MODE_STYLES = {
  [ENHANCED]: {
    fontSize: '20px',
    scrollBehavior: 'auto',
    ...ENHANCED_VARIABLES,
    '--mui-palette-text-primary': ENHANCED_COLORS.text,
    '--mui-palette-text-secondary': ENHANCED_COLORS['text-muted'],
    '--mui-palette-background-default': ENHANCED_COLORS.surface,
    '--mui-palette-background-paper': ENHANCED_COLORS.surface,
    '--mui-palette-primary-main': ENHANCED_COLORS.primary,
    '--mui-palette-primary-mainChannel': channel(ENHANCED_COLORS.primary),
    '--mui-palette-primary-dark': ENHANCED_COLORS['primary-dark'],
    '--mui-palette-primary-darkChannel': channel(ENHANCED_COLORS['primary-dark']),
    '--mui-palette-secondary-main': ENHANCED_COLORS.secondary,
    '--mui-palette-secondary-mainChannel': channel(ENHANCED_COLORS.secondary),
    '--mui-palette-secondary-dark': ENHANCED_COLORS['secondary-dark'],
    '--mui-palette-secondary-darkChannel': channel(ENHANCED_COLORS['secondary-dark']),
  },
  [CONTENT_TEXT]: {
    lineHeight: 1.8,
    letterSpacing: '0.12em',
    wordSpacing: '0.16em',
    maxWidth: '70ch',
  },
  [`${ENHANCED} main p:not(nav *, aside *)`]: { marginBottom: '2em' },
  [`${ENHANCED} main :is(h1, h2, h3, p, li)`]: { overflowWrap: 'anywhere', hyphens: 'auto' },
  [`${ENHANCED} *, ${ENHANCED} *::before, ${ENHANCED} *::after`]: {
    animation: 'none',
    transition: 'none',
    scrollBehavior: 'auto',
  },
  [`${ENHANCED} a`]: { textDecoration: 'underline' },
  [`${ENHANCED} :focus-visible`]: {
    outline: '4px solid #000',
    outlineOffset: '2px',
  },
  [`${ENHANCED} header :focus-visible`]: { outlineColor: '#fff' },
}
