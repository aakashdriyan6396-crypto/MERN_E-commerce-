import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [message, setMessage] = useState("");

  // =========================
  // Fetch Products
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products");

      setProducts(response.data.products || []);
    } catch (error) {
      console.log("Products Fetch Error:", error);

      setMessage(
        error.response?.data?.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // Delete Product
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(id);

      await api.delete(`/products/delete-product/${id}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );

      setMessage("Product deleted successfully");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log("Delete Product Error:", error);

      setMessage(
        error.response?.data?.message || "Failed to delete product"
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =========================
  // Categories
  // =========================
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // =========================
  // Search + Filter
  // =========================
  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return products.filter((product) => {
      const title = String(product.title || "").toLowerCase();
      const description = String(
        product.description || ""
      ).toLowerCase();

      const matchesSearch =
        title.includes(searchText) ||
        description.includes(searchText);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =========================
          Header
      ========================== */}
      <header className="sticky top-0 z-20 bg-blue-600 px-6 py-5 text-white shadow-lg md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold md:text-3xl">
              🛍️ Product Management
            </h1>

            <p className="mt-1 text-sm text-blue-100">
              Manage all your ShopEase products
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="rounded-xl bg-white px-4 py-2.5 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              ← Dashboard
            </button>

            <button
              onClick={() => navigate("/admin/add-product")}
              className="rounded-xl bg-black px-4 py-2.5 font-semibold text-white transition hover:bg-gray-800"
            >
              + Add Product
            </button>
          </div>
        </div>
      </header>

      {/* =========================
          Main
      ========================== */}
      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        {/* Message */}
        {message && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 font-medium text-blue-700">
            {message}
          </div>
        )}

        {/* =========================
            Statistics
        ========================== */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Products
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {products.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              In Stock
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {
                products.filter(
                  (product) => Number(product.stock) > 0
                ).length
              }
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Out of Stock
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {
                products.filter(
                  (product) => Number(product.stock) <= 0
                ).length
              }
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Categories
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {categories.length - 1}
            </h2>
          </div>
        </div>

        {/* =========================
            Search + Filter
        ========================== */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Search Products
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title or description..."
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* =========================
            Loading
        ========================== */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          </div>
        )}

        {/* =========================
            Empty
        ========================== */}
        {!loading && filteredProducts.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-5xl">📦</div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or category filter.
            </p>

            <button
              onClick={() => navigate("/admin/add-product")}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              + Add Product
            </button>
          </div>
        )}

        {/* =========================
            Product Grid
        ========================== */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Stock Badge */}
                  <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h2 className="line-clamp-1 text-lg font-bold text-gray-900">
                      {product.title}
                    </h2>
                  </div>

                  {/* Category */}
                  {product.category && (
                    <span className="mb-3 inline-block rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                      {product.category}
                    </span>
                  )}

                  <p className="mb-4 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-blue-600">
                      ₹{product.price}
                    </span>

                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/products/update/${product._id}`
                        )
                      }
                      className="rounded-xl bg-yellow-500 px-3 py-2.5 font-semibold text-white transition hover:bg-yellow-600"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      disabled={deleteLoading === product._id}
                      className="rounded-xl bg-blue-600 px-3 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {deleteLoading === product._id
                        ? "Deleting..."
                        : "🗑️ Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductList;