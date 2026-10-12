'use client'

import Button from '@mui/material/Button'

import { useA11yMode } from '@/shared/ui/a11y-mode/useA11yMode'
import { Icon } from '@/shared/ui/kit'

export const A11yModeToggle = () => {
  const { isEnhanced, toggle } = useA11yMode()

  return (
    <Button
      type="button"
      color="inherit"
      variant={isEnhanced ? 'outlined' : 'text'}
      aria-pressed={isEnhanced}
      onClick={toggle}
      startIcon={<Icon name="accessibility" />}
      data-testid="a11y-mode-toggle"
    >
      Accessibilité renforcée
    </Button>
  )
}
