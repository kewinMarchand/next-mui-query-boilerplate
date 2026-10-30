import { buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import { ContactForm } from './ContactForm'
import styles from './ContactView.module.css'

export const ContactView = () => (
  <PageContainer breadcrumb={buildBreadcrumb('/contact')}>
    <h1 className={`bui-text bui-text--h1 ${styles.title}`}>Contact</h1>
    <p className={`bui-text ${styles.intro}`}>
      Formulaire validé par un schéma zod et envoyé via une mutation TanStack Query.
    </p>
    <ContactForm />
  </PageContainer>
)
