'use client'

import { Menu } from '@kewinmarchand/boilerplates-ui/react'

import { useA11yMode } from '@/shared/ui/a11y-mode/useA11yMode'
import { useColorScheme } from '@/shared/ui/color-scheme/useColorScheme'

import { COLOR_SCHEME } from './colorScheme'

import type { ColorScheme } from './colorScheme'

const LABELS: Record<ColorScheme, string> = { auto: 'système', light: 'clair', dark: 'sombre' }

const ICONS = { auto: 'monitor', light: 'sun', dark: 'moon' } as const

const ITEMS = COLOR_SCHEME.choices.map((choice) => ({
  id: choice,
  label: LABELS[choice].charAt(0).toUpperCase() + LABELS[choice].slice(1),
  testId: `color-scheme-option-${choice}`,
}))

const isColorScheme = (value: string): value is ColorScheme =>
  COLOR_SCHEME.choices.some((choice) => choice === value)

export const ColorSchemeToggle = () => {
  const { colorScheme, choose } = useColorScheme()
  const { isEnhanced } = useA11yMode()
  // Le mode renforcé impose le clair : un autre choix reste mémorisé mais suspendu.
  const suspended = isEnhanced && colorScheme !== 'light'

  return (
    <Menu
      id="color-scheme"
      label={`Thème : ${LABELS[colorScheme]}${suspended ? ", suspendu par l'accessibilité renforcée" : ''}`}
      items={ITEMS}
      checked={colorScheme}
      triggerIcon={ICONS[colorScheme]}
      triggerVariant="nav"
      testId="color-scheme-toggle"
      onSelect={(id) => {
        if (isColorScheme(id)) choose(id)
      }}
    />
  )
}
