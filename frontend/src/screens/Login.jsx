import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import { UserContext } from "../context/userContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    axios.post("/users/login", { email, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setTimeout(() => navigate("/home"), 500);
      })
      .catch((error) => {
        console.error(error.response?.data);
        setIsLoading(false);
      });
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      </div>

      {/* Card */}
      <div className={`z-10 w-full max-w-md px-6 sm:px-10 transition-all duration-1000 transform ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <div className="bg-[#121212] border border-[#2a2a2a] shadow-2xl rounded-2xl px-6 py-8 sm:px-10 sm:py-10 backdrop-blur-md bg-opacity-70">
          <h2 className="text-3xl text-white font-semibold mb-6 text-center tracking-tight">Login</h2>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#1e1e1e] border border-[#333] rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="dev@domain.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#1e1e1e] border border-[#333] rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 transition duration-300 relative overflow-hidden"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;