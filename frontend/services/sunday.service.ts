import { api, Response, Result } from '@/lib/api'
import { getAuthToken } from '@/lib/session'
import type { DutyRole, Sunday, SundaySchedule } from '@/models/Sunday'

const getCurrentMoscowDate = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())

export const sundayService = {
  getSchedule: async (): Promise<Result<SundaySchedule>> => {
    try {
      const token = await getAuthToken()
      if (!token) {
        return { ok: false, error: 'Пользователь не авторизован' }
      }

      const headers = { Authorization: `Bearer ${token}` }

      const [sundaysResponse, dutyRolesResponse] = await Promise.all([
        api.get<Response<Sunday[]>>('/sundays', {
          cache: 'no-store',
          headers,
          params: {
            filters: {
              date: {
                $gte: getCurrentMoscowDate(),
              },
            },
            fields: ['date'],
            sort: ['date:asc'],
            populate: {
              duties: {
                fields: ['person'],
                populate: {
                  duty_role: {
                    fields: ['name', 'order'],
                  },
                },
              },
            },
          },
        }),
        api.get<Response<DutyRole[]>>('/duty-roles', {
          cache: 'no-store',
          headers,
          params: {
            fields: ['name', 'order'],
            sort: ['order:asc'],
          },
        }),
      ])

      return {
        ok: true,
        data: {
          sundays: sundaysResponse.data,
          dutyRoles: dutyRolesResponse.data,
        },
      }
    } catch (error) {
      console.error(error)
      return {
        ok: false,
        error: 'Не удалось загрузить график дежурств. Попробуйте позже',
      }
    }
  },
}
