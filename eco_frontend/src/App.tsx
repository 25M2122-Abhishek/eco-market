import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Favorites from './pages/Favorites'
import { useFavorites } from './hooks/useFavorites'
import type { AuthState, Product } from './types'

function App() {
  const [auth, setAuth] = useState<AuthState>({ token: null })
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const favoritesHook = useFavorites()

  useEffect(() => {
    const token = localStorage.getItem('eco_token')
    if (token) setAuth({ token })
  }, [])

  const saveToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('eco_token', token)
    } else {
      localStorage.removeItem('eco_token')
    }
    setAuth({ token })
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    setIsSearching(true)
    try {
      const { searchProducts } = await import('./utils/api')
      const results = await searchProducts(query, auth.token)
      setSearchResults(results.products || [])
    } catch {
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleLogout = async () => {
    const currentToken = auth.token
    try {
      const { logout } = await import('./utils/api')
      await logout(currentToken)
      console.log('Logged out successfully')
    } catch {
    } finally {
      saveToken(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header
        auth={auth}
        onLogout={handleLogout}
        onSearch={handleSearch}
        favoritesCount={favoritesHook.favorites.length}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchResults={searchResults}
                isSearching={isSearching}
                favoritesHook={favoritesHook}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={saveToken} />} />
          <Route path="/signup" element={<Signup onSignup={saveToken} />} />
          <Route
            path="/favorites"
            element={<Favorites favoritesHook={favoritesHook} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
