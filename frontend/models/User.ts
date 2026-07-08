export interface User {
  id: number
  email: string
  name: string
  userStatus: UserStatus
}

export type UserStatus = 'на модерации' | 'принято' | 'отклонено'
