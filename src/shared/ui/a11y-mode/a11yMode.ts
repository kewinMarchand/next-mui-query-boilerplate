export const A11Y_MODE = {
  attribute: 'data-a11y-mode',
  storageKey: 'a11y-mode',
  enhanced: 'enhanced',
} as const

const { attribute, storageKey, enhanced } = A11Y_MODE

// Exécuté avant l'hydratation : le mode est posé sur <html> avant le premier rendu, sans flash.
export const A11Y_MODE_SCRIPT = `try{if(localStorage.getItem('${storageKey}')==='${enhanced}')document.documentElement.setAttribute('${attribute}','${enhanced}')}catch(e){}`
