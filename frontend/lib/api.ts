type RequestOptions = RequestInit & {
  params?: Record<string, string>
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
  let url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const config = {
    headers,
    ...options,
  }

  if (options.params) {
    url += `?${new URLSearchParams(options.params).toString()}`
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return await response.json()
}
