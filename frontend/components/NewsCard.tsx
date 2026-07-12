'use client'

import { IconCalendarEvent, IconClock, IconMapPin } from '@tabler/icons-react'
import Image from 'next/image'
import { News } from '@/models/News'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Link from 'next/link'

export default function NewsCard({
  title,
  address,
  date,
  time,
  description,
  slug,
  img,
}: News) {
  return (
    <Link href={`/news/${slug}`}>
      <article className="relativef flex flex-col bg-background w-full h-full rounded-3xl border-gray-200 duration-200 hover:drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)] hover:-translate-y-2 self-auto md:drop-shadow-none drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)] active:-translate-y-2">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.url}`}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="z-1 md:h-57 h-auto object-cover w-full rounded-3xl text-black"
        />
        <div className="flex-1 p-5 flex flex-col">
          <h4 className="text-xl font-medium">{title}</h4>
          <div className="flex-1 text-sm border-b-2 prose pb-5 border-b-foreground/10 mt-4 overflow-hidden relative max-h-20">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {description}
            </ReactMarkdown>
            <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-linear-to-t from-20% from-background to-transparent" />
          </div>
          <div className="py-4 space-y-2 text-sm text-black/70">
            <div className="flex items-center gap-2">
              <IconCalendarEvent size={20} className="stroke-primary" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconClock size={20} className="stroke-primary" />
              <span>{time.slice(0, 5)}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconMapPin size={20} className="stroke-primary" />
              <span>{address}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
