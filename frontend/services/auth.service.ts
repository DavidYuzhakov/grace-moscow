import { api } from '@/lib/api'
import { setAuthToken } from '@/lib/auth/session'
import { User } from '@/models/User'

type RegisterPayload = {
  email: string
  password: string
  name: string
}

type LoginPayload = {
  identifier: string
  password: string
}

type ResponseAuth = {
  user: User
  jwt: string
}

export const authService = {
  register: async (payload: RegisterPayload): Promise<User> => {
    const { jwt, user } = await api.post<ResponseAuth>('/auth/local/register', {
      body: JSON.stringify({ ...payload, username: payload.email }),
    })

    await setAuthToken(jwt)
    return user
  },
  login: async (payload: LoginPayload) => {
    const { jwt, user } = await api.post<ResponseAuth>('/auth/local', {
      body: JSON.stringify(payload),
    })

    await setAuthToken(jwt)
    return user
  },
}
