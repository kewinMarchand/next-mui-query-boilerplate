import { Suspense } from 'react'

import { BlogGrid } from './BlogGrid'
import styles from './BlogSection.module.css'
import { LatestArticles } from './LatestArticles'

export const BlogSection = () => (
  <section aria-labelledby="home-blog-title" data-testid="home-blog">
    <h2 id="home-blog-title" className={`bui-text bui-text--h2 ${styles.title}`}>
      Derniers articles
    </h2>
    <Suspense fallback={<BlogGrid status="pending" articles={undefined} />}>
      <LatestArticles />
    </Suspense>
  </section>
)
