import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import type { AuthState } from '../types'

interface HeaderProps {
  auth: AuthState
  onLogout: () => void
  onSearch: (query: string) => void
  favoritesCount: number
}

function Header({ auth, onLogout, onSearch, favoritesCount }: HeaderProps) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogoutClick = async () => {
    await onLogout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white text-xl font-bold">♻</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              EcoMarket
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={onSearch} />
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/favorites" className="relative text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorites
              </span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {auth.token ? (
              <button
                onClick={handleLogoutClick}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block px-5 py-2.5 border-2 border-emerald-600 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
                >
                  Sign up
                </Link>
              </>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-emerald-50 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <SearchBar onSearch={onSearch} />
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2 border-t border-emerald-100 pt-4">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">
              Home
            </Link>
            <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">
              About
            </Link>
            <Link to="/favorites" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">
              Favorites ({favoritesCount})
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
