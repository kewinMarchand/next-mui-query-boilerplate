'use client'

import { useReportError } from '@/shared/observability'
import { Link } from '@/shared/ui/kit'

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useReportError(error)

  return (
    <html lang="fr">
      <head>
        <title>Une erreur est survenue</title>
        <meta name="robots" content="noindex" />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 16 }}>
        <main style={{ maxWidth: 640, margin: '0 auto' }}>
          <h1>Une erreur est survenue</h1>
          <p>Le site n'a pas pu s'afficher. Réessayez dans quelques instants.</p>
          <p>
            <Link href="/">Retour à l'accueil</Link>
          </p>
        </main>
      </body>
    </html>
  )
}
