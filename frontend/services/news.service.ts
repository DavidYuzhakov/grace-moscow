import { api } from '@/lib/api'
import { News } from '@/types/News'

type Response<T> = { data: T }

export const newsService = {
  getAllNews: async () => {
    const { data } = await api.get<Response<News[]>>('/news', {
      params: {
        populate: '*',
      },
    })
    console.log(data)
    return data
  },
  getOneNews: async (slug: string) => {
    const { data } = await api.get<Response<News[]>>('/news', {
      params: { 'filters[slug][$eq]': slug, populate: '*' },
    })
    console.log(data)
    return data[0]
  },
}
