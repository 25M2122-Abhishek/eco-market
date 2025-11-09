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

      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Use EcoMarket?
            </h2>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                <span className="text-3xl">⏱️</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Save Time</h3>
                  <p className="text-gray-600">No more browsing dozens of websites. Search multiple eco-stores at once.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                <span className="text-3xl">🌍</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Discover New Sellers</h3>
                  <p className="text-gray-600">Find sustainable brands and marketplaces you might have never known existed.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                <span className="text-3xl">💚</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Shop With Confidence</h3>
                  <p className="text-gray-600">All listed sellers are verified eco-friendly and sustainable businesses.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
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
