import { api, Response, Result } from '@/lib/api'
import { getAuthToken } from '@/lib/auth/session'
import { Sunday } from '@/models/Sunday'

export const sundayService = {
  getDay: async (): Promise<Result<Sunday>> => {
    try {
      const token = await getAuthToken()
      if (!token) {
        return { ok: false, error: 'Пользователь не авторизован' }
      }

      const { data } = await api.get<Response<Sunday[]>>('/sunday-days', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          populate: '*',
        },
      })

      const date = new Date(data[0].date)
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

      return {
        data: {
          ...data[0],
          date: formattedDate,
        },
        ok: true,
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
