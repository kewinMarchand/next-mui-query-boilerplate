export interface SiteConfig {
  name: string
  description: string
  url: string
  locale: string
}

export const SITE: SiteConfig = {
  name: 'Next MUI Query Boilerplate',
  description:
    'Boilerplate Next.js App Router avec MUI, TanStack Query, react-hook-form et zod, outillé pour la QA et les tests end-to-end.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'fr_FR',
}
