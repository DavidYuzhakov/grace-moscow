import type { Metadata } from 'next'
import { Inter, Great_Vibes } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

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
  return (
    <html
      lang="en"
      className={`${inter.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 container pt-24 pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
