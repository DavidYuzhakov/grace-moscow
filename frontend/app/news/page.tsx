import { ErrorState } from '@/components/ErrorState'
import NewsCard from '@/components/NewsCard'
import { newsService } from '@/services/news.service'

export default async function NewsPage() {
  const result = await newsService.getAllNews()
  const news = result.ok ? result.data : []

  return (
    <section>
      <div className="container">
        <h2 className="title mb-5">Новости</h2>
        {!result.ok ? (
          <ErrorState error={result.error} />
        ) : (
          <div className="gap-5 grid grid-cols-3">
            {news.length === 0 && <p>Новостей нет</p>}
            {news.slice(0, 3).map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
