import { preload } from 'react-dom'

import type { CSSProperties } from 'react'

interface PictureProps {
  /** Chemin sans largeur ni extension : `/images/hero` sert `/images/hero-640.avif`, etc. */
  src: string
  widths: number[]
  width: number
  height: number
  sizes: string
  alt: string
  isPriority?: boolean
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  draggable?: boolean
  style?: CSSProperties
}

const srcSet = (src: string, widths: number[], extension: string) =>
  widths.map((width) => `${src}-${width}.${extension} ${width}w`).join(', ')

/** Variantes AVIF puis WebP générées à l'avance : aucun encodage à la volée par le serveur. */
export const Picture = ({
  src,
  widths,
  width,
  height,
  sizes,
  alt,
  isPriority = false,
  loading = isPriority ? 'eager' : 'lazy',
  fetchPriority = isPriority ? 'high' : 'auto',
  draggable,
  style,
}: PictureProps) => {
  const avif = srcSet(src, widths, 'avif')
  if (isPriority) {
    preload(`${src}-${widths.at(-1)}.avif`, {
      as: 'image',
      imageSrcSet: avif,
      imageSizes: sizes,
      fetchPriority: 'high',
      type: 'image/avif',
    })
  }

  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(src, widths, 'webp')} sizes={sizes} />
      <img
        src={`${src}-${widths.at(-1)}.webp`}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        draggable={draggable}
        style={style}
      />
    </picture>
  )
}
