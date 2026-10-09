'use client'

import { ServerErrorView } from '@/domains/errors'

export default function Error() {
  return (
    <>
      <title>Une erreur est survenue</title>
      <meta name="robots" content="noindex" />
      <ServerErrorView />
    </>
  )
}
