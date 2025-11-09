import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error || "Signup failed");
      } else {
        setSuccessMsg("Account created successfully!");
      }
    } catch (error) {
      setErrorMsg("Cannot reach server");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur shadow-lg rounded-xl p-6 border border-green-100">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Create an Account</h2>
        <p className="text-sm text-gray-600 mb-6">
          Join EcoMarket and start your sustainable journey.
        </p>

        {errorMsg && (
          <p className="mb-3 text-red-600 font-medium">{errorMsg}</p>
        )}

        {successMsg && (
          <p className="mb-3 text-green-700 font-medium">{successMsg}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
              placeholder="yourusername"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
