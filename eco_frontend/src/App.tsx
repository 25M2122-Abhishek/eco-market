import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Favorites from './pages/Favorites'
import Products from './pages/Products'
import { useFavorites } from './hooks/useFavorites'
import type { AuthState } from './types'

function App() {
  const [auth, setAuth] = useState<AuthState>({ token: null })
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const favoritesHook = useFavorites(auth.token)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('eco_token')
    console.log('Token from localStorage:', token) // Debug
    if (token) {
      setAuth({ token })
    }
    setIsLoadingAuth(false)
  }, [])

  const saveToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('eco_token', token)
    } else {
      localStorage.removeItem('eco_token')
    }
    setAuth({ token })
  }

  const handleSearch = (query: string) => {
    console.log('Search query:', query) // Debug
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleLogout = async () => {
    const currentToken = auth.token
    try {
      const { logout } = await import('./utils/api')
      await logout(currentToken)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      saveToken(null)
      navigate('/')
    }
  }

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  console.log('Current auth token:', auth.token) // Debug

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
                favoritesHook={favoritesHook}
                authToken={auth.token}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/products"
            element={
              <Products
                favoritesHook={favoritesHook}
                authToken={auth.token}
              />
            }
          />
          <Route path="/login" element={<Login onLogin={saveToken} />} />
          <Route path="/signup" element={<Signup onSignup={saveToken} />} />
          <Route
            path="/favorites"
            element={<Favorites favoritesHook={favoritesHook} authToken={auth.token} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
