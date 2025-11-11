import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import type { Product } from '../types'

interface FavoritesProps {
  authToken: string | null
  favoritesHook: {
    favorites: Product[]
    loading: boolean
    error: string | null
    clearError: () => void
    toggleFavorite: (product: Product) => Promise<boolean>
    isFavorite: (id: number) => boolean
  }
}

function Favorites({ authToken, favoritesHook }: FavoritesProps) {
  const { favorites, loading, error, clearError, toggleFavorite, isFavorite } = favoritesHook
  const navigate = useNavigate()

  useEffect(() => {
    if (!authToken) {
      navigate('/login')
    }
  }, [authToken, navigate])

  if (!authToken) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Failed to load favorites</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => {
              clearError()
              window.location.reload()
            }}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No favorites yet</h2>
          <p className="text-gray-600 mb-6">
            Start exploring eco-friendly products and save your favorites for later!
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Favorites
          </h1>
          <p className="text-gray-600">
            You have {favorites.length} saved {favorites.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={isFavorite(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favorites
