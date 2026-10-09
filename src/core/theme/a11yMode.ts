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
    '--font-scale': '1.25',
    '--mui-palette-text-primary': '#000',
    '--mui-palette-text-secondary': '#000',
    '--mui-palette-background-default': '#fff',
    '--mui-palette-background-paper': '#fff',
    '--mui-palette-primary-main': '#1e3a8a',
    '--mui-palette-primary-mainChannel': '30 58 138',
    '--mui-palette-primary-dark': '#172554',
    '--mui-palette-primary-darkChannel': '23 37 84',
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
