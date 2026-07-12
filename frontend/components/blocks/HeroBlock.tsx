import { IconExternalLink } from '@tabler/icons-react'
import Link from 'next/link'

export function HeroBlock() {
  return (
    <div className="flex justify-center flex-col h-full">
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
    </div>
  )
}
