import { useEffect, useSyncExternalStore } from 'react'

import { A11Y_MODE } from '@/core/theme/a11yMode'

const { attribute, storageKey, enhanced } = A11Y_MODE

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [attribute] })
  return () => observer.disconnect()
}

const isEnhancedInDocument = () => document.documentElement.getAttribute(attribute) === enhanced

const readStoredMode = () => {
  try {
    return localStorage.getItem(storageKey) === enhanced
  } catch {
    return false
  }
}

const persist = (isEnhanced: boolean) => {
  try {
    if (isEnhanced) localStorage.setItem(storageKey, enhanced)
    else localStorage.removeItem(storageKey)
  } catch {
    // Stockage indisponible (navigation privée, quota) : le mode reste actif pour la page en cours.
  }
}

export const useA11yMode = () => {
  const isEnhanced = useSyncExternalStore(subscribe, isEnhancedInDocument, () => false)

  // Un rendu entièrement côté client (page d'erreur) recrée <html> sans l'attribut posé par le script.
  useEffect(() => {
    if (readStoredMode() && !isEnhancedInDocument()) {
      document.documentElement.setAttribute(attribute, enhanced)
    }
  }, [])

  const toggle = () => {
    const next = !isEnhanced
    if (next) document.documentElement.setAttribute(attribute, enhanced)
    else document.documentElement.removeAttribute(attribute)
    persist(next)
  }

  return { isEnhanced, toggle }
}
