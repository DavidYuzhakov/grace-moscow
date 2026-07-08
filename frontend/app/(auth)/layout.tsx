import type { Metadata } from 'next'
import { getMeAction } from '@/actions/user'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Аутентификация',
  description: 'Церковь благодать москва север Аутентификация',
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await getMeAction()

  if (data.ok) {
    redirect('/')
  }

  return children
}
