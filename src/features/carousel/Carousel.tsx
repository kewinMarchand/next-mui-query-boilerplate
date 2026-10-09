'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useId } from 'react'

import { AfterHydration, Icon, Picture } from '@/core/ui/ui-kit'

import { useCarousel } from './hooks/useCarousel'

export declare namespace Carousel {
  interface Slide {
    id: string
    title: string
    text: string
    image: { src: string; widths: number[]; width: number; height: number }
  }
}

interface CarouselProps {
  title: string
  slides: Carousel.Slide[]
  'data-testid'?: string
}

const GAP = 3

export const Carousel = ({ title, slides, 'data-testid': testId }: CarouselProps) => {
  const titleId = useId()
  const trackId = useId()
  const {
    viewportRef,
    prevRef,
    nextRef,
    isReady,
    selected,
    snapCount,
    canPrev,
    canNext,
    goPrev,
    goNext,
    goTo,
  } = useCarousel()

  return (
    <Box
      component="section"
      aria-labelledby={titleId}
      aria-roledescription="carrousel"
      data-testid={testId}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}
      >
        <Typography variant="h2" id={titleId}>
          {title}
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button
            ref={prevRef}
            variant="outlined"
            aria-controls={trackId}
            disabled={!canPrev}
            onClick={goPrev}
            startIcon={<Icon name="chevron-left" />}
            data-testid="carousel-prev"
          >
            Précédent
          </Button>
          <Button
            ref={nextRef}
            variant="outlined"
            aria-controls={trackId}
            disabled={!canNext}
            onClick={goNext}
            endIcon={<Icon name="chevron-right" />}
            data-testid="carousel-next"
          >
            Suivant
          </Button>
        </Stack>
      </Stack>

      <Box
        ref={viewportRef}
        role="group"
        aria-label="Diapositives"
        tabIndex={0}
        data-embla-ready={isReady || undefined}
        data-testid="carousel-viewport"
        sx={{
          mt: 2,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '&[data-embla-ready]': { overflow: 'hidden', scrollSnapType: 'none' },
        }}
      >
        <Box
          id={trackId}
          sx={{ display: 'flex', touchAction: 'pan-y pinch-zoom', ml: -GAP, userSelect: 'none' }}
        >
          {slides.map((slide, position) => {
            const slideImage = (
              <Picture
                src={slide.image.src}
                widths={slide.image.widths}
                width={slide.image.width}
                height={slide.image.height}
                alt=""
                draggable={false}
                sizes="(min-width: 1440px) 460px, (min-width: 1024px) 33vw, (min-width: 600px) 50vw, 100vw"
                style={{ width: '100%', height: 'auto', borderRadius: 8 }}
              />
            )
            return (
              <Box
                key={slide.id}
                role="group"
                aria-roledescription="diapositive"
                aria-label={`${position + 1} sur ${slides.length}`}
                data-testid="carousel-slide"
                sx={{
                  flex: { xs: '0 0 100%', sm: '0 0 50%', md: '0 0 calc(100% / 3)' },
                  minWidth: 0,
                  pl: GAP,
                  scrollSnapAlign: 'start',
                }}
              >
                <AfterHydration
                  placeholder={
                    <Box sx={{ aspectRatio: '16 / 9', bgcolor: 'grey.100', borderRadius: 1 }} />
                  }
                >
                  {slideImage}
                </AfterHydration>
                <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
                  {slide.title}
                </Typography>
                <Typography>{slide.text}</Typography>
              </Box>
            )
          })}
        </Box>
      </Box>

      {isReady && snapCount > 1 && (
        <Stack direction="row" sx={{ justifyContent: 'center', mt: 1 }}>
          {Array.from({ length: snapCount }, (_, index) => (
            <Box
              key={index}
              component="button"
              type="button"
              aria-label={`Aller à la diapositive ${index + 1}`}
              aria-current={index === selected ? 'true' : undefined}
              onClick={() => goTo(index)}
              data-testid="carousel-dot"
              sx={{
                width: 44,
                height: 44,
                p: 0,
                border: 0,
                bgcolor: 'transparent',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                '&::after': {
                  content: '""',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'primary.main',
                },
                '&[aria-current="true"]::after': { bgcolor: 'primary.main' },
                '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main' },
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  )
}
