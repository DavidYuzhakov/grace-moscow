'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconChevronDown,
  IconLogin2,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react'
import { useUser } from '@/contexts/UserContext'
import { UserStatus } from '@/models/User'
import { useEffect, useState } from 'react'
import { Button } from './Button'

const navLinks = [
  { name: 'О нас', location: '/about' },
  { name: 'Новости', location: '/news' },
  { name: 'Контакты', location: '/contacts' },
]

const statusInfo: Record<
  UserStatus,
  { tagStyle: string; description: string }
> = {
  'на модерации': {
    tagStyle: 'bg-purple-100 text-purple-500',
    description: 'Ожидайте статуса «Принято» для доступа к приватным страницам',
  },
  принято: {
    tagStyle: 'bg-green-100 text-green-500',
    description: 'У вас есть доступ к приватным страницам',
  },
  отклонено: {
    tagStyle: 'bg-red-100 text-red-500',
    description: 'Вам запретили доступ к приватным с страницам',
  },
}

export function Header() {
  const { user, logout } = useUser()
  console.log(user)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isOpen) {
        if (!(e.target as HTMLElement)?.closest('#profile-info')) {
          setIsOpen(false)
        }
      }
    }

    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [isOpen])

  return (
    <header className="fixed top-3 left-1 right-1 z-10">
      <div className="max-w-325 mx-auto flex items-center bg-white/90 backdrop-blur-md border-2 border-white/10 shadow-[0_2px_4px_rgba(255,255,255,0.1)_inset,0_0px_12px_rgba(15,23,42,0.08)] py-2 px-5 rounded-full">
        <Link href={'/'} className="w-1/2">
          <Image
            className="w-full max-w-20 h-auto"
            width={0}
            height={0}
            sizes="100vw"
            src={'/logo.png'}
            alt="Логотип"
          />
        </Link>
        <div className="flex items-center justify-between w-1/2">
          <nav className="-translate-x-1/2">
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
          {user ? (
            <div className="relative" onClick={() => setIsOpen(true)}>
              <div className="flex items-center gap-2 hover:text-primary cursor-pointer duration-200">
                <IconUserCircle />
                <div className="font-medium">{user.name}</div>
                <IconChevronDown
                  className={`-ml-1.5 duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  size={20}
                />
              </div>
              {isOpen && (
                <div
                  id="profile-info"
                  className="absolute top-[calc(100%+10px)] right-0 p-3 bg-white rounded-xl  drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)] w-60 space-y-4"
                >
                  <div className="truncate">
                    Email: <span className="text-sm">{user.email}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 ">
                      Статус:{' '}
                      <div
                        className={`text-xs px-2 rounded-full ${statusInfo[user.userStatus].tagStyle}`}
                      >
                        {user.userStatus}
                      </div>
                    </div>

                    <p className="text-xs text-black/70 mt-1">
                      {statusInfo[user.userStatus].description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsOpen(false)
                      logout()
                    }}
                    className="text-red-500 w-full flex items-center gap-2 justify-center py-1 rounded-xl bg-red-50 hover:bg-red-100 disabled:opacity-50"
                  >
                    Выйти
                    <IconLogout size={20} />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Link
              className="text-primary flex items-center gap-1 text-lg font-medium group"
              href={'/login'}
            >
              Войти{' '}
              <IconLogin2 className="group-hover:translate-x-1 duration-200" />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
