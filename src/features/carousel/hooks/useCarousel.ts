import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { useEffect, useMemo, useRef, useState } from 'react'

import { A11Y_MODE } from '@/core/theme/a11yMode'

import type { EmblaCarouselType } from 'embla-carousel'

interface CarouselState {
  isReady: boolean
  selected: number
  snapCount: number
  canPrev: boolean
  canNext: boolean
}

const INITIAL_STATE: CarouselState = {
  isReady: false,
  selected: 0,
  snapCount: 0,
  canPrev: false,
  canNext: true,
}

const shouldJump = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.getAttribute(A11Y_MODE.attribute) === A11Y_MODE.enhanced

export const useCarousel = () => {
  const plugins = useMemo(() => [WheelGesturesPlugin()], [])
  const [viewportRef, api] = useEmblaCarousel({ align: 'start' }, plugins)
  const [state, setState] = useState(INITIAL_STATE)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!api) return

    const sync = (embla: EmblaCarouselType) => {
      const canPrev = embla.canScrollPrev()
      const canNext = embla.canScrollNext()
      // Un bouton désactivé perd le focus : on le confie au bouton opposé.
      if (!canPrev && document.activeElement === prevRef.current) nextRef.current?.focus()
      if (!canNext && document.activeElement === nextRef.current) prevRef.current?.focus()
      setState({
        isReady: true,
        selected: embla.selectedScrollSnap(),
        snapCount: embla.scrollSnapList().length,
        canPrev,
        canNext,
      })
    }

    sync(api)
    api.on('select', sync).on('reInit', sync)
    return () => {
      api.off('select', sync).off('reInit', sync)
    }
  }, [api])

  return {
    ...state,
    viewportRef,
    prevRef,
    nextRef,
    goPrev: () => api?.scrollPrev(shouldJump()),
    goNext: () => api?.scrollNext(shouldJump()),
    goTo: (index: number) => api?.scrollTo(index, shouldJump()),
  }
}
