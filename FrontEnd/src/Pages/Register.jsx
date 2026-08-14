import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // Handle Input Changes
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
  // Handle Register
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMsg("");

    // Validation
    if (!form.username || !form.email || !form.password) {
      setMsg("All fields are required");
      return;
    }

    if (form.username.length < 3) {
      setMsg("Username must be at least 3 characters");
      return;
    }

    if (form.password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/user/register",
        form
      );

      setMsg(
        response.data.message ||
          "Registration successful!"
      );

      // Clear form
      setForm({
        username: "",
        email: "",
        password: "",
      });

      // Navigate to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration Error:", error);

      setMsg(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-5 py-10">

      {/* =========================
          Background Decoration
      ========================== */}

      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-red-200 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-red-300 blur-3xl" />

      {/* =========================
          Register Card
      ========================== */}

      <div className="relative w-full max-w-md">

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">

          {/* =========================
              Header
          ========================== */}

          <div className="bg-red-600 px-8 py-8 text-center text-white">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
              🛍️
            </div>

            <h1 className="text-3xl font-extrabold">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-red-100">
              Join ShopEase and start shopping
            </p>

          </div>

          {/* =========================
              Form
          ========================== */}

          <div className="p-7 md:p-8">

            {/* Message */}

            {msg && (
              <div
                className={`mb-5 rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                  msg
                    .toLowerCase()
                    .includes("success")
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* =========================
                  Username
              ========================== */}

              <div className="mb-5">

                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Username
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    👤
                  </span>

                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    autoComplete="username"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />

                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Username must be at least 3 characters.
                </p>

              </div>

              {/* =========================
                  Email
              ========================== */}

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
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />

                </div>

              </div>

              {/* =========================
                  Password
              ========================== */}

              <div className="mb-6">

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
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-800 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />

                  {/* Show / Hide */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-lg transition hover:bg-gray-100"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Password must be at least 6 characters.
                </p>

              </div>

              {/* =========================
                  Terms
              ========================== */}

              <div className="mb-6 flex items-start gap-2">

                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-red-600"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-gray-500"
                >
                  I agree to the{" "}
                  <span className="font-semibold text-red-600">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-red-600">
                    Privacy Policy
                  </span>
                  .
                </label>

              </div>

              {/* =========================
                  Register Button
              ========================== */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-3.5 font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">

                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                    Creating Account...

                  </span>
                ) : (
                  "Create Account →"
                )}
              </button>

            </form>

            {/* =========================
                Divider
            ========================== */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-semibold text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            {/* =========================
                Login
            ========================== */}

            <div className="text-center">

              <p className="text-sm text-gray-500">
                Already have an account?
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-2 rounded-xl border-2 border-red-600 px-6 py-2.5 font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                Login
              </button>

            </div>

          </div>
        </div>

        {/* =========================
            Back Home
        ========================== */}

        <button
          onClick={() => navigate("/")}
          className="mx-auto mt-5 block text-sm font-semibold text-gray-500 transition hover:text-red-600"
        >
          ← Back to ShopEase
        </button>

      </div>
    </div>
  );
};

export default Register;