import { findLatestArticles } from '../infrastructure/articleRepository'
import { ArticlesLoadError } from '../infrastructure/ArticlesLoadError'
import { BlogGrid } from './BlogGrid'

export const LatestArticles = async () => {
  const articles = await findLatestArticles().catch((error: unknown) => {
    console.error(error)
    return null
  })

  if (!articles) {
    return (
      <BlogGrid
        status="error"
        articles={undefined}
        errorMessage={new ArticlesLoadError().message}
      />
    )
  }

  return <BlogGrid status="success" articles={articles} />
}
