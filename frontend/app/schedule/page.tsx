import { getMeAction } from '@/actions/user'
import { ErrorState } from '@/components/ErrorState'
import { Tag } from '@/components/Tag'
import { sundayService } from '@/services/sunday.service'
import { IconClock } from '@tabler/icons-react'
import { redirect } from 'next/navigation'

export const DUTY_ROLES = [
  {
    role: 'нулевая хвала',
    time: '16:00 - 16:05',
  },
  {
    role: 'молитва представителя и АСВ',
    time: '16:05 - 16:08',
  },
  {
    role: 'ведущий прославления',
    time: '16:08 - 16:35',
  },
  {
    role: 'молящийся за нужды',
    time: '',
  },
  {
    role: 'благословение детей',
    time: '16:35 - 16:40',
  },
  {
    role: 'представление проповедующего гостя',
    time: '',
  },
  {
    role: 'проповедует',
    time: '16:52 - 17:30',
  },
  {
    role: 'объявления',
    time: '17:30 - 17:35',
  },
  {
    role: 'анонс "десятины", сбор и молитва',
    time: '17:35 - 17:45',
  },
  {
    role: 'благословение пожертвований и десятин. Финал богослужения "Отче наш" + Пасторское Благословение',
    time: '17:45 - 17:50',
  },
  {
    role: 'дежурит в столовой. Переход в столовую',
    time: '17:50 - 17:55',
  },
  {
    role: 'слайды',
    time: '',
  },
  {
    role: 'встреча в фойе на 2 этаже новых людей',
    time: '',
  },
  {
    role: 'детское служение',
    time: '',
  },
]

export default async function SchedulePage() {
  const data = await getMeAction()

  if (!data.ok) {
    redirect('/')
  }

  if (data.data.userStatus !== 'принято') {
    redirect('/forbidden')
  }

  const sunday = await sundayService.getDay()

  if (!sunday.ok) {
    return <ErrorState error={sunday.error} />
  }

  console.log(sunday.data.duties)

  return (
    <div className="space-y-5">
      <h2 className="text-primary title">{sunday.data.date}</h2>
      <div className="grid grid-cols-3 gap-5">
        {DUTY_ROLES.map((row) => {
          const duty = sunday.data.duties.find((a) => a.role === row.role)

          if (!duty?.person) return

          return (
            <div
              className="bg-white shadow-xs rounded-xl p-6 flex flex-col duration-200 hover:-translate-y-2"
              key={duty.id}
            >
              <div className="uppercase text-black/50 text-sm mb-1">
                {row.role}
              </div>
              <div className="flex-1 text-xl text-primary font-semibold mb-7">
                {duty.person}
              </div>
              {row.time && (
                <Tag className="w-fit text-sm shadow-none bg-gray-100 px-3 gap-1">
                  <IconClock size={17} />
                  {row.time}
                </Tag>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
