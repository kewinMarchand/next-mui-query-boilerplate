import { SITE } from '@/core/config'

import type { Metadata } from 'next'

const DEFAULT_OG_IMAGE = {
  url: '/images/og-image.jpg',
  width: 1200,
  height: 630,
  alt: SITE.name,
}

interface PageSeo {
  title: string
  description: string
  path: string
  noindex?: boolean
  image?: typeof DEFAULT_OG_IMAGE
  isAbsoluteTitle?: boolean
}

export const absoluteUrl = (path: string) => new URL(path, SITE.url).toString()

export const buildMetadata = ({
  title,
  description,
  path,
  noindex = false,
  image = DEFAULT_OG_IMAGE,
  isAbsoluteTitle = false,
}: PageSeo): Metadata => ({
  title: isAbsoluteTitle ? { absolute: title } : title,
  description,
  alternates: { canonical: path },
  robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title,
    description,
    url: path,
    locale: SITE.locale,
    images: [image],
  },
  twitter: { card: 'summary_large_image', title, description, images: [image.url] },
})
