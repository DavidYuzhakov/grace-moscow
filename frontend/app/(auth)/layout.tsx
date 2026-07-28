import { userService } from '@/services/user.service'
import type { Metadata } from 'next'
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
  const data = await userService.getMe()

  if (data.ok) {
    redirect('/')
  }

  return children
}
