type RequestOptions = RequestInit & { params?: Record<string, string> }

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

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  if (options.params) {
    url += `?${new URLSearchParams(options.params).toString()}`
  }

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, config)

  if (!response.ok) throw Error(`HTTP ${response.status}`)

  return await response.json()
}
