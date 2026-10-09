import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { StyleguideSection } from '../StyleguideSection'

const VARIANTS = ['contained', 'outlined', 'text'] as const

const STATES = [
  { label: 'Défaut', props: {}, sx: {} },
  { label: 'Survol', props: {}, sx: { bgcolor: 'action.hover' } },
  {
    label: 'Focus',
    props: {},
    sx: { outline: '3px solid', outlineColor: 'primary.dark', outlineOffset: 2 },
  },
  { label: 'Actif', props: {}, sx: { bgcolor: 'action.selected' } },
  { label: 'Désactivé', props: { disabled: true }, sx: {} },
  { label: 'Chargement', props: { loading: true }, sx: {} },
] as const

export const ButtonsSection = () => (
  <StyleguideSection title="Boutons">
    <Typography sx={{ mb: 2 }}>
      Survol, focus et actif sont simulés avec les jetons du thème. Les vrais états se testent au
      pointeur et au clavier sur la ligne « Défaut ».
    </Typography>
    {VARIANTS.map((variant) => (
      <Box key={variant} sx={{ mb: 2 }}>
        <Typography variant="h3" component="h3" gutterBottom>
          {variant}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {STATES.map((state) => (
            <Button
              key={state.label}
              variant={variant}
              {...state.props}
              sx={
                variant === 'contained' && ['Survol', 'Actif'].includes(state.label)
                  ? { bgcolor: 'primary.dark' }
                  : state.sx
              }
            >
              {state.label}
            </Button>
          ))}
        </Box>
      </Box>
    ))}
  </StyleguideSection>
)
