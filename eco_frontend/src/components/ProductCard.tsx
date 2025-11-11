import { useState } from 'react'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (product: Product) => Promise<boolean>
}

function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const discount = product.discount ? parseFloat(product.discount.replace(/[^0-9.]/g, '')) : 0
  const rating = product.rating ? parseFloat(product.rating) : 0

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsTogglingFavorite(true)
    await onToggleFavorite(product)
    setIsTogglingFavorite(false)
  }

  const isPlaceholderImage = (url: string): boolean => {
    if (!url) return true
    const lowercaseUrl = url.toLowerCase()
    return (
      lowercaseUrl.includes('loader.gif') ||
      lowercaseUrl.includes('loading.gif') ||
      lowercaseUrl.includes('placeholder') ||
      lowercaseUrl.includes('lazy') ||
      lowercaseUrl.includes('mgt_lazy') ||
      lowercaseUrl === ''
    )
  }

  const getImageUrl = () => {
    if (imageError || !product.img_url || isPlaceholderImage(product.img_url)) {
      return 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop'
    }
    return product.img_url
  }

  const getSellerName = () => {
    if (!product.seller) return 'Unknown Seller'
    try {
      const hostname = new URL(product.seller).hostname.replace('www.', '')
      return hostname.split('.')[0]
    } catch {
      return product.seller
    }
  }

  const getProductLink = () => {
    if (!product.product_link || product.product_link.trim() === '') {
      return product.seller || '#'
    }
    return product.product_link
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-emerald-100 h-full flex flex-col">
      <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 flex-shrink-0">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          </div>
        )}

        <img
          src={getImageUrl()}
          alt={product.title || 'Product image'}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />

        <button
          onClick={handleFavoriteClick}
          disabled={isTogglingFavorite}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isTogglingFavorite ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-emerald-600 rounded-full animate-spin"></div>
          ) : (
            <svg
              className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>

        {rating > 0 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-md z-10">
            ⭐ {rating.toFixed(1)}
          </div>
        )}

        {discount > 0 && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg shadow-md z-10">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-base text-gray-900 line-clamp-2 mb-2 min-h-[3rem]" title={product.title}>
          {product.title || 'Untitled Product'}
        </h3>

        {product.brand && product.brand.trim() !== '' && (
          <p className="text-xs text-gray-500 mb-2">by {product.brand}</p>
        )}

        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {product.category && product.category.trim() !== '' && (
            <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
              {product.category}
            </span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xl font-bold text-gray-900 block">
                {product.selling_price || 'N/A'}
              </span>
              {product.seller && (
                <p className="text-xs text-gray-500 mt-0.5">
                  from {getSellerName()}
                </p>
              )}
            </div>
          </div>

          <a
            href={getProductLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            aria-label={`Visit ${product.title} on seller website`}
          >
            Visit Store
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
