"use client";

import { useEffect, useState } from "react";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ IMPORTANT for CORS
          body: JSON.stringify({
            email: formData.email.toLowerCase(),
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      const { token, user } = data;

      if (!token || !user) {
        throw new Error("Invalid server response");
      }

      // Save auth data
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.name);

      // Redirect
      if (user.role.toLowerCase() === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.error("Login error:", err.message);
      setError(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center transition-colors ${
        darkMode ? "bg-[#001f3f]" : "bg-white"
      }`}
    >
      <div
        className={`relative w-full max-w-md mx-auto p-6 rounded-xl shadow-lg transition-colors ${
          darkMode ? "bg-[#001f3f]" : "bg-[#f9f9f9]"
        }`}
      >
        <button
          onClick={() => router.push("/")}
          className={`absolute -top-10 left-0 flex items-center font-semibold transition-colors hover:text-orange-500 ${
            darkMode ? "text-[#ffa500]" : "text-[#001f3f]"
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>

        <h2
          className={`text-3xl font-bold text-center mb-6 transition-colors ${
            darkMode ? "text-[#ffa500]" : "text-[#001f3f]"
          }`}
        >
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail
              className={`absolute top-3 left-3 w-5 h-5 ${
                darkMode ? "text-[#ffa500]" : "text-[#4da6ff]"
              }`}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className={`w-full rounded-xl px-10 py-3 bg-transparent focus:outline-none focus:ring-2 ${
                darkMode
                  ? "text-white placeholder:text-gray-300 focus:ring-[#ffa500]"
                  : "text-[#001f3f] placeholder:text-gray-400 focus:ring-[#001f3f]"
              }`}
            />
          </div>

          <div className="relative">
            <Lock
              className={`absolute top-3 left-3 w-5 h-5 ${
                darkMode ? "text-[#ffa500]" : "text-[#4da6ff]"
              }`}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password *"
              className={`w-full rounded-xl px-10 py-3 bg-transparent focus:outline-none focus:ring-2 ${
                darkMode
                  ? "text-white placeholder:text-gray-300 focus:ring-[#ffa500]"
                  : "text-[#001f3f] placeholder:text-gray-400 focus:ring-[#001f3f]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-3 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#001f3f] to-[#4da6ff] text-white font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          className={`text-center text-sm mt-5 ${
            darkMode ? "text-[#ffa500]" : "text-[#001f3f]"
          }`}
        >
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}