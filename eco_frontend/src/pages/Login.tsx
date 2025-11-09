import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur shadow-lg rounded-xl p-6 border border-green-100">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Login</h2>
        <p className="text-sm text-gray-600 mb-6">
          Access your eco-friendly marketplace account.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          New here?{" "}
          <Link to="/signup" className="text-green-700 font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
