import { useState, useEffect, useCallback } from 'react'
import type { Product, UserFavorite } from '../types'
import { getUserFavorites, addToFavorites, removeFromFavorites } from '../utils/api'

export function useFavorites(token: string | null) {
  const [favorites, setFavorites] = useState<UserFavorite[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadFavorites = useCallback(async () => {
    if (!token) {
      setFavorites([])
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await getUserFavorites(token)
      setFavorites(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load favorites')
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  const addFavorite = async (product: Product) => {
    if (!token) {
      setError('Please login to add favorites')
      return false
    }

    try {
      const newFavorite = await addToFavorites(product.id, token)
      setFavorites(prev => [...prev, newFavorite])
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add favorite')
      return false
    }
  }

  const removeFavorite = async (productId: number) => {
    if (!token) {
      setError('Please login to manage favorites')
      return false
    }

    const favorite = favorites.find(f => f.product.id === productId)
    if (!favorite) return false

    try {
      await removeFromFavorites(favorite.id, token)
      setFavorites(prev => prev.filter(f => f.id !== favorite.id))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove favorite')
      return false
    }
  }

  const isFavorite = (productId: number) => {
    return favorites.some(f => f.product.id === productId)
  }

  const toggleFavorite = async (product: Product) => {
    if (isFavorite(product.id)) {
      return await removeFavorite(product.id)
    } else {
      return await addFavorite(product)
    }
  }

  const clearError = () => setError(null)

  return {
    favorites: favorites.map(f => f.product),
    userFavorites: favorites,
    loading,
    error,
    clearError,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    refreshFavorites: loadFavorites
  }
}
