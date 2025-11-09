export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  image: string
  category: string
  source: string
  sourceUrl: string
  ecoScore?: number
  certifications?: string[]
}

export interface AuthState {
  token: string | null
}

export interface User {
  id: string
  username: string
  email: string
}

export interface SearchFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  certifications?: string[]
}
