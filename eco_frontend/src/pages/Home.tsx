import HeroBanner from '../components/HeroBanner'
import CategoryGrid from '../components/CategoryGrid'
import ProductCard from '../components/ProductCard'
import type { Product } from '../types'

interface HomeProps {
  searchResults: Product[]
  isSearching: boolean
  favoritesHook: {
    isFavorite: (id: string) => boolean
    toggleFavorite: (product: Product) => void
  }
}

function Home({ searchResults, isSearching, favoritesHook }: HomeProps) {
  return (
    <div>
      <HeroBanner />

      {searchResults.length > 0 ? (
        <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Search Results ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favoritesHook.isFavorite(product.id)}
                  onToggleFavorite={favoritesHook.toggleFavorite}
                />
              ))}
            </div>
          </div>
        </section>
      ) : isSearching ? (
        <section className="py-16 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Searching eco-friendly products...</p>
        </section>
      ) : (
        <CategoryGrid />
      )}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose EcoMarket?
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              We aggregate eco-friendly products from trusted sustainable marketplaces, making it easy to shop consciously.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Multi-Store Search</h3>
                <p className="text-gray-600">Search across multiple eco-friendly marketplaces in one place</p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Verified Sellers</h3>
                <p className="text-gray-600">All products from certified sustainable and ethical sellers</p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Save Favorites</h3>
                <p className="text-gray-600">Bookmark products you love and access them anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
