import { api, Result } from '@/lib/api'
import { getAuthToken } from '@/lib/session'
import { User } from '@/models/User'

export const userService = {
  getMe: async (): Promise<Result<User>> => {
    try {
      const token = await getAuthToken()
      if (!token) {
        return { ok: false, error: 'Пользователь не авторизован' }
      }

      const data = await api.get<User>('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return { data, ok: true }
    } catch (error) {
      console.error(error)
      return {
        ok: false,
        error: 'Не удалось получить данные о пользователе. Попробуйте позже',
      }
    }
  },
}
