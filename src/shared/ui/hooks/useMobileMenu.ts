import { useCallback, useEffect, useRef, useState } from 'react'

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  // null : premier niveau (navigation principale), [] : racine du catalogue, puis les slugs ouverts.
  const [levels, setLevels] = useState<string[] | null>(null)
  const titleNode = useRef<HTMLHeadingElement | null>(null)
  const levelKey = levels?.join('/') ?? 'menu'

  // Le panneau est chargé à la demande : le titre n'existe qu'une fois monté, il prend le focus à ce moment.
  const titleRef = useCallback((node: HTMLHeadingElement | null) => {
    titleNode.current = node
    node?.focus()
  }, [])

  useEffect(() => {
    if (isOpen) titleNode.current?.focus()
  }, [isOpen, levelKey])

  const close = () => {
    setIsOpen(false)
    setLevels(null)
  }

  return {
    isOpen,
    levels,
    titleRef,
    open: () => setIsOpen(true),
    close,
    descend: (slug?: string) => setLevels((current) => (slug ? [...(current ?? []), slug] : [])),
    back: () => setLevels((current) => (current?.length ? current.slice(0, -1) : null)),
  }
}
