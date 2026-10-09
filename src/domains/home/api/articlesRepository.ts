import type { Article } from '../common/models/article'

const ARTICLES: Article.Entity[] = [
  {
    id: '1',
    image: '/images/blog-1',
    title: 'Rendu serveur par défaut',
    excerpt: 'Pourquoi la bascule client se pose sur la feuille, et jamais sur la branche.',
    publishedAt: '2026-09-29',
  },
  {
    id: '2',
    image: '/images/blog-2',
    title: 'Un mode accessibilité sans second thème',
    excerpt: 'Des jetons CSS surchargés sous un attribut, posés avant le premier rendu.',
    publishedAt: '2026-09-15',
  },
  {
    id: '3',
    image: '/images/blog-3',
    title: 'Un carrousel qui reste accessible',
    excerpt:
      'Glisser, boutons et pagination, les bons attributs ARIA et aucun défilement automatique.',
    publishedAt: '2026-09-01',
  },
]

const LATENCY_MS = 300

export const findLatestArticles = (): Promise<Article.Entity[]> =>
  new Promise((resolve) => setTimeout(() => resolve(ARTICLES), LATENCY_MS))
