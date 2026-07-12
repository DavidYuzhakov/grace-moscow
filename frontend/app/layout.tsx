import type { Metadata } from 'next'
import { Inter, Great_Vibes } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { UserProvider } from '@/contexts/UserContext'
import Script from 'next/script'
import { getMeAction } from '@/actions/user'

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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await getMeAction()

  return (
    <html
      lang="en"
      className={`${inter.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UserProvider initialUser={data.ok ? data.data : undefined}>
          <Header />
          <main className="flex-1 container md:pt-24 pt-20 pb-20">
            {children}
          </main>
          <Footer />
        </UserProvider>
        <Script
          src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_API_KEY}&lang=ru_RU`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
