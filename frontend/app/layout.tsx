import type { Metadata } from 'next'
import { Inter, Great_Vibes } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
})

const greatVibes = Great_Vibes({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-greatVibes',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Благодать север',
  description: 'Церковь благодать москва север',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <head>
        <Script
          src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_API_KEY}&lang=ru_RU`}
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 container pt-24 pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
