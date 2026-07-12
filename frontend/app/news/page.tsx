import { ErrorState } from '@/components/ErrorState'
import NewsCard from '@/components/NewsCard'
import { newsService } from '@/services/news.service'

export default async function NewsPage() {
  const result = await newsService.getAllNews()
  const news = result.ok ? result.data : []

  return (
    <section>
      <h2 className="title md:mb-5 mb-3">Новости</h2>
      {!result.ok ? (
        <ErrorState error={result.error} />
      ) : (
        <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-1">
          {news.length === 0 && <p>Новостей нет</p>}
          {news.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
      )}
    </section>
  )
}
