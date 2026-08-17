import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/axios";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // Fetch Product
  // =========================
  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/products/${id}`);

      const product = response.data.product;

      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
        image: product.image || "",
      });
    } catch (error) {
      console.log("Fetch Product Error:", error);

      setError(error.response?.data?.message || "Unable to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // =========================
  // Handle Input
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Update Product
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await api.put(`/products/update-product/${id}`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      setMessage(response.data.message || "Product updated successfully");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1200);
    } catch (error) {
      console.log("Update Product Error:", error);

      setError(error.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================
  if (error && !formData.title) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5">
        <h2 className="mb-4 text-2xl font-bold text-blue-600">{error}</h2>

        <button
          onClick={() => navigate("/admin/products")}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =========================
          Header
      ========================== */}
      <header className="bg-blue-600 px-6 py-5 text-white shadow-lg md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold md:text-3xl">
              ✏️ Edit Product
            </h1>

            <p className="mt-1 text-sm text-blue-100">
              Update your product information
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-xl bg-white px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
          >
            ← Products
          </button>
        </div>
      </header>

      {/* =========================
          Form
      ========================== */}
      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
          {/* Image Preview */}
          <div className="flex min-h-[500px] items-center justify-center bg-gray-100 p-8">
            {formData.image ? (
              <img
                src={formData.image}
                alt={formData.title}
                className="max-h-[450px] w-full object-contain"
              />
            ) : (
              <div className="text-center text-gray-400">
                <div className="text-6xl">📦</div>
                <p className="mt-3">Product image preview</p>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-7 md:p-10">
            <h2 className="mb-7 text-2xl font-bold text-gray-900">
              Product Information
            </h2>

            {/* Success */}
            {message && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-medium text-green-700">
                ✓ {message}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-medium text-blue-700">
                {error}
              </div>
            )}

            {/* Title */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
                required
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Price + Stock */}
            <div className="mb-5 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="₹ Price"
                  min="0"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  min="0"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Electronics"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Image URL */}
            <div className="mb-7">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:border-gray-400"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {saving ? "Updating..." : "✓ Update Product"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Edit;
