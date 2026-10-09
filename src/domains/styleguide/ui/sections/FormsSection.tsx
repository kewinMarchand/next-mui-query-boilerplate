'use client'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'

import { StyleguideSection } from '../StyleguideSection'

export const FormsSection = () => (
  <StyleguideSection title="Formulaires">
    <Box
      component="form"
      noValidate
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
      }}
    >
      <TextField label="Nom" helperText="Aide : votre nom complet." autoComplete="name" />
      <TextField
        label="E-mail"
        type="email"
        error
        helperText="Indiquez une adresse e-mail valide, par exemple nom@domaine.fr."
        defaultValue="nom@"
        autoComplete="email"
      />
      <TextField
        label="Quantité"
        type="number"
        slotProps={{ htmlInput: { inputMode: 'numeric', min: 0 } }}
      />
      <TextField label="Désactivé" disabled defaultValue="Non modifiable" />
      <TextField label="Message" multiline minRows={3} />
      <TextField
        select
        label="Exposition"
        slotProps={{ select: { native: true } }}
        defaultValue="soleil"
      >
        <option value="soleil">Soleil</option>
        <option value="mi-ombre">Mi-ombre</option>
        <option value="ombre">Ombre</option>
      </TextField>
      <div>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Case cochée" />
        <FormControlLabel control={<Checkbox disabled />} label="Case désactivée" />
        <FormControlLabel
          control={<Switch defaultChecked slotProps={{ input: { role: 'switch' } }} />}
          label="Interrupteur"
        />
      </div>
      <Box component="fieldset" sx={{ border: 0, m: 0, p: 0 }}>
        <FormLabel component="legend">Taille</FormLabel>
        <RadioGroup name="taille" defaultValue="M" row>
          <FormControlLabel value="S" control={<Radio />} label="S" />
          <FormControlLabel value="M" control={<Radio />} label="M" />
          <FormControlLabel value="L" control={<Radio />} label="L" disabled />
        </RadioGroup>
      </Box>
    </Box>
  </StyleguideSection>
)
