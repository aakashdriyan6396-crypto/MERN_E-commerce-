import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/axios";

const ProductCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  const [error, setError] = useState("");

  // ================================
  // Fetch Single Product
  // ================================

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/products/${id}`);

      setProduct(response.data.product);
    } catch (error) {
      console.log("Product Details Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // Fetch All Products
  // ================================

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);

      const response = await api.get("/products");

      setProducts(response.data.products || []);
    } catch (error) {
      console.log("Products Error:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  // ================================
  // Load Data
  // ================================

  useEffect(() => {
    fetchProduct();
    fetchProducts();
  }, [id]);

  // ================================
  // Add To Cart
  // ================================

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("Product is out of stock");
      return;
    }

    const oldCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = oldCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      if (existingProduct.quantity >= product.stock) {
        alert("You cannot add more than available stock");
        return;
      }

      updatedCart = oldCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...oldCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product added to cart 🛒");
  };

  // ================================
  // Loading
  // ================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>

          <p className="mt-4 font-semibold text-gray-500">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // ================================
  // Error
  // ================================

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5">

        <div className="mb-5 text-6xl">
          😕
        </div>

        <h2 className="mb-5 text-center text-3xl font-bold text-gray-800">
          {error || "Product not found"}
        </h2>

        <button
          onClick={() => navigate("/")}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Go Back Home
        </button>

      </div>
    );
  }

  // ================================
  // Related Products
  // ================================

  const relatedProducts = products
    .filter((item) => item._id !== product._id)
    .filter((item) => {
      if (!product.category) return true;

      return item.category === product.category;
    })
    .slice(0, 8);

  // If category doesn't have enough products
  // then show other products
  const finalProducts =
    relatedProducts.length >= 4
      ? relatedProducts
      : products
          .filter((item) => item._id !== product._id)
          .slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ==================================
          NAVBAR
      ================================== */}

      <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-red-600 px-5 py-4 text-white shadow-lg md:px-10 lg:px-20">

        {/* Logo */}

        <h2
          onClick={() => navigate("/")}
          className="cursor-pointer text-xl font-black md:text-2xl"
        >
          🛍️ ShopEase
        </h2>

        {/* Navigation */}

        <div className="flex gap-2 md:gap-4">

          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            🏠
            <span className="ml-1 hidden sm:inline">
              Home
            </span>
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            🛒
            <span className="ml-1 hidden sm:inline">
              Cart
            </span>
          </button>

          <button
            onClick={() => navigate("/login")}
            className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            👨‍💻
            <span className="ml-1 hidden sm:inline">
              Login
            </span>
          </button>

        </div>
      </nav>


      {/* ==================================
          MAIN PRODUCT
      ================================== */}

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">

        {/* Back */}

        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 font-semibold text-gray-600 transition hover:text-red-600"
        >
          ← Back to Products
        </button>


        {/* Product Container */}

        <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

          {/* ==============================
              IMAGE
          ============================== */}

          <div className="flex min-h-[400px] items-center justify-center bg-gray-100 p-8 md:min-h-[600px]">

            <img
              src={product.image}
              alt={product.title}
              className="max-h-[550px] w-full object-contain transition duration-500 hover:scale-105"
            />

          </div>


          {/* ==============================
              PRODUCT INFO
          ============================== */}

          <div className="flex flex-col justify-center p-7 md:p-12">

            {/* Category */}

            {product.category && (
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-red-600">
                {product.category}
              </p>
            )}


            {/* Stock */}

            <div className="mb-5">

              <span
                className={`inline-block rounded-full px-4 py-2 text-sm font-bold ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 0
                  ? `✓ ${product.stock} Available`
                  : "✕ Out of Stock"}
              </span>

            </div>


            {/* Title */}

            <h1 className="mb-5 text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              {product.title}
            </h1>


            {/* Description */}

            <p className="mb-8 text-base leading-7 text-gray-600 md:text-lg">
              {product.description}
            </p>


            {/* Price */}

            <div className="mb-8">

              <p className="mb-1 text-sm font-medium uppercase tracking-wide text-gray-400">
                Price
              </p>

              <p className="text-4xl font-extrabold text-red-600">
                ₹{product.price}
              </p>

            </div>


            {/* Stock */}

            <div className="mb-8 rounded-2xl bg-gray-50 p-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Available Stock
                </span>

                <span className="font-bold text-gray-900">
                  {product.stock} units
                </span>

              </div>

            </div>


            {/* Add Cart */}

            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className="w-full rounded-2xl bg-red-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {product.stock > 0
                ? "🛒 Add to Cart"
                : "Out of Stock"}
            </button>


            {/* Continue Shopping */}

            <button
              onClick={() => navigate("/")}
              className="mt-4 w-full rounded-2xl border-2 border-gray-200 px-6 py-4 font-semibold text-gray-700 transition hover:border-red-600 hover:text-red-600"
            >
              Continue Shopping
            </button>

          </div>

        </div>


        {/* ==================================
            AMAZON STYLE RECOMMENDATIONS
        ================================== */}

        <section className="mt-16">

          {/* Heading */}

          <div className="mb-6 flex items-end justify-between">

            <div>

              <p className="mb-1 text-sm font-bold uppercase tracking-widest text-red-600">
                Recommended For You
              </p>

              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">
                Customers also viewed
              </h2>

            </div>

            <button
              onClick={() => navigate("/")}
              className="hidden font-semibold text-red-600 hover:underline sm:block"
            >
              See all →
            </button>

          </div>


          {/* Products */}

          {productsLoading ? (
            <div className="flex justify-center py-10">

              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"></div>

            </div>
          ) : finalProducts.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
              <p className="text-gray-500">
                No other products available.
              </p>
            </div>
          ) : (

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

              {finalProducts.map((item) => (

                <div
                  key={item._id}
                  onClick={() =>
                    navigate(`/products/${item._id}`)
                  }
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}

                  <div className="relative h-56 overflow-hidden bg-gray-100">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Stock */}

                    <span
                      className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
                        item.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.stock > 0
                        ? `${item.stock} left`
                        : "Out of stock"}
                    </span>

                  </div>


                  {/* Details */}

                  <div className="p-5">

                    {/* Category */}

                    {item.category && (
                      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-red-500">
                        {item.category}
                      </p>
                    )}


                    {/* Title */}

                    <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>


                    {/* Description */}

                    <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-gray-500">
                      {item.description}
                    </p>


                    {/* Price */}

                    <div className="mt-4 flex items-center justify-between">

                      <span className="text-xl font-black text-gray-900">
                        ₹{item.price}
                      </span>

                      <span className="text-sm text-gray-400">
                        ⭐ 4.5
                      </span>

                    </div>


                    {/* Cart */}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      disabled={item.stock <= 0}
                      className="mt-4 w-full rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {item.stock > 0
                        ? "🛒 Add to Cart"
                        : "Out of Stock"}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* ==================================
            BOTTOM INFORMATION
        ================================== */}

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <div className="mb-3 text-3xl">🚚</div>
            <h3 className="font-bold text-gray-900">
              Fast Delivery
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Quick and reliable delivery.
            </p>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <div className="mb-3 text-3xl">🔒</div>
            <h3 className="font-bold text-gray-900">
              Secure Shopping
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your shopping experience is secure.
            </p>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
            <div className="mb-3 text-3xl">↩️</div>
            <h3 className="font-bold text-gray-900">
              Easy Returns
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Simple and convenient returns.
            </p>
          </div>

        </div>

      </main>


      {/* ==================================
          FOOTER
      ================================== */}

      <footer className="mt-16 bg-gray-900 px-5 py-8 text-center text-white">

        <h3 className="text-xl font-black">
          🛍️ ShopEase
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          Shop everything you love.
        </p>

        <p className="mt-5 text-xs text-gray-500">
          © 2026 ShopEase. All rights reserved.
        </p>

      </footer>

    </div>
  );
};

export default ProductCard;