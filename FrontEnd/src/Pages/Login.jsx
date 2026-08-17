import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  
  // =========================
  // Handle Input
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMsg("");
  };

  // =========================
  // Handle Login
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMsg("");

    if (!form.email || !form.password) {
      setMsg("Email and password are required");
      return;
    }

    if (form.password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/user/login", form);

      console.log("Login Response:", response.data);

      const data = response.data;

      // Check if login was successful
      if (!data.success) {
        setMsg(data.message || "Login failed");
        return;
      }

      // =========================
      // Save JWT Token
      // =========================

      localStorage.setItem("token", data.token);

      // =========================
      // Save User
      // =========================

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      setMsg(data.message || "Login successful");

      // Clear form
      setForm({
        email: "",
        password: "",
      });

      // Navigate Home
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("Login Error:", error);

      setMsg(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-5 py-10">

      {/* Background Decoration */}

      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-200 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-blue-300 blur-3xl" />

      {/* Login Card */}

      <div className="relative w-full max-w-md">

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">

          {/* Header */}

          <div className="bg-blue-600 px-8 py-8 text-center text-white">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
              🛍️
            </div>

            <h1 className="text-3xl font-extrabold">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-blue-100">
              Login to your ShopEase account
            </p>

          </div>

          {/* Form Area */}

          <div className="p-7 md:p-8">

            {/* Message */}

            {msg && (
              <div
                className={`mb-5 rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                  msg.toLowerCase().includes("successful")
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-blue-200 bg-blue-50 text-blue-600"
                }`}
              >
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Email */}

              <div className="mb-5">

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    📧
                  </span>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Password */}

              <div className="mb-5">

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🔒
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-lg transition hover:bg-gray-100"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Password must contain at least 6 characters.
                </p>

              </div>

              {/* Remember / Forgot */}

              <div className="mb-6 flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-blue-600"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  onClick={() =>
                    alert(
                      "Forgot password feature coming soon!"
                    )
                  }
                >
                  Forgot Password?
                </button>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Logging in...
                  </span>
                ) : (
                  "Login →"
                )}
              </button>

            </form>

            {/* Divider */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-semibold text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            {/* Register */}

            <div className="text-center">

              <p className="text-sm text-gray-500">
                Don't have an account?
              </p>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="mt-2 rounded-xl border-2 border-blue-600 px-6 py-2.5 font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Create Account
              </button>

            </div>

          </div>
        </div>

        {/* Back Home */}

        <button
          onClick={() => navigate("/")}
          className="mx-auto mt-5 block text-sm font-semibold text-gray-500 transition hover:text-blue-600"
        >
          ← Back to ShopEase
        </button>

      </div>
    </div>
  );
};

export default Login;