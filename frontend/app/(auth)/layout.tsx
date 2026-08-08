import { userService } from '@/services/user.service'
import { redirect } from 'next/navigation'

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
