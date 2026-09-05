import { setAuthToken } from '@/lib/session'
import { NextResponse } from 'next/server'

type VkAuthResponse = {
  jwt?: unknown
}

function redirectTo(request: Request, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.url))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const accessToken = searchParams.get('access_token')

  if (!accessToken) {
    return redirectTo(request, '/login')
  }

  const strapiUrl =
    process.env.STRAPI_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_STRAPI_API_URL ??
    'http://localhost:1337'

  try {
    const callbackUrl = new URL('/api/auth/vk/callback', strapiUrl)
    callbackUrl.searchParams.set('access_token', accessToken)

    for (const parameter of ['raw[user_id]', 'raw[email]']) {
      const value = searchParams.get(parameter)

      if (value) {
        callbackUrl.searchParams.set(parameter, value)
      }
    }

    const response = await fetch(callbackUrl, { cache: 'no-store' })

    if (!response.ok) {
      return redirectTo(request, '/login')
    }

    const data = (await response.json()) as VkAuthResponse

    if (typeof data.jwt !== 'string' || !data.jwt) {
      return redirectTo(request, '/login')
    }

    await setAuthToken(data.jwt)

    return redirectTo(request, '/')
  } catch {
    return redirectTo(request, '/login')
  }
}
