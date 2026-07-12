import NewsCard from '@/components/NewsCard'
import { IconExternalLink } from '@tabler/icons-react'
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
        <video
          src={'./intro.mp4'}
          loop
          autoPlay
          muted
          playsInline
          controls={false}
          className="absolute inset-0 -z-1 h-170 object-cover md:object-[0_65%] object-[40%_0] w-full brightness-75"
        />
        {/* <div className="flex justify-center flex-col h-full">
          <h1
            className={`leading-none text-white lg:text-8xl md:text-7xl xs:text-6xl text-[48px] font-extrabold mb-4`}
          >
            Добро <br /> пожаловать!
          </h1>
          <Link
            href={'/contacts'}
            className="py-2 px-3 w-fit inline-flex items-center gap-2 text-white font-medium rounded-full bg-white/10 backdrop-blur-sm text-nowrap xs:text-sm text-xs"
          >
            Будем рады видеть вас в воскресенье{' '}
            <IconExternalLink className="xs:size-5 size-4" />
          </Link>
        </div> */}
        <HeroBlock />
      </section>
      <section className="md:py-20 py-10 md:space-y-16 space-y-10">
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
