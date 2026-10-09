import type { Carousel } from '@/features/carousel'

const image = (index: number) => ({
  src: `/images/slide-${index}`,
  widths: [640, 1280],
  width: 1280,
  height: 720,
})

export const FEATURED_SLIDES: Carousel.Slide[] = [
  {
    id: 'heliconia',
    title: 'Heliconia',
    text: 'Des bractées rouges et jaunes en pinces de homard, qui tiennent des semaines au jardin.',
    image: image(1),
  },
  {
    id: 'anthurium',
    title: 'Anthurium',
    text: 'Une spathe vernissée qui fleurit presque toute l’année à la lumière vive d’un intérieur.',
    image: image(2),
  },
  {
    id: 'calliandra',
    title: 'Calliandra',
    text: 'Des pompons d’étamines rouges qui attirent colibris et papillons en lisière de jardin.',
    image: image(3),
  },
  {
    id: 'strelitzia',
    title: 'Strelitzia',
    text: 'L’oiseau de paradis, sa fleur orange et bleue et ses grandes feuilles en éventail.',
    image: image(4),
  },
  {
    id: 'nenuphar',
    title: 'Nénuphar',
    text: 'Des fleurs qui s’ouvrent au matin à la surface du bassin et se referment le soir.',
    image: image(5),
  },
]
