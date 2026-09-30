import Typography from '@mui/material/Typography'

import { ContactForm } from './ContactForm'

export const ContactView = () => (
  <>
    <Typography variant="h1" gutterBottom>
      Contact
    </Typography>
    <Typography sx={{ mb: 3 }}>
      Formulaire validé par un schéma zod et envoyé via une mutation TanStack Query.
    </Typography>
    <ContactForm />
  </>
)
