import { useState, useEffect } from 'react'
import type { Product } from '../types'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('eco_favorites')
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to parse favorites:', error)
      }
    }
  }, [])

  const saveFavorites = (newFavorites: Product[]) => {
    setFavorites(newFavorites)
    localStorage.setItem('eco_favorites', JSON.stringify(newFavorites))
  }

  const addFavorite = (product: Product) => {
    if (!favorites.find(p => p.id === product.id)) {
      saveFavorites([...favorites, product])
    }
  }

  const removeFavorite = (productId: string) => {
    saveFavorites(favorites.filter(p => p.id !== productId))
  }

  const isFavorite = (productId: string) => {
    return favorites.some(p => p.id === productId)
  }

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id)
    } else {
      addFavorite(product)
    }
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  }
}
