'use client'

import { ServerErrorView } from '@/views/errors'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <>
      <title>Une erreur est survenue</title>
      <meta name="robots" content="noindex" />
      <ServerErrorView error={error} />
    </>
  )
}
