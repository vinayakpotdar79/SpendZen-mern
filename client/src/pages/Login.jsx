import React, { useState } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FiPieChart ,FiActivity, FiClock } from "react-icons/fi";

export default function Login({  setIsAuthenticated, setUser, fetchExpenses }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await API.post("/auth/login", {
      email: form.email,
      password: form.password
    });
    localStorage.setItem("token", res.data.token);
    setIsAuthenticated(true);
     await fetchExpenses();
    navigate("/"); // redirect to dashboard
  } catch (err) {
    console.error(err.response?.data?.message || "Login failed");
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row w-full max-w-5xl">
        
        {/* Left Side - Branding */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold">₹</span>
              </div>
              <span className="text-3xl font-bold">SpendZen</span>
            </div>
            <p className="text-lg opacity-90 mb-8">
              Continue your journey towards financial freedom. Track, analyze, and optimize your expenses.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <FiActivity className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Real-time Tracking</h3>
                  <p className="text-sm opacity-80">Monitor your expenses as they happen</p>
                </div>
              </div>
            <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <FiPieChart className="text-lg" />
                 </div>
                <div>
                  <h3 className="font-semibold mb-1">Smart Analytics</h3>
                  <p className="text-sm opacity-80">Get insights into your spending patterns</p>
                </div>
                </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <FiClock className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Spending History</h3>
                  <p className="text-sm opacity-80">View detailed reports and insights</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-10 text-sm opacity-80">
            New to SpendZen?{' '}
            <Link to="/register" className="underline font-semibold hover:text-white/80 transition-colors">
              Create account
            </Link>
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="p-12 lg:w-1/2">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-500 mb-8">Access your SpendZen dashboard</p>
            
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-xl text-white mt-10 py-3.5 rounded-xl font-semibold
                 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <div className="mt-5 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}