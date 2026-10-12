'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useA11yMode } from '@/shared/ui/a11y-mode/useA11yMode'
import { Icon } from '@/shared/ui/kit'

// Sur mobile, seule l'icône reste visible : le nom accessible vient de aria-label.
const LABEL = 'Accessibilité renforcée'

export const A11yModeToggle = () => {
  const { isEnhanced, toggle } = useA11yMode()

  return (
    <Button
      type="button"
      color="inherit"
      variant={isEnhanced ? 'outlined' : 'text'}
      aria-pressed={isEnhanced}
      aria-label={LABEL}
      onClick={toggle}
      startIcon={<Icon name="person-standing" />}
      data-testid="a11y-mode-toggle"
      sx={(theme) => ({
        flexShrink: 0,
        minWidth: 44,
        [theme.breakpoints.down('md')]: {
          px: 0,
          '& .MuiButton-startIcon': { mx: 0 },
          '&.Mui-focusVisible': { outline: '2px solid currentColor', outlineOffset: 2 },
        },
      })}
    >
      <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
        {LABEL}
      </Box>
    </Button>
  )
}
