'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconLogin2 } from '@tabler/icons-react'

const navLinks = [
  { name: 'О нас', location: '/about' },
  { name: 'Новости', location: '/news' },
  { name: 'Контакты', location: '/contacts' },
]

export function Header() {
  const pathname = usePathname()
  return (
    <header className="fixed top-3 left-1 right-1 z-10">
      <div className="max-w-325 mx-auto flex justify-between items-center bg-white/90 backdrop-blur-md border-2 border-white/10 shadow-[0_2px_4px_rgba(255,255,255,0.1)_inset,0_0px_12px_rgba(15,23,42,0.08)] py-2 px-5 rounded-full">
        <Link href={'/'}>
          <Image
            className="w-full max-w-20 h-auto"
            width={0}
            height={0}
            sizes="100vw"
            src={'/logo.png'}
            alt="Логотип"
          />
        </Link>
        <nav>
          <ul className="flex items-center gap-12">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`cursor-pointer font-medium hover:text-primary duration-200 ${pathname === link.location ? 'text-primary' : ''}`}
              >
                <Link href={link.location}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          className="text-primary flex items-center gap-1 text-lg font-medium group"
          href={'/auth'}
        >
          Войти{' '}
          <IconLogin2 className="group-hover:translate-x-1 duration-200" />
        </Link>
      </div>
    </header>
  )
}
