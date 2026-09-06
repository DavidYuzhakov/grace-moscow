import { ErrorState } from '@/components/ErrorState'
import { ScheduleBoard } from '@/components/schedule/ScheduleBoard'
import { sundayService } from '@/services/sunday.service'
import { userService } from '@/services/user.service'
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

  const schedule = await sundayService.getSchedule()

  return (
    <section className="space-y-5">
      <h1 className="font-bold md:mb-5 mb-3 md:block hidden text-3xl">
        Расписание служений
      </h1>

      {schedule.ok ? (
        <ScheduleBoard
          dutyRoles={schedule.data.dutyRoles}
          sundays={schedule.data.sundays}
        />
      ) : (
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <ErrorState error={schedule.error} />
        </div>
      )}
    </section>
  )
}
