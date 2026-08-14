import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const AddProducts = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // =========================
  // Handle Input
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  // =========================
  // Submit Product
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Validation
    if (
      !form.title.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      !form.price ||
      !form.stock ||
      !form.image.trim()
    ) {
      setMessageType("error");
      setMessage("Please fill all fields.");
      return;
    }

    if (Number(form.price) <= 0) {
      setMessageType("error");
      setMessage("Price must be greater than 0.");
      return;
    }

    if (Number(form.stock) < 0) {
      setMessageType("error");
      setMessage("Stock cannot be negative.");
      return;
    }

    try {
      setLoading(true);

      const productData = {
        title: form.title.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        image: form.image.trim(),
      };

      const response = await api.post(
        "/products/add-products",
        productData
      );

      console.log("Product Added:", response.data);

      setMessageType("success");
      setMessage(
        response.data?.message ||
          "Product added successfully!"
      );

      // Clear form
      setForm({
        title: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });

      // Redirect after success
      setTimeout(() => {
        navigate("/admin/products");
      }, 1200);

    } catch (error) {
      console.error("Add Product Error:", error);

      setMessageType("error");

      setMessage(
        error.response?.data?.message ||
          "Failed to add product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Reset Form
  // =========================

  const handleReset = () => {
    setForm({
      title: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-red-700 bg-red-600 px-5 py-4 text-white shadow-lg md:px-10 lg:px-20">

        {/* Logo */}

        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow">
            🛍️
          </span>

          <span className="text-xl font-black md:text-2xl">
            ShopEase
          </span>
        </button>

        {/* Navigation */}

        <div className="flex gap-2 md:gap-4">

          <button
            onClick={() => navigate("/admin")}
            className="rounded-xl px-4 py-2 text-sm font-bold transition hover:bg-red-700"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-red-600 shadow transition hover:bg-red-50"
          >
            📦 Products
          </button>

        </div>

      </nav>


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8">

        {/* Page Header */}

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Admin Panel
          </p>

          <h1 className="mt-2 text-4xl font-black text-gray-900">
            Add New Product
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new product to your ShopEase store.
          </p>

        </div>


        {/* =================================================
            FORM CARD
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
        >

          {/* Form Header */}

          <div className="border-b border-gray-100 bg-gradient-to-r from-red-600 to-red-500 px-6 py-6 text-white md:px-10">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
                ➕
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  Product Information
                </h2>

                <p className="mt-1 text-sm text-red-100">
                  Enter the details of your new product.
                </p>
              </div>

            </div>

          </div>


          {/* Form Content */}

          <div className="space-y-7 p-6 md:p-10">

            {/* =================================================
                TITLE + CATEGORY
            ================================================= */}

            <div className="grid gap-6 md:grid-cols-2">

              {/* Title */}

              <div>

                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Product Title *
                </label>

                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. iPhone 17 Pro Max"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                />

              </div>


              {/* Category */}

              <div>

                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Category *
                </label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="Mobiles">
                    Mobiles
                  </option>

                  <option value="Laptops">
                    Laptops
                  </option>

                  <option value="Electronics">
                    Electronics
                  </option>

                  <option value="Shoes">
                    Shoes
                  </option>

                  <option value="Fashion">
                    Fashion
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                  <option value="Gaming">
                    Gaming
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div>

              <label
                htmlFor="description"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Product Description *
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Enter a detailed product description..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
              />

            </div>


            {/* =================================================
                PRICE + STOCK
            ================================================= */}

            <div className="grid gap-6 md:grid-cols-2">

              {/* Price */}

              <div>

                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Price *
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">
                    ₹
                  </span>

                  <input
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    placeholder="49999"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-10 pr-4 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />

                </div>

              </div>


              {/* Stock */}

              <div>

                <label
                  htmlFor="stock"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Stock *
                </label>

                <input
                  id="stock"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  placeholder="50"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                />

              </div>

            </div>


            {/* =================================================
                IMAGE URL
            ================================================= */}

            <div>

              <label
                htmlFor="image"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Product Image URL *
              </label>

              <input
                id="image"
                name="image"
                value={form.image}
                onChange={handleChange}
                type="url"
                placeholder="https://example.com/product-image.jpg"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                Use a publicly accessible image URL.
              </p>

            </div>


            {/* =================================================
                IMAGE PREVIEW
            ================================================= */}

            {form.image && (

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-4">

                <p className="mb-3 text-sm font-bold text-gray-700">
                  Image Preview
                </p>

                <div className="flex justify-center">

                  <img
                    src={form.image}
                    alt="Product Preview"
                    className="h-56 w-full max-w-sm rounded-xl object-cover shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />

                </div>

              </div>

            )}


            {/* =================================================
                MESSAGE
            ================================================= */}

            {message && (

              <div
                className={`rounded-xl px-4 py-3 text-center text-sm font-bold ${
                  messageType === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {messageType === "success"
                  ? "✓ "
                  : "⚠️ "}
                {message}
              </div>

            )}


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:justify-end">

              {/* Cancel */}

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/products")
                }
                className="rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-600 transition hover:bg-gray-100"
              >
                Cancel
              </button>


              {/* Reset */}

              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-red-200 px-6 py-3 font-bold text-red-600 transition hover:bg-red-50"
              >
                Reset
              </button>


              {/* Submit */}

              <button 
                
                type="submit"
                disabled={loading}
                className="rounded-xl bg-red-600 px-7 py-3 font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
              >
                {loading
                  ? "⏳ Adding Product..."
                  : "➕ Add Product"}
              </button>

            </div>

          </div>

        </form>

      </main>

    </div>
  );
};

export default AddProducts;