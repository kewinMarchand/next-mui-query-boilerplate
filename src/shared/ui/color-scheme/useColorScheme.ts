import { useEffect, useSyncExternalStore } from 'react'

import { COLOR_SCHEME } from '@/shared/ui/color-scheme/colorScheme'

import type { ColorScheme } from '@/shared/ui/color-scheme/colorScheme'

const { attribute, storageKey, choices } = COLOR_SCHEME

const isColorScheme = (value: string | null): value is ColorScheme =>
  choices.some((choice) => choice === value)

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [attribute] })
  return () => observer.disconnect()
}

const readDocument = (): ColorScheme => {
  const value = document.documentElement.getAttribute(attribute)
  return isColorScheme(value) ? value : 'auto'
}

const readStored = (): ColorScheme => {
  try {
    const value = localStorage.getItem(storageKey)
    return isColorScheme(value) ? value : 'auto'
  } catch {
    return 'auto'
  }
}

const persist = (choice: ColorScheme) => {
  try {
    if (choice === 'auto') localStorage.removeItem(storageKey)
    else localStorage.setItem(storageKey, choice)
  } catch {
    // Stockage indisponible (navigation privée, quota) : le choix vaut pour la page en cours.
  }
}

export const useColorScheme = () => {
  const colorScheme = useSyncExternalStore(subscribe, readDocument, (): ColorScheme => 'auto')

  // Un rendu entièrement côté client (page d'erreur) recrée <html> sans l'attribut posé par le script.
  useEffect(() => {
    const stored = readStored()
    if (stored !== readDocument()) document.documentElement.setAttribute(attribute, stored)
  }, [])

  const choose = (choice: ColorScheme) => {
    document.documentElement.setAttribute(attribute, choice)
    persist(choice)
  }

  return { colorScheme, choose }
}
