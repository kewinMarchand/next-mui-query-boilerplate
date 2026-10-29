'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { MATOMO_CONFIG, pageViewCommands, setupCommands } from './matomo'
import { mesureRefusee } from './oppositionMesure'

import type { MatomoCommand } from './matomo'

declare global {
  interface Window {
    _paq?: { push: (command: MatomoCommand) => unknown }
  }
}

const loadTracker = (scriptUrl: string) => {
  const script = document.createElement('script')
  script.async = true
  script.src = scriptUrl
  document.head.append(script)
}

/** Une page vue par navigation de l'App Router, avec l'URL et le titre à jour. */
export const useMatomo = () => {
  const pathname = usePathname()
  const search = useSearchParams().toString()
  const previousUrl = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!MATOMO_CONFIG || mesureRefusee()) return
    const pending: MatomoCommand[] = []
    const queue = (window._paq ??= pending)
    if (previousUrl.current === undefined) {
      setupCommands(MATOMO_CONFIG).forEach((command) => queue.push(command))
      loadTracker(MATOMO_CONFIG.scriptUrl)
    }
    const url = window.location.href
    pageViewCommands({ url, title: document.title, referrer: previousUrl.current }).forEach(
      (command) => queue.push(command),
    )
    previousUrl.current = url
  }, [pathname, search])
}
