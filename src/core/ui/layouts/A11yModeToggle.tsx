'use client'

import Button from '@mui/material/Button'

import { useA11yMode } from '@/core/ui/hooks/useA11yMode'
import { Icon } from '@/core/ui/ui-kit'

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
