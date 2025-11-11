export interface Product {
  id: number
  title: string
  brand: string | null
  selling_price: string
  cost_price: string | null
  img_url: string
  discount: string | null
  rating: string | null
  description: string | null
  category: string | null
  sub_category: string | null
  seller: string
  product_link: string
}

export interface UserFavorite {
  id: number
  product: Product
  added_at: string
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
  brand?: string
  category?: string
  sub_category?: string
  seller?: string
  ordering?: string
}

export interface ProductsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Product[]
}
