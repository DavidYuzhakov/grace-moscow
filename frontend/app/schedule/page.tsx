import { ErrorState } from '@/components/ErrorState'
import { Tag } from '@/components/Tag'
import { sundayService } from '@/services/sunday.service'
import { userService } from '@/services/user.service'
import { IconClock } from '@tabler/icons-react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Расписание',
  description: 'Актуальный график дежурств для воскресного богослужения.',
}

export default async function SchedulePage() {
  const data = await userService.getMe()
  const user = data.ok ? data.data : undefined

  if (!user) {
    redirect('/')
  }

  if (user.userStatus !== 'принято') {
    redirect('/forbidden')
  }

  const sunday = await sundayService.getDay()

  if (!sunday.ok) {
    return <ErrorState error={sunday.error} />
  }

  return (
    <div className="space-y-5 bg-white shadow-sm p-5 rounded-lg">
      
    </div>
  )
}
