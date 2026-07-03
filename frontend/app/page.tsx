import NewsCard from '@/components/NewsCard'
import { IconExternalLink } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { AboutBlock } from '@/components/AboutBlock'
import { newsService } from '@/services/news.service'
import { ErrorState } from '@/components/ErrorState'

export default async function HomePage() {
  const result = await newsService.getAllNews()
  const news = result.ok ? result.data : []

  return (
    <div className="-mt-24">
      <section className="h-170 ">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="absolute -z-1 inset-0 w-full h-170 object-cover o brightness-75"
          src={'/bg.jpg'}
          alt="одуванчик"
        />
        {/* <video
          src={'./intro2.mp4'}
          loop
          autoPlay
          muted
          playsInline
          controls={false}
          className="absolute inset-0 -z-1 h-[600px] object-cover object-[0_65%] w-full brightness-75"
        /> */}
        <div className="flex justify-center flex-col h-full">
          {/* <TypingText text="Добро пожаловать!" speed={80} /> */}
          <h1
            className={`leading-none text-white text-8xl font-extrabold mb-4`}
          >
            Добро <br /> пожаловать!
          </h1>
          <Link
            href={'/contacts'}
            className="py-2 px-3 w-fit inline-flex items-center gap-3 text-white font-medium text-sm rounded-full bg-white/10 backdrop-blur-sm"
          >
            Будем рады видеть вас в воскресенье <IconExternalLink size={20} />
          </Link>
        </div>
      </section>
      <section className="py-20 space-y-16">
        <AboutBlock />
        <Link href={'/about'} className="flex">
          <Button className="mx-auto">Подробнее о нас</Button>
        </Link>
      </section>
      <section className="space-y-6">
        <h2 className="font-medium text-4xl">Новости</h2>
        {!result.ok ? (
          <ErrorState error={result.error} />
        ) : (
          <>
            <div className="gap-5 grid grid-cols-3">
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
      {/* <section className="pb-20 bg-tertiary">
        <div className="container">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="font-medium text-4xl">Контакты</h2>
          </div>
          <div className="gap-5 grid grid-cols-3"></div>
        </div>
      </section> */}
    </div>
  )
}
