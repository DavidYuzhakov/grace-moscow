import { ErrorState } from '@/components/ErrorState'
import { Tag } from '@/components/Tag'
import { sundayService } from '@/services/sunday.service'
import { userService } from '@/services/user.service'
import { IconClock } from '@tabler/icons-react'
import { redirect } from 'next/navigation'

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
    <div className="space-y-5">
      <h2 className="text-primary title">{sunday.data.date}</h2>
      <div className="grid gap-5 lg:grid-cols-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {sunday.data.duties
          .sort((a, b) => a.duty_role.order - b.duty_role.order)
          .map((duty) => {
            if (!duty?.person) return

            return (
              <div
                className="bg-white shadow-xs rounded-xl p-6 flex flex-col duration-200 hover:-translate-y-2"
                key={duty.id}
              >
                <div className="uppercase text-black/50 text-sm mb-1">
                  {duty.duty_role.name}
                </div>
                <div className="flex-1 text-xl text-primary font-semibold mb-7">
                  {duty.person}
                </div>
                {duty.duty_role.time && (
                  <Tag className="w-fit shadow-none bg-gray-100 md:px-3 px-3 gap-1">
                    <IconClock size={17} />
                    <span className="text-sm">{duty.duty_role.time}</span>
                  </Tag>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
