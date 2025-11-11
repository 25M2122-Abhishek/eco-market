import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import CategoryGrid from '../components/CategoryGrid'
import ProductCard from '../components/ProductCard'
import type { Product } from '../types'

interface HomeProps {
  authToken: string | null
  favoritesHook: {
    isFavorite: (id: number) => boolean
    toggleFavorite: (product: Product) => Promise<boolean>
  }
}

function Home({ authToken, favoritesHook }: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [requiresAuth, setRequiresAuth] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const sanitizeProducts = (rawProducts: any[]): Product[] => {
    if (!Array.isArray(rawProducts)) return []

    return rawProducts.filter(p => {
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
    async function loadFeatured() {
      setLoadingFeatured(true)
      setRequiresAuth(false)
      try {
        const { getFeaturedProducts } = await import('../utils/api')
        const response = await getFeaturedProducts(authToken)

        let productsArray: Product[] = []
        if (Array.isArray(response)) {
          productsArray = sanitizeProducts(response)
        } else if (response && response.results) {
          productsArray = sanitizeProducts(response.results)
        }

        const limitedProducts = productsArray.slice(0, 12)
        setFeaturedProducts(limitedProducts)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : ''

        if (errorMessage.includes('Authentication') || errorMessage.includes('credentials')) {
          setRequiresAuth(true)
        }
        setFeaturedProducts([])
      } finally {
        setLoadingFeatured(false)
      }
    }

    loadFeatured()
  }, [authToken])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollPosition = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div>
      <HeroBanner />

      <CategoryGrid />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Top-rated eco-friendly products from trusted sellers
              </p>
            </div>
            <div className="flex items-center gap-3">
              {featuredProducts.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => scroll('left')}
                    className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
                    aria-label="Scroll left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
                    aria-label="Scroll right"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
              {authToken && !requiresAuth && featuredProducts.length > 0 && (
                <Link
                  to="/products"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
                >
                  View All
                </Link>
              )}
            </div>
          </div>

          {loadingFeatured ? (
            <div className="flex gap-4 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-64 flex-shrink-0 bg-gray-100 rounded-2xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : requiresAuth ? (
            <div className="text-center py-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Login to View Products</h3>
              <p className="text-gray-600 mb-6">
                Sign in to browse our collection of eco-friendly products
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
          ) : featuredProducts.length > 0 ? (
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
              >
                {featuredProducts.map((product) => (
                  <div key={product.id} className="w-64 flex-shrink-0">
                    <ProductCard
                      product={product}
                      isFavorite={favoritesHook.isFavorite(product.id)}
                      onToggleFavorite={favoritesHook.toggleFavorite}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Featured Products</h3>
              <p className="text-gray-600 mb-6">
                Check back soon for featured eco-friendly products
              </p>
              {authToken && (
                <Link
                  to="/products"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
                >
                  Browse All Products
                </Link>
              )}
            </div>
          )}
        </div>
      </section>


      <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How EcoMarket Works
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              We're not a store—we're your search engine for sustainable products.
              Find what you need and shop directly from trusted eco-friendly sellers.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Search Once</h3>
                <p className="text-gray-600">Enter your query and we'll scan multiple eco-friendly marketplaces instantly</p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Save Favorites</h3>
                <p className="text-gray-600">Bookmark products you love and compare them across different sellers</p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Shop Direct</h3>
                <p className="text-gray-600">Click through to the seller's website to complete your purchase securely</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Use EcoMarket?
            </h2>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl">
                <span className="text-3xl">⏱️</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Save Time</h3>
                  <p className="text-gray-600">No more browsing dozens of websites. Search multiple eco-stores at once.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl">
                <span className="text-3xl">🌍</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Discover New Sellers</h3>
                  <p className="text-gray-600">Find sustainable brands and marketplaces you might have never known existed.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl">
                <span className="text-3xl">💚</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Shop With Confidence</h3>
                  <p className="text-gray-600">All listed sellers are verified eco-friendly and sustainable businesses.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl">
                <span className="text-3xl">🔒</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Privacy First</h3>
                  <p className="text-gray-600">We don't handle payments or store your data. Shop directly with sellers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
