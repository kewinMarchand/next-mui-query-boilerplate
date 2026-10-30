import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import type { KeyboardEvent } from 'react'

const linksOf = (panel: HTMLElement | null, level: number) =>
  Array.from(panel?.querySelectorAll<HTMLElement>(`a[data-level="${level}"]`) ?? [])

export const useCategoryMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openPath, setOpenPath] = useState<string[]>([])
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Un clic hors du menu le ferme.
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (event: MouseEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setIsOpen(false)
      setOpenPath([])
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [isOpen])

  // Recalé sur le bord droit du bouton quand les colonnes ouvertes dépassent du viewport.
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel || !isOpen) return
    panel.style.insetInlineStart = '0'
    panel.style.insetInlineEnd = 'auto'
    if (panel.getBoundingClientRect().right > document.documentElement.clientWidth) {
      panel.style.insetInlineStart = 'auto'
      panel.style.insetInlineEnd = '0'
    }
  }, [isOpen, openPath])

  const close = () => {
    setIsOpen(false)
    setOpenPath([])
  }

  const toggle = () => (isOpen ? close() : setIsOpen(true))

  const openBranch = (level: number, id: string, hasChildren: boolean) =>
    setOpenPath((current) => [...current.slice(0, level), ...(hasChildren ? [id] : [])])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      close()
      buttonRef.current?.focus()
      return
    }

    const link = event.target
    if (!(link instanceof HTMLElement)) return
    const level = Number(link.dataset.level)
    if (Number.isNaN(level)) return

    const siblings = linksOf(panelRef.current, level)
    const index = siblings.indexOf(link)
    const moves: Record<string, HTMLElement | undefined> = {
      ArrowDown: siblings[index + 1],
      ArrowUp: siblings[index - 1],
      ArrowRight:
        link.getAttribute('aria-expanded') === 'true'
          ? linksOf(panelRef.current, level + 1)[0]
          : undefined,
      ArrowLeft: linksOf(panelRef.current, level - 1).find(
        (parent) => parent.getAttribute('aria-expanded') === 'true',
      ),
    }
    const target = moves[event.key]
    if (target) {
      event.preventDefault()
      target.focus()
    }
  }

  return { isOpen, openPath, rootRef, buttonRef, panelRef, close, toggle, openBranch, onKeyDown }
}
