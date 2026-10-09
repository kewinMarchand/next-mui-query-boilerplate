import { BlogGrid } from './BlogGrid'
import { findLatestArticles } from '../api/articlesRepository'
import { ArticlesLoadError } from '../common/exceptions/ArticlesLoadError'

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
