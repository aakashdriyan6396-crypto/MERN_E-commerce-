import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  // =========================
  // States
  // =========================

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // =========================
  // Fetch Products
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products");

      setProducts(response.data.products || []);
    } catch (error) {
      console.log("Products fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // Save Cart
  // =========================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // Add To Cart
  // =========================

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("Product is out of stock");
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        if (existingProduct.quantity >= product.stock) {
          alert("Maximum available stock reached");
          return prevCart;
        }

        return prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                stock: product.stock,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // =========================
  // Increase Quantity
  // =========================

  const increaseQuantity = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id !== product._id) {
          return item;
        }

        if (item.quantity >= product.stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  // =========================
  // Decrease Quantity
  // =========================

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === productId) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================
  // Remove From Cart
  // =========================

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== productId)
    );
  };

  // =========================
  // Cart Quantity
  // =========================

  const getCartQuantity = (productId) => {
    const item = cart.find(
      (item) => item._id === productId
    );

    return item ? item.quantity : 0;
  };

  // =========================
  // Cart Count
  // =========================

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // =========================
  // Cart Total
  // =========================

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

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
  // Search + Category Filter
  // =========================

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return products.filter((product) => {
      const title = String(
        product.title || ""
      ).toLowerCase();

      const description = String(
        product.description || ""
      ).toLowerCase();

      const productCategory = String(
        product.category || ""
      );

      const matchesSearch =
        title.includes(searchText) ||
        description.includes(searchText);

      const matchesCategory =
        category === "All" ||
        productCategory === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  // =========================
  // Product Details
  // =========================

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  // =========================
  // Scroll To Products
  // =========================

  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="sticky top-0 z-50 border-b border-red-700 bg-red-600 text-white shadow-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">

          {/* Logo */}

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-md">
              🛍️
            </span>

            <span className="text-xl font-black tracking-tight md:text-2xl">
              ShopEase
            </span>
          </button>

          {/* Desktop Navigation */}

          <div className="flex items-center gap-2 md:gap-4">

            <button
              onClick={() => navigate("/")}
              className="hidden rounded-xl px-4 py-2 text-sm font-bold transition hover:bg-red-700 md:block"
            >
              Home
            </button>

            <button
              onClick={scrollToProducts}
              className="hidden rounded-xl px-4 py-2 text-sm font-bold transition hover:bg-red-700 md:block"
            >
              Products
            </button>

            {/* Cart */}

            <button
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-md transition hover:bg-red-50 active:scale-95"
            >
              🛒
              <span className="hidden sm:inline">
                Cart
              </span>

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login */}

            <button
              onClick={() => navigate("/login")}
              className="rounded-xl border border-white/30 px-4 py-2 text-sm font-bold transition hover:bg-white hover:text-red-600 active:scale-95"
            >
              👨‍💻
              <span className="ml-1 hidden sm:inline">
                Login
              </span>
            </button>

          </div>
        </div>
      </nav>


      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative overflow-hidden bg-gray-950 text-white">

        {/* Background Glow */}

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-red-500/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.15),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:px-8">

          {/* LEFT */}

          <div>

            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 backdrop-blur">

              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

              New Products Available

            </div>

            {/* Heading */}

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">

              Everything You Need.

              <span className="block text-red-500">
                All in One Place.
              </span>

            </h1>

            {/* Description */}

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 md:text-lg">

              Discover premium electronics, mobiles,
              fashion, shoes and more. Shop your
              favorite products at amazing prices
              with ShopEase.

            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <button
                onClick={scrollToProducts}
                className="group rounded-xl bg-red-600 px-7 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30 active:scale-95"
              >
                Shop Now

                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="rounded-xl border border-gray-700 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-500/10 active:scale-95"
              >
                🛒 View Cart
              </button>

            </div>

            {/* Stats */}

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-gray-800 pt-7">

              <div>
                <p className="text-2xl font-extrabold">
                  {products.length}+
                </p>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Products
                </p>
              </div>

              <div>
                <p className="text-2xl font-extrabold">
                  24/7
                </p>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Support
                </p>
              </div>

              <div>
                <p className="text-2xl font-extrabold">
                  100%
                </p>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Secure
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT HERO VISUAL */}

          <div className="relative hidden lg:block">

            <div className="relative mx-auto h-[500px] w-[430px]">

              {/* Glow */}

              <div className="absolute inset-10 rounded-full bg-red-600/30 blur-3xl" />

              {/* Main Card */}

              <div className="absolute inset-0 rotate-3 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-2xl backdrop-blur-xl">

                <div className="flex h-full flex-col justify-between rounded-[2rem] bg-gray-900 p-7">

                  {/* Top */}

                  <div className="flex items-center justify-between">

                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
                      SHOPEASE
                    </span>

                    <span className="text-2xl">
                      🛍️
                    </span>

                  </div>

                  {/* Product Visual */}

                  <div className="flex flex-1 items-center justify-center">

                    <div className="relative">

                      <div className="absolute inset-0 rounded-full bg-red-600/40 blur-3xl" />

                      <div className="relative flex h-60 w-60 rotate-[-8deg] items-center justify-center rounded-[3rem] border border-red-400/20 bg-gradient-to-br from-red-500 to-red-900 text-8xl shadow-2xl transition duration-500 hover:rotate-0">
                        🛍️
                      </div>

                    </div>

                  </div>

                  {/* Bottom */}

                  <div>

                    <p className="text-sm text-gray-400">
                      Discover something
                    </p>

                    <h3 className="mt-1 text-3xl font-black">
                      You'll Love.
                    </h3>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-sm text-gray-500">
                        Premium Shopping
                      </span>

                      <button
                        onClick={scrollToProducts}
                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold transition hover:bg-red-700"
                      >
                        Explore →
                      </button>

                    </div>

                  </div>

                </div>

              </div>


              {/* Floating Card */}

              <div className="absolute -left-16 top-24 flex items-center gap-3 rounded-2xl border border-white/10 bg-gray-900/90 px-4 py-3 shadow-2xl backdrop-blur-xl">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                  ⚡
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Fast Shopping
                  </p>

                  <p className="text-sm font-bold">
                    Easy & Quick
                  </p>
                </div>

              </div>


              {/* Rating Card */}

              <div className="absolute -bottom-5 -right-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-gray-900/90 px-4 py-3 shadow-2xl backdrop-blur-xl">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                  ⭐
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Customer Rating
                  </p>

                  <p className="text-sm font-bold">
                    4.9 / 5.0
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom Line */}

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      </section>


      {/* =====================================================
          QUICK CATEGORY SECTION
      ====================================================== */}

      <section className="border-b border-gray-100 bg-white">

        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-5 py-5 md:px-8">

          {categories.map((item) => (

            <button
              key={item}
              onClick={() => {
                setCategory(item);
                scrollToProducts();
              }}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                category === item
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {item === "All"
                ? "✨ All Products"
                : `🛍️ ${item}`}
            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          PRODUCTS SECTION
      ====================================================== */}

      <section
        id="products"
        className="mx-auto max-w-7xl px-5 py-16 md:px-8"
      >

        {/* Heading */}

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-red-600">
              Shop Collection
            </p>

            <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
              Our Products
            </h2>

            <p className="mt-2 text-gray-500">
              Find the perfect product for you.
            </p>

          </div>

          <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
            {filteredProducts.length} Products Found
          </div>

        </div>


        {/* =====================================================
            SEARCH + FILTER
        ====================================================== */}

        <div className="mb-10 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">

          <div className="grid gap-5 md:grid-cols-3">

            {/* Search */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-bold text-gray-700">
                Search Products
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                )}

              </div>

            </div>


            {/* Category */}

            <div>

              <label className="mb-2 block text-sm font-bold text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </div>


        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm"
              >

                <div className="h-64 bg-gray-200" />

                <div className="space-y-4 p-5">

                  <div className="h-4 w-1/3 rounded bg-gray-200" />

                  <div className="h-6 rounded bg-gray-200" />

                  <div className="h-10 rounded bg-gray-200" />

                  <div className="h-12 rounded bg-gray-200" />

                </div>

              </div>

            ))}

          </div>

        )}


        {/* =====================================================
            EMPTY PRODUCTS
        ====================================================== */}

        {!loading &&
          filteredProducts.length === 0 && (

            <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">

              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl">
                📦
              </div>

              <h2 className="text-2xl font-black text-gray-900">
                No Products Found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                We couldn't find any products matching
                your search. Try another keyword or
                category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
              >
                Reset Filters
              </button>

            </div>
          )}


        {/* =====================================================
            PRODUCT GRID
        ====================================================== */}

        {!loading &&
          filteredProducts.length > 0 && (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product) => {

                const quantity = getCartQuantity(
                  product._id
                );

                return (

                  <div
                    key={product._id}
                    onClick={() =>
                      handleClick(product._id)
                    }
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-100 hover:shadow-2xl"
                  >

                    {/* Product Image */}

                    <div className="relative h-64 overflow-hidden bg-gray-100">

                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />

                      {/* Image Overlay */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />

                      {/* Stock */}

                      <span
                        className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>

                    </div>


                    {/* Product Details */}

                    <div className="flex flex-1 flex-col p-5">

                      {/* Category */}

                      {product.category && (

                        <span className="mb-3 inline-block w-fit rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                          {product.category}
                        </span>

                      )}

                      {/* Title */}

                      <h2 className="mb-2 line-clamp-1 text-xl font-black text-gray-900">
                        {product.title}
                      </h2>

                      {/* Description */}

                      <p className="mb-4 line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-500">
                        {product.description}
                      </p>

                      {/* Price */}

                      <div className="mb-5 flex items-center justify-between">

                        <div>
                          <p className="text-xs font-medium text-gray-400">
                            Price
                          </p>

                          <span className="text-2xl font-black text-red-600">
                            ₹
                            {Number(
                              product.price
                            ).toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="text-right">

                          <p className="text-xs text-gray-400">
                            Available
                          </p>

                          <p className="text-sm font-bold text-gray-700">
                            {product.stock}
                          </p>

                        </div>

                      </div>


                      {/* Cart Controls */}

                      <div
                        className="mt-auto"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >

                        {/* Add To Cart */}

                        {quantity === 0 ? (

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            disabled={
                              product.stock <= 0
                            }
                            className="w-full rounded-xl bg-red-600 px-4 py-3.5 font-bold text-white shadow-sm transition hover:bg-red-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
                          >
                            {product.stock > 0
                              ? "🛒 Add to Cart"
                              : "Out of Stock"}
                          </button>

                        ) : (

                          <div className="space-y-2">

                            {/* Quantity */}

                            <div className="flex items-center gap-2">

                              <button
                                onClick={() =>
                                  decreaseQuantity(
                                    product._id
                                  )
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl font-black transition hover:bg-gray-200 active:scale-95"
                              >
                                −
                              </button>

                              <div className="flex h-11 flex-1 items-center justify-center rounded-xl bg-red-50 font-black text-red-600">
                                {quantity}
                              </div>

                              <button
                                onClick={() =>
                                  increaseQuantity(
                                    product
                                  )
                                }
                                disabled={
                                  quantity >=
                                  product.stock
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-xl font-black text-white transition hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
                              >
                                +
                              </button>

                            </div>

                            {/* Remove */}

                            <button
                              onClick={() =>
                                removeFromCart(
                                  product._id
                                )
                              }
                              className="w-full rounded-xl border border-red-100 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                            >
                              🗑️ Remove
                            </button>

                          </div>

                        )}

                      </div>

                    </div>

                  </div>

                );
              })}

            </div>

          )}

      </section>


      {/* =====================================================
          WHY SHOP EASE
      ====================================================== */}

      <section className="border-t border-gray-100 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">

          <div className="mb-10 text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Why ShopEase?
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-900">
              Shopping Made Simple
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* Feature 1 */}

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-7 text-center transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl">
                🚚
              </div>

              <h3 className="mt-5 text-xl font-black text-gray-900">
                Fast Delivery
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Get your favorite products delivered
                quickly and safely.
              </p>

            </div>


            {/* Feature 2 */}

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-7 text-center transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl">
                🔒
              </div>

              <h3 className="mt-5 text-xl font-black text-gray-900">
                Secure Shopping
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your shopping experience is designed
                with security in mind.
              </p>

            </div>


            {/* Feature 3 */}

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-7 text-center transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl">
                ⭐
              </div>

              <h3 className="mt-5 text-xl font-black text-gray-900">
                Quality Products
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Discover products selected for quality
                and great value.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-gray-950 text-white">

        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">

          <div className="grid gap-10 md:grid-cols-4">

            {/* Brand */}

            <div className="md:col-span-2">

              <div className="flex items-center gap-2">

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
                  🛍️
                </span>

                <span className="text-2xl font-black">
                  ShopEase
                </span>

              </div>

              <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
                Your modern destination for electronics,
                mobiles, fashion, shoes and more.
                Discover products you'll love.
              </p>

            </div>


            {/* Quick Links */}

            <div>

              <h3 className="mb-4 font-bold">
                Quick Links
              </h3>

              <div className="space-y-3 text-sm text-gray-500">

                <button
                  onClick={() => navigate("/")}
                  className="block transition hover:text-red-500"
                >
                  Home
                </button>

                <button
                  onClick={scrollToProducts}
                  className="block transition hover:text-red-500"
                >
                  Products
                </button>

                <button
                  onClick={() => navigate("/cart")}
                  className="block transition hover:text-red-500"
                >
                  Cart
                </button>

              </div>

            </div>


            {/* Account */}

            <div>

              <h3 className="mb-4 font-bold">
                Account
              </h3>

              <div className="space-y-3 text-sm text-gray-500">

                <button
                  onClick={() => navigate("/login")}
                  className="block transition hover:text-red-500"
                >
                  Login
                </button>

                <button
                  onClick={() =>
                    navigate("/register")
                  }
                  className="block transition hover:text-red-500"
                >
                  Register
                </button>

              </div>

            </div>

          </div>


          {/* Copyright */}

          <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-600">

            © {new Date().getFullYear()} ShopEase.
            All rights reserved.

          </div>

        </div>

      </footer>


      {/* =====================================================
          FLOATING CART
      ====================================================== */}

      {cartCount > 0 && (

        <div className="fixed bottom-5 left-1/2 z-40 w-[92%] max-w-md -translate-x-1/2">

          <button
            onClick={() => navigate("/cart")}
            className="flex w-full items-center justify-between rounded-2xl bg-red-600 px-5 py-4 text-white shadow-2xl shadow-red-900/30 transition hover:bg-red-700 active:scale-95"
          >

            <div className="flex items-center gap-3">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">
                🛒
              </span>

              <div className="text-left">

                <p className="font-black">
                  {cartCount}{" "}
                  {cartCount === 1
                    ? "Item"
                    : "Items"}
                </p>

                <p className="text-xs text-red-100">
                  View your cart
                </p>

              </div>

            </div>

            <span className="text-lg font-black">
              ₹
              {cartTotal.toLocaleString(
                "en-IN"
              )}
            </span>

          </button>

        </div>

      )}

    </div>
  );
};

export default Home;