import { setAuthToken } from '@/lib/auth/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const accessToken = searchParams.get('access_token')

  if (!accessToken) return NextResponse.redirect(new URL('/', request.url))

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/google/callback?access_token=${accessToken}`,
  )
  const data = await response.json()

  console.log(data)

  await setAuthToken(data.jwt)

  return NextResponse.redirect(new URL('/', request.url))
}
