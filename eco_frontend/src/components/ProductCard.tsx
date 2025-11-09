import type { Product } from '../types'

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (product: Product) => void
}

function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-emerald-100">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop'
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleFavorite(product)
          }}
          className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <svg
            className={`w-6 h-6 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {product.ecoScore && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
            {product.ecoScore}/100
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 flex-1">
            {product.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
            {product.category}
          </span>
          {product.certifications && product.certifications.length > 0 && (
            <span className="inline-block px-2.5 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
              ✓ Certified
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {product.currency}{product.price.toFixed(2)}
            </span>
            <p className="text-xs text-gray-500 mt-0.5">from {product.source}</p>
          </div>

          <a
            href={product.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            Visit Store
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
