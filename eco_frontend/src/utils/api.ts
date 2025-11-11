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
    const cleanToken = token.trim()
    headers['Authorization'] = `Token ${cleanToken}`
  }

  const url = `${API_BASE}${endpoint}`
  console.log('=== API Request ===')
  console.log('URL:', url)
  console.log('Token:', token ? `${token.substring(0, 10)}...` : 'NONE')
  console.log('Headers:', headers)

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      ...headers,
      ...(fetchOptions.headers as Record<string, string> | undefined),
    },
  })

  console.log('Response status:', response.status)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    console.error('API Error:', error)
    throw new Error(error.detail || error.error || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => ({}))
  console.log('Response data:', data)
  return data
}

export async function searchProducts(
  searchQuery?: string,
  filters?: {
    brand?: string
    category?: string
    sub_category?: string
    seller?: string
    ordering?: string
  },
  token?: string | null
) {
  const params = new URLSearchParams()

  if (searchQuery) params.append('search', searchQuery)
  if (filters?.brand) params.append('brand', filters.brand)
  if (filters?.category) params.append('category', filters.category)
  if (filters?.sub_category) params.append('sub_category', filters.sub_category)
  if (filters?.seller) params.append('seller', filters.seller)
  if (filters?.ordering) params.append('ordering', filters.ordering)

  const queryString = params.toString()
  const endpoint = queryString ? `/products/?${queryString}` : '/products/'

  console.log('searchProducts called with:', { searchQuery, filters, token: token ? 'EXISTS' : 'NULL' })

  return request(endpoint, { token })
}

export async function getFeaturedProducts(token?: string | null) {
  console.log('getFeaturedProducts called with token:', token ? 'EXISTS' : 'NULL')
  return request('/products/?ordering=-rating', { token })
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

export async function logout(token: string | null) {
  return request('/auth/logout/', {
    method: 'POST',
    token
  })
}

export async function getUserFavorites(token: string) {
  return request('/userfavorite/', { token })
}

export async function addToFavorites(productId: number, token: string) {
  return request('/userfavorite/', {
    method: 'POST',
    token,
    body: JSON.stringify({ product_id: productId })
  })
}

export async function removeFromFavorites(favoriteId: number, token: string) {
  return request(`/userfavorite/${favoriteId}/`, {
    method: 'DELETE',
    token
  })
}
