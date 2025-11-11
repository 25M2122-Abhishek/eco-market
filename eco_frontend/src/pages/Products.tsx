import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import type { Product } from '../types'

interface ProductsProps {
  authToken: string | null
  favoritesHook: {
    isFavorite: (id: number) => boolean
    toggleFavorite: (product: Product) => Promise<boolean>
  }
}

function Products({ authToken, favoritesHook }: ProductsProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const searchQuery = searchParams.get('search') || ''
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    seller: searchParams.get('seller') || '',
    ordering: searchParams.get('ordering') || '-rating'
  })

  // Validate and sanitize product data
  const sanitizeProducts = (rawProducts: any[]): Product[] => {
    if (!Array.isArray(rawProducts)) return []

    return rawProducts.filter(p => {
      // Must have at least id and title
      return p && typeof p.id !== 'undefined' && p.title
    }).map(p => ({
      id: p.id,
      title: p.title || 'Untitled Product',
      brand: p.brand || null,
      selling_price: p.selling_price || 'N/A',
      cost_price: p.cost_price || null,
      img_url: p.img_url || '',
      discount: p.discount || null,
      rating: p.rating || null,
      description: p.description || null,
      category: p.category || null,
      sub_category: p.sub_category || null,
      seller: p.seller || '',
      product_link: p.product_link || ''
    }))
  }

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      setError(null)
      try {
        const { searchProducts } = await import('../utils/api')
        const response = await searchProducts(
          searchQuery || undefined,
          {
            category: filters.category || undefined,
            brand: filters.brand || undefined,
            seller: filters.seller || undefined,
            ordering: filters.ordering
          },
          authToken
        )

        let productsArray: Product[] = []
        if (Array.isArray(response)) {
          productsArray = sanitizeProducts(response)
        } else if (response && response.results) {
          productsArray = sanitizeProducts(response.results)
        }

        setProducts(productsArray)
        setTotalCount(response.count || productsArray.length)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load products'
        console.error('Failed to load products:', errorMessage)

        if (errorMessage.includes('Authentication') || errorMessage.includes('credentials')) {
          setError('Please login to browse products')
        } else {
          setError(errorMessage)
        }
        setProducts([])
        setTotalCount(0)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [searchQuery, filters, authToken])

  const updateFilters = (newFilters: typeof filters) => {
    setFilters(newFilters)
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (newFilters.category) params.set('category', newFilters.category)
    if (newFilters.brand) params.set('brand', newFilters.brand)
    if (newFilters.seller) params.set('seller', newFilters.seller)
    if (newFilters.ordering) params.set('ordering', newFilters.ordering)
    setSearchParams(params)
  }

  const clearFilters = () => {
    const newFilters = { category: '', brand: '', seller: '', ordering: '-rating' }
    setFilters(newFilters)
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    params.set('ordering', '-rating')
    setSearchParams(params)
  }

  const clearSearch = () => {
    setSearchParams({})
    setFilters({ category: '', brand: '', seller: '', ordering: '-rating' })
  }

  if (error && error.includes('login')) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please login to browse our eco-friendly products catalog
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {loading ? 'Loading...' : error ? 'Error loading products' : `${totalCount} products found`}
          </p>
        </div>

        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.ordering}
                onChange={(e) => updateFilters({ ...filters, ordering: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
              >
                <option value="-rating">Highest Rated</option>
                <option value="rating">Lowest Rated</option>
                <option value="selling_price">Price: Low to High</option>
                <option value="-selling_price">Price: High to Low</option>
                <option value="title">Name: A to Z</option>
                <option value="-title">Name: Z to A</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={filters.category}
                onChange={(e) => updateFilters({ ...filters, category: e.target.value })}
                placeholder="Filter by category"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                value={filters.brand}
                onChange={(e) => updateFilters({ ...filters, brand: e.target.value })}
                placeholder="Filter by brand"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller
              </label>
              <input
                type="text"
                value={filters.seller}
                onChange={(e) => updateFilters({ ...filters, seller: e.target.value })}
                placeholder="Filter by seller"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            {(filters.category || filters.brand || filters.seller) && (
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear Filters
              </button>
            )}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {error && !error.includes('login') && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              Showing {products.length} {products.length === totalCount ? '' : `of ${totalCount}`} products
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favoritesHook.isFavorite(product.id)}
                  onToggleFavorite={favoritesHook.toggleFavorite}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Try different search terms or adjust your filters' : 'Try adjusting your filters'}
            </p>
            {(searchQuery || filters.category || filters.brand || filters.seller) && (
              <button
                onClick={() => {
                  clearSearch()
                  clearFilters()
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
              >
                View All Products
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
