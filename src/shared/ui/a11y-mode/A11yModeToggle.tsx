'use client'

import { useA11yMode } from '@/shared/ui/a11y-mode/useA11yMode'
import { Icon } from '@/shared/ui/kit'

import styles from './A11yModeToggle.module.css'

// Sur mobile, seule l'icône reste visible : le nom accessible vient de aria-label.
const LABEL = 'Accessibilité renforcée'

export const A11yModeToggle = () => {
  const { isEnhanced, toggle } = useA11yMode()

  return (
    <button
      type="button"
      className={`bui-button bui-button--nav ${styles.toggle}`}
      aria-pressed={isEnhanced}
      aria-label={LABEL}
      onClick={toggle}
      data-testid="a11y-mode-toggle"
    >
      <Icon name="person-standing" />
      <span className={styles.label}>{LABEL}</span>
    </button>
  )
}
