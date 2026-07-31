import qs from 'qs'

type RequestOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, string | object>
  body?: BodyInit | null
}
export type Response<T> = { data: T }
export type Result<T> = { ok: true; data: T } | { ok: false; error: string }

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: 'GET', ...options }),
  post: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: 'POST', ...options }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),
  patch: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: 'PATCH', ...options }),
}

const request = async <T>(
  endpoint: string,
  options: RequestOptions,
): Promise<T> => {
  const { params, headers: optionHeaders, ...fetchOptions } = options
  const isServer = typeof window === 'undefined'
  const baseUrl = isServer
    ? process.env.STRAPI_INTERNAL_URL || 'http://localhost:1337'
    : process.env.NEXT_PUBLIC_STRAPI_API_URL

  let url = `${baseUrl}/api${endpoint}`
  console.log({
    isServer,
    baseUrl,
    url,
  })

  const headers = {
    'Content-Type': 'application/json',
    ...optionHeaders,
  }

  if (params) {
    const queryString = qs.stringify(params, { encodeValuesOnly: true })
    url += `?${queryString}`
  }

  const response = await fetch(url, {
    headers,
    ...fetchOptions,
  })

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return await response.json()
}
