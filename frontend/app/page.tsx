import NewsCard from '@/components/NewsCard'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { AboutBlock } from '@/components/blocks/AboutBlock'
import { newsService } from '@/services/news.service'
import { ErrorState } from '@/components/ErrorState'
import { ContactsBlock } from '@/components/blocks/ContactsBlock'
import { HeroBlock } from '@/components/blocks/HeroBlock'

export default async function HomePage() {
  const result = await newsService.getAllNews()
  const news = result.ok ? result.data : []

  return (
    <div className="-mt-24">
      <section className="h-170">
        <div className="pointer-events-none absolute inset-0 -z-1 h-170 w-full">
          <video
            src={'/intro.mp4'}
            loop
            autoPlay
            muted
            playsInline
            controls={false}
            className="h-full object-cover md:object-[0_65%] object-[40%_0] w-full brightness-75"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 md:h-48"
            style={{
              backgroundImage: `linear-gradient(
                to bottom,
                color-mix(in srgb, var(--background) 0%, transparent) 0%,
                color-mix(in srgb, var(--background) 2%, transparent) 15%,
                color-mix(in srgb, var(--background) 8%, transparent) 30%,
                color-mix(in srgb, var(--background) 22%, transparent) 45%,
                color-mix(in srgb, var(--background) 45%, transparent) 60%,
                color-mix(in srgb, var(--background) 70%, transparent) 75%,
                color-mix(in srgb, var(--background) 90%, transparent) 87%,
                color-mix(in srgb, var(--background) 98%, transparent) 95%,
                var(--background) 100%
              )`,
            }}
          />
        </div>
        <HeroBlock />
      </section>
      <section className="md:pb-20 pb-10 md:space-y-16 space-y-10">
        <AboutBlock />
        <Link href={'/about'} className="flex">
          <Button className="mx-auto">Подробнее о нас</Button>
        </Link>
      </section>
      <section className="space-y-6 md:pt-0 pt-5">
        <h2 className="font-medium md:text-4xl text-3xl">Новости</h2>
        {!result.ok ? (
          <ErrorState error={result.error} />
        ) : (
          <>
            <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-1">
              {news.length === 0 && <p>Новостей нет</p>}
              {news.slice(0, 3).map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
            {news.length > 3 && (
              <Link href={'/news'} className="flex">
                <Button className="mx-auto">Больше новостей</Button>
              </Link>
            )}
          </>
        )}
      </section>
      <section className="pt-10 space-y-4">
        <ContactsBlock />
      </section>
    </div>
  )
}
