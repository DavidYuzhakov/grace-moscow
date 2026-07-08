import { cookies } from 'next/headers'

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get('jwt')?.value
}

export async function setAuthToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('jwt', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
}

export async function removeAuthToken() {
  const cookieStore = await cookies()
  cookieStore.delete('jwt')
}
