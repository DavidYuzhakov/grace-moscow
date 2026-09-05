'use client'

import { useGSAP } from '@gsap/react'
import { IconExternalLink } from '@tabler/icons-react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import Link from 'next/link'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, TextPlugin)

const HERO_TITLE = 'Добро\nпожаловать!'

export function HeroBlock() {
  const heading = useRef<HTMLHeadingElement>(null)
  const text = useRef<HTMLSpanElement>(null)
  const subBtn = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!text.current || !subBtn.current) {
        return
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(text.current, { text: HERO_TITLE })
        gsap.set(subBtn.current, { autoAlpha: 1 })
        return
      }

      gsap
        .timeline()
        .to(text.current, {
          duration: 1.6,
          ease: 'none',
          text: {
            delimiter: '',
            preserveSpaces: true,
            value: HERO_TITLE,
          },
        })
        .to(
          subBtn.current,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.1',
        )
    },
    { scope: heading },
  )

  return (
    <div className="flex justify-center flex-col h-full">
      <h1
        ref={heading}
        aria-label="Добро пожаловать!"
        className="leading-none text-white lg:text-8xl md:text-7xl xs:text-6xl text-[48px] font-extrabold mb-4 min-h-[2em]"
      >
        <span className="sr-only">Добро пожаловать!</span>
        <span
          ref={text}
          aria-hidden="true"
          className="whitespace-pre-line"
        />
      </h1>
      <div ref={subBtn} className="invisible opacity-0">
        <Link
          href={'/contacts'}
          className="py-2 px-3 w-fit inline-flex items-center gap-2 text-white font-medium rounded-full bg-white/10 backdrop-blur-sm text-nowrap xs:text-sm text-xs"
        >
          Будем рады видеть вас в воскресенье{' '}
          <IconExternalLink className="xs:size-5 size-4" />
        </Link>
      </div>
    </div>
  )
}
