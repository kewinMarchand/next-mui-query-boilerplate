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

const TITLE_TIMEOUT_MS = 1_000

// Next diffuse les métadonnées après le rendu : à la navigation, le titre de la nouvelle page peut arriver après l'effet.
// On attend qu'il diffère du précédent, une seconde au plus (deux pages peuvent partager un titre). Une navigation
// pendant l'attente envoie la page en cours aussitôt, pour garder chaque page vue et leur ordre.
const whenTitleReady = (previousTitle: string | undefined, send: (title: string) => void) => {
  const isReady = () => document.title !== '' && document.title !== previousTitle
  if (isReady()) {
    send(document.title)
    return () => {}
  }
  let sent = false
  const finish = () => {
    if (sent) return
    sent = true
    observer.disconnect()
    clearTimeout(timer)
    send(document.title)
  }
  const observer = new MutationObserver(() => {
    if (isReady()) finish()
  })
  const timer = setTimeout(finish, TITLE_TIMEOUT_MS)
  observer.observe(document.head, { subtree: true, childList: true, characterData: true })
  return finish
}

/** Une page vue par navigation de l'App Router, avec l'URL et le titre à jour. */
export const useMatomo = () => {
  const pathname = usePathname()
  const search = useSearchParams().toString()
  const previousUrl = useRef<string | undefined>(undefined)
  const previousTitle = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!MATOMO_CONFIG || mesureRefusee()) return
    const pending: MatomoCommand[] = []
    const queue = (window._paq ??= pending)
    if (previousUrl.current === undefined) {
      setupCommands(MATOMO_CONFIG).forEach((command) => queue.push(command))
      loadTracker(MATOMO_CONFIG.scriptUrl)
    }
    const url = window.location.href
    const referrer = previousUrl.current
    previousUrl.current = url
    return whenTitleReady(previousTitle.current, (title) => {
      previousTitle.current = title
      pageViewCommands({ url, title, referrer }).forEach((command) => queue.push(command))
    })
  }, [pathname, search])
}
