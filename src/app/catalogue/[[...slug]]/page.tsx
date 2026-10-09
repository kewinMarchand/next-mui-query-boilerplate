import { buildCatalogMetadata, CatalogView } from '@/domains/catalog'

import type { Metadata } from 'next'

interface CatalogPageProps {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({
  params,
  searchParams,
}: CatalogPageProps): Promise<Metadata> {
  const [{ slug = [] }, query] = await Promise.all([params, searchParams])
  return buildCatalogMetadata(slug, query)
}

export default async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  const [{ slug = [] }, query] = await Promise.all([params, searchParams])
  return <CatalogView slugs={slug} searchParams={query} />
}
