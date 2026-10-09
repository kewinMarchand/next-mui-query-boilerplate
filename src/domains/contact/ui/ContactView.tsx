import Typography from '@mui/material/Typography'

import { buildBreadcrumb, PageContainer } from '@/core/ui/layouts'

import { ContactForm } from './ContactForm'

export const ContactView = () => (
  <PageContainer breadcrumb={buildBreadcrumb('/contact')}>
    <Typography variant="h1" gutterBottom>
      Contact
    </Typography>
    <Typography sx={{ mb: 3 }}>
      Formulaire validé par un schéma zod et envoyé via une mutation TanStack Query.
    </Typography>
    <ContactForm />
  </PageContainer>
)
