'use client'

import {
  IconArrowsHorizontal,
  IconCalendarWeek,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react'
import { useState } from 'react'

type Ministry = {
  id: string
  name: string
}

type ScheduleDay = {
  id: string
  fullDate: string
  assignments: Record<string, string[]>
}

const ministries: Ministry[] = [
  { id: 'announcement', name: 'Анонс «десятины», сбор и молитва' },
  { id: 'children-blessing', name: 'Благословение детей' },
  {
    id: 'offering-blessing',
    name: 'Благословение пожертвований и десятин',
  },
  { id: 'worship-leader', name: 'Ведущий прославления' },
  { id: 'welcome', name: 'Встреча в фойе новых людей' },
  { id: 'dining-room', name: 'Дежурный в столовой' },
  { id: 'children-ministry', name: 'Детское служение' },
  { id: 'asv-prayer', name: 'Молитва представителя и АСВ' },
  { id: 'needs-prayer', name: 'Молящийся за нужды' },
  { id: 'zero-worship', name: 'Нулевая хвала' },
]

const scheduleDays: ScheduleDay[] = [
  {
    id: '2026-09-06',
    fullDate: 'Воскресенье, 6 сентября',
    assignments: {
      announcement: ['Иванов Иван'],
      'children-blessing': ['Петров Василий'],
      'offering-blessing': ['Сидоров Николай'],
      'worship-leader': ['Воронцова Елена'],
      welcome: ['Алексеева Мария'],
      'dining-room': ['Петров Василий'],
      'children-ministry': ['Иванов Иван'],
      'asv-prayer': ['Воронцова Елена'],
      'needs-prayer': ['Сидоров Николай'],
      'zero-worship': ['Иванов Иван'],
    },
  },
  {
    id: '2026-09-13',
    fullDate: 'Воскресенье, 13 сентября',
    assignments: {
      announcement: ['Петров Василий'],
      'children-blessing': ['Иванов Иван'],
      'offering-blessing': ['Воронцова Елена'],
      'worship-leader': ['Сидоров Николай'],
      welcome: ['Петров Василий'],
      'dining-room': ['Алексеева Мария'],
      'children-ministry': ['Воронцова Елена'],
      'asv-prayer': ['Иванов Иван'],
      'needs-prayer': ['Петров Василий'],
      'zero-worship': ['Сидоров Николай'],
    },
  },
  {
    id: '2026-09-20',
    fullDate: 'Воскресенье, 20 сентября',
    assignments: {
      announcement: ['Алексеева Мария'],
      'children-blessing': ['Сидоров Николай'],
      'offering-blessing': ['Иванов Иван'],
      'worship-leader': ['Петров Василий'],
      welcome: ['Иванов Иван'],
      'dining-room': ['Воронцова Елена'],
      'children-ministry': ['Петров Василий'],
      'asv-prayer': ['Сидоров Николай'],
      'needs-prayer': ['Алексеева Мария'],
      'zero-worship': ['Воронцова Елена'],
    },
  },
  {
    id: '2026-09-27',
    fullDate: 'Воскресенье, 27 сентября',
    assignments: {
      announcement: ['Сидоров Николай'],
      'children-blessing': ['Алексеева Мария'],
      'offering-blessing': ['Петров Василий'],
      'worship-leader': ['Иванов Иван'],
      welcome: ['Воронцова Елена'],
      'dining-room': ['Сидоров Николай'],
      'children-ministry': ['Алексеева Мария'],
      'asv-prayer': ['Петров Василий'],
      'needs-prayer': ['Иванов Иван'],
      'zero-worship': ['Петров Василий'],
    },
  },
]

function People({ names }: { names: string[] | undefined }) {
  if (!names?.length) {
    return <span className="text-slate-400">Не назначен</span>
  }

  return names.map((name) => (
    <span className="block" key={name}>
      {name}
    </span>
  ))
}

export function ScheduleBoard() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const selectedDay = scheduleDays[selectedDayIndex]

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-md">
      <div className="md:hidden">
        <div className="border-b border-slate-200 p-4 space-y-4">
          <div className="flex justify-between items-center gap-2">
            <h2 className="font-bold text-xl">Расписание</h2>
            <div className="font-medium bg-gray-100 rounded-full text-gray-600 px-3 py-1 text-sm">
              {new Date(selectedDay.id).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>
          {scheduleDays.length > 1 && (
            <div
              className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Выберите дату служения"
            >
              {scheduleDays.map((day, index) => {
                const isSelected = selectedDayIndex === index

                return (
                  <button
                    className={`flex h-14 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-500 active:bg-slate-50'
                    }`}
                    key={day.id}
                    onClick={() => setSelectedDayIndex(index)}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="schedule-day-panel"
                  >
                    <span
                      className={`text-md font-bold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-400'}`}
                    >
                      {new Date(day.id).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'numeric',
                      })}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
        <div className="divide-y divide-gray-100 px-4 pb-2">
          {ministries.map((ministry) => (
            <div
              className="grid min-h-18 grid-cols-[minmax(0,1fr)_minmax(105px,42%)] items-center gap-4 py-3"
              key={ministry.id}
            >
              <p className="text-sm font-medium leading-snug text-slate-800">
                {ministry.name}
              </p>
              <div className="text-right text-sm font-semibold leading-snug text-primary">
                <People names={selectedDay.assignments[ministry.id]} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-292.5 table-fixed border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th
                  className="sticky left-0 z-1 w-70 bg-gray-50 border-b border-r border-gray-200 px-6 py-4 font-semibold"
                  scope="col"
                >
                  Служения
                </th>
                {scheduleDays.map((day) => (
                  <th
                    className={`border-b border-gray-200 px-5 bg-white`}
                    key={day.id}
                    scope="col"
                  >
                    <span className="font-semibold">
                      {new Date(day.id).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                      })}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ministries.map((ministry) => (
                <tr className="group" key={ministry.id}>
                  <th
                    className="sticky left-0 z-1 border-b border-r border-gray-200 px-6 py-5 text-sm font-semibold leading-snug transition-colors bg-gray-50  group-hover:bg-secondary/15"
                    scope="row"
                  >
                    {ministry.name}
                  </th>
                  {scheduleDays.map((day, index) => (
                    <td
                      className={`border-b border-gray-100 px-5 py-5 text-sm font-medium leading-snug text-slate-700 transition-colors last:border-r-0 group-hover:bg-secondary/15 bg-white`}
                    >
                      <People names={day.assignments[ministry.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
