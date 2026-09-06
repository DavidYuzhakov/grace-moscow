'use client'

import type { DutyRole, Sunday } from '@/models/Sunday'
import { IconCalendarWeek } from '@tabler/icons-react'
import { useState } from 'react'

type ScheduleBoardProps = {
  sundays: Sunday[]
  dutyRoles: DutyRole[]
}

const parseDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

const formatDate = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'UTC',
    ...options,
  }).format(parseDate(date))

const getRoleKey = (role: DutyRole) => role.documentId || String(role.id)

const getPeople = (sunday: Sunday, role: DutyRole) =>
  sunday.duties
    .filter((duty) => {
      if (!duty.duty_role) return false
      return getRoleKey(duty.duty_role) === getRoleKey(role)
    })
    .map((duty) => duty.person?.trim())
    .filter((person): person is string => Boolean(person))

function People({ names }: { names: string[] | undefined }) {
  if (!names?.length) {
    return <span className="text-slate-400">Не назначен</span>
  }

  return names.map((name, index) => (
    <span className="block" key={`${name}-${index}`}>
      {name}
    </span>
  ))
}

export function ScheduleBoard({ sundays, dutyRoles }: ScheduleBoardProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const scheduleDays = [...sundays].sort((a, b) => a.date.localeCompare(b.date))
  const ministries = [...dutyRoles].sort((a, b) => a.order - b.order)

  if (!scheduleDays.length || !ministries.length) {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <IconCalendarWeek size={28} stroke={1.7} />
        </span>
        <h2 className="mt-3 text-lg font-bold text-slate-900">
          Расписание пока не опубликовано
        </h2>
      </div>
    )
  }

  const selectedDay =
    scheduleDays[Math.min(selectedDayIndex, scheduleDays.length - 1)]

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-md">
      <div className="md:hidden">
        <div className="border-b border-slate-200 p-4 space-y-4">
          <div className="flex justify-between items-center gap-2">
            <h2 className="font-bold text-xl">Расписание</h2>
            <div className="font-medium bg-gray-100 rounded-full text-gray-600 px-3 py-1 text-sm">
              {formatDate(selectedDay.date, {
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
                    key={day.documentId}
                    onClick={() => setSelectedDayIndex(index)}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="schedule-day-panel"
                  >
                    <span
                      className={`text-md font-bold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-400'}`}
                    >
                      {formatDate(day.date, {
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
              key={ministry.documentId}
            >
              <p className="text-sm font-medium leading-snug text-slate-800">
                {ministry.name}
              </p>
              <div className="text-right text-sm font-semibold leading-snug text-primary">
                <People names={getPeople(selectedDay, ministry)} />
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
                    key={day.documentId}
                    scope="col"
                  >
                    <span className="font-semibold">
                      {formatDate(day.date, {
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
                <tr className="group" key={ministry.documentId}>
                  <th
                    className="sticky left-0 z-1 border-b border-r border-gray-200 px-6 py-5 text-sm font-semibold leading-snug transition-colors bg-gray-50  group-hover:bg-secondary/15"
                    scope="row"
                  >
                    {ministry.name}
                  </th>
                  {scheduleDays.map((day) => (
                    <td
                      className={`border-b border-gray-100 px-5 py-5 text-sm font-medium leading-snug text-slate-700 transition-colors last:border-r-0 group-hover:bg-secondary/15 bg-white`}
                      key={`${day.documentId}-${ministry.documentId}`}
                    >
                      <People names={getPeople(day, ministry)} />
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
