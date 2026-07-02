import NewsCard from '@/components/NewsCard'
import { newsService } from '@/services/news.service'

export async function getNews() {
  try {
    return newsService.getAllNews()
  } catch (error) {
    console.log(error)
    throw Error('Не удалось загрузить новости')
  }
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <section className="mt-24 pb-10">
      <div className="container">
        <h2 className="text-4xl font-medium mb-5">Новости</h2>
        <div className="gap-5 grid grid-cols-3">
          {news.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
      </div>
    </section>
  )
}
