export interface PublisherConfig {
  legalName: string
  address: string
  siret: string
  publicationDirector: string
  email: string
  host: { name: string; address: string }
}

export interface AccessibilityAuditConfig {
  auditDate: string | null
  complianceRate: number | null
  auditor: string | null
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  locale: string
  publisher: PublisherConfig
  accessibility: AccessibilityAuditConfig
}

export const SITE: SiteConfig = {
  name: 'Next MUI Query Boilerplate',
  description:
    'Boilerplate Next.js App Router avec MUI, TanStack Query, react-hook-form et zod, outillé pour la QA et les tests end-to-end.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'fr_FR',
  publisher: {
    legalName: 'Exemple SAS (société fictive)',
    address: '1 rue de l’Exemple, 13000 Marseille',
    siret: '000 000 000 00000',
    publicationDirector: 'Camille Exemple',
    email: 'contact@example.com',
    host: { name: 'Hébergeur Exemple', address: '2 avenue de l’Exemple, 75000 Paris' },
  },
  accessibility: { auditDate: null, complianceRate: null, auditor: null },
}
