import { api } from '@/lib/api'
import { News } from '@/types/News'

type Response<T> = { data: T }
type Result<T> = { ok: true; data: T } | { ok: false; error: string }

export const newsService = {
  getAllNews: async (): Promise<Result<News[]>> => {
    try {
      const { data } = await api.get<Response<News[]>>('/news', {
        params: {
          populate: '*',
        },
      })
      return { data, ok: true }
    } catch (error) {
      console.error(error)
      return {
        ok: false,
        error: 'Не удалось загрузить новости. Попробуйте позже',
      }
    }
  },
  getNewsBySlug: async (slug: string): Promise<Result<News>> => {
    try {
      const { data } = await api.get<Response<News[]>>('/news', {
        params: { 'filters[slug][$eq]': slug, populate: '*' },
      })
      return { data: data[0], ok: true }
    } catch (error) {
      console.error(error)
      return {
        ok: false,
        error: 'Не удалось загрузить эту новость. Попробуйте позже',
      }
    }
  },
}
