import { newsService } from '@/services/news.service'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { IconPhoneCall } from '@tabler/icons-react'

type NewsDetailsProps = {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailsPage({ params }: NewsDetailsProps) {
  const { slug } = await params
  const { img, title, description, phone, telegramLink } =
    await newsService.getOneNews(slug)
  return (
    <article className="mt-22 pb-10">
      <Image
        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.url}`}
        alt={title}
        width={0}
        height={0}
        sizes="100vw"
        className="z-1 h-auto w-full rounded-3xl text-black"
      />
      <div className="space-y-8 p-4">
        <h2 className="title">{title}</h2>
        <div className="prose border-b-foreground/10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {description}
          </ReactMarkdown>
        </div>
        <div className="divider" />
        <div className="text-center">
          <h4 className="font-bold mb-6 text-[26px]">Контакты для связи</h4>
          <div className="flex gap-2 items-center mx-auto w-fit">
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 bg-foreground rounded-full py-3 px-6 w-fit text-white font-medium"
            >
              Позвонить
              <IconPhoneCall size={23} />
            </a>
            <a
              href={telegramLink}
              className="flex items-center justify-center gap-2 bg-foreground rounded-full py-3 px-6 w-fit text-white font-medium"
            >
              Написать
              <Image
                width={23}
                height={23}
                src={'/telegram.svg'}
                alt="telegram"
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
