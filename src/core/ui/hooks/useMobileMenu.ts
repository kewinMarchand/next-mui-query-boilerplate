import { useEffect, useRef, useState } from 'react'

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  // null : premier niveau (navigation principale), [] : racine du catalogue, puis les slugs ouverts.
  const [levels, setLevels] = useState<string[] | null>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const levelKey = levels?.join('/') ?? 'menu'

  useEffect(() => {
    if (isOpen) titleRef.current?.focus()
  }, [isOpen, levelKey])

  const close = () => {
    setIsOpen(false)
    setLevels(null)
  }

  return {
    focusTitle: () => titleRef.current?.focus(),
    isOpen,
    levels,
    titleRef,
    open: () => setIsOpen(true),
    close,
    descend: (slug?: string) => setLevels((current) => (slug ? [...(current ?? []), slug] : [])),
    back: () => setLevels((current) => (current?.length ? current.slice(0, -1) : null)),
  }
}
