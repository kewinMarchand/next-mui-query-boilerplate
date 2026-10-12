'use client'

import { ServerErrorView } from '@/views/errors'

export default function Error() {
  return (
    <>
      <title>Une erreur est survenue</title>
      <meta name="robots" content="noindex" />
      <ServerErrorView />
    </>
  )
}
