import { useState } from 'react'

// Le titre du tiroir prend le focus à l'ouverture et à chaque niveau (option focusTitle du tiroir de boilerplates-ui).
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  // null : premier niveau (navigation principale), [] : racine du catalogue, puis les identifiants des nœuds ouverts.
  const [levels, setLevels] = useState<string[] | null>(null)

  const close = () => {
    setIsOpen(false)
    setLevels(null)
  }

  return {
    isOpen,
    levels,
    open: () => setIsOpen(true),
    close,
    descend: (id?: string) => setLevels((current) => (id ? [...(current ?? []), id] : [])),
    back: () => setLevels((current) => (current?.length ? current.slice(0, -1) : null)),
  }
}
