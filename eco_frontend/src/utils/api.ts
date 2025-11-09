const API_BASE = 'http://localhost:8000/api'

interface RequestOptions extends RequestInit {
  token?: string | null
}

async function request(endpoint: string, options: RequestOptions = {}) {
  const { token, ...fetchOptions } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Token ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    headers: {
      ...headers,
      ...(fetchOptions.headers as Record<string, string>)
    }
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(error.detail || error.error || 'Request failed')
  }

  return response.json()
}

export async function searchProducts(query: string, token?: string | null) {
  return request(`/products/search?q=${encodeURIComponent(query)}`, { token })
}

export async function login(username: string, password: string) {
  return request('/auth-token/', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
}

export async function signup(username: string, email: string, password: string) {
  return request('/auth/signup/', {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  })
}
