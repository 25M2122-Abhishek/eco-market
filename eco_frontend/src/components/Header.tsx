import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-gray-200 z-40">
      <div className="w-full max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Brand */}
        <Link to="/" className="text-green-700 font-bold text-xl">
          EcoMarket
        </Link>

        {/* Navigation */}
        <nav className="flex gap-4 items-center">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 rounded-sm font-medium ${
                isActive ? "bg-green-600 text-white" : "text-green-800 hover:bg-green-200"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-1 rounded-sm font-medium ${
                isActive ? "bg-green-600 text-white" : "text-green-800 hover:bg-green-200"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-3 py-1 rounded-sm font-medium ${
                isActive ? "bg-green-600 text-white" : "text-green-800 hover:bg-green-200"
              }`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `px-3 py-1 rounded-sm font-medium ${
                isActive ? "bg-green-600 text-white" : "text-green-800 hover:bg-green-200"
              }`
            }
          >
            Signup
          </NavLink>

        </nav>
      </div>
    </header>
  );
}
