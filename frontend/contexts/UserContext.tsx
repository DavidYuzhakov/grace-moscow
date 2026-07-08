'use client'

import { logoutAction } from '@/actions/auth'
import { User } from '@/models/User'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface UserContextValue {
  user: User | undefined
  setUser: (user: User | undefined) => void
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode
  initialUser: User | undefined
}) {
  const [user, setUser] = useState<User | undefined>(initialUser)

  const logout = useCallback(async () => {
    setUser(undefined)
    await logoutAction()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
