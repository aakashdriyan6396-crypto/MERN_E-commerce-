
import React, { useEffect, useMemo, useState } from "react";
import {
  Menu,
  X,
  Search,
  MapPin,
  ShoppingCart,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock3,
  Zap,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Package,
  ShieldCheck,
  RotateCcw,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router";
import api from "../api/axios";

/* =========================================================
   HELPERS
========================================================= */

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);
};

/* =========================================================
   HEADER
========================================================= */

const Header = ({
  menuOpen,
  setMenuOpen,
  query,
  setQuery,
  cartCount,
  isLoggedIn,
  handleLogout,
  loading,
  navigate,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const suggestions = [
    "iPhone",
    "Samsung",
    "Laptop",
    "Headphones",
    "Shoes",
    "Watch",
    "TV",
    "Camera",
    "Gaming",
  ];

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-[70] bg-slate-950 text-white shadow-xl">
        {/* Main Header */}
        <div className="mx-auto max-w-[1500px] px-3">
          <div className="flex min-h-[70px] items-center gap-2 sm:gap-3">

            {/* Menu */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-white/10"
            >
              <Menu size={23} />

              <span className="hidden font-bold md:block">
                All
              </span>
            </button>

            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="hidden shrink-0 text-2xl font-black sm:block"
            >
              Shop<span className="text-orange-500">X</span>
            </button>

            {/* Location */}
            <button className="hidden items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-white/10 lg:flex">
              <MapPin size={19} />

              <div className="text-left">
                <p className="text-[10px] text-slate-400">
                  Deliver to
                </p>

                <p className="text-sm font-bold">
                  India
                </p>
              </div>
            </button>

            {/* Search */}
            <div className="relative flex-1">
              <div
                className={`flex h-12 overflow-hidden rounded-xl bg-white ${
                  searchFocused
                    ? "ring-2 ring-orange-500"
                    : ""
                }`}
              >
                <input
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  onFocus={() =>
                    setSearchFocused(true)
                  }
                  placeholder="Search products, brands and categories..."
                  className="min-w-0 flex-1 px-4 text-sm text-slate-900 outline-none"
                />

                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="px-3 text-slate-400 transition hover:text-slate-700"
                  >
                    <X size={17} />
                  </button>
                )}

                <button className="w-12 bg-orange-500 text-white transition hover:bg-orange-600 sm:w-14">
                  <Search
                    className="mx-auto"
                    size={21}
                  />
                </button>
              </div>

              {/* Search Suggestions */}
              {searchFocused && query && (
                <>
                  <div
                    onClick={() =>
                      setSearchFocused(false)
                    }
                    className="fixed inset-0 z-[-1]"
                  />

                  <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map(
                        (item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setQuery(item);
                              setSearchFocused(
                                false
                              );
                            }}
                            className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition hover:bg-slate-50"
                          >
                            <Search
                              size={15}
                              className="text-slate-400"
                            />

                            {item}
                          </button>
                        )
                      )
                    ) : (
                      <p className="p-5 text-sm text-slate-500">
                        No suggestions found.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Language */}
            <button className="hidden items-center gap-1 px-2 font-bold md:flex">
              EN
              <ChevronDown size={13} />
            </button>

            {/* Account */}
            <button
              onClick={() =>
                navigate(
                  isLoggedIn ? "/profile" : "/login"
                )
              }
              className="hidden items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-white/10 sm:flex"
            >
              <User size={21} />

              <div className="text-left">
                <p className="text-[10px] text-slate-400">
                  {isLoggedIn
                    ? "Hello, User"
                    : "Hello, Sign in"}
                </p>

                <p className="text-sm font-bold">
                  Account
                </p>
              </div>

              <ChevronDown size={14} />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative rounded-xl p-2 transition hover:bg-white/10"
            >
              <ShoppingCart size={26} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="hidden border-t border-white/10 bg-slate-900 md:block">
          <div className="mx-auto flex max-w-[1500px] items-center gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold">

            <button
              onClick={() => setMenuOpen(true)}
              className="flex shrink-0 items-center gap-2 transition hover:text-orange-400"
            >
              <Menu size={17} />
              All Categories
            </button>

            <button
              onClick={() =>
                setQuery("deal")
              }
              className="shrink-0 transition hover:text-orange-400"
            >
              Today's Deals
            </button>

            <button
              onClick={() =>
                setQuery("")
              }
              className="shrink-0 transition hover:text-orange-400"
            >
              New Arrivals
            </button>

            <button className="shrink-0 transition hover:text-orange-400">
              Best Sellers
            </button>

            <button
              onClick={() =>
                setQuery("electronics")
              }
              className="shrink-0 transition hover:text-orange-400"
            >
              Electronics
            </button>

            <button
              onClick={() =>
                setQuery("fashion")
              }
              className="shrink-0 transition hover:text-orange-400"
            >
              Fashion
            </button>

            <button className="shrink-0 transition hover:text-orange-400">
              Customer Service
            </button>

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                disabled={loading}
                className="ml-auto flex shrink-0 items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-xs font-bold transition hover:bg-red-600 disabled:opacity-50"
              >
                <LogOut size={15} />

                {loading
                  ? "Logging out..."
                  : "Logout"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="ml-auto shrink-0 rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold transition hover:bg-orange-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

/* =========================================================
   SIDE MENU
========================================================= */

const SideMenu = ({
  open,
  setOpen,
  products,
  setQuery,
}) => {
  const departments = [
    "Electronics",
    "Mobiles",
    "Laptops",
    "Fashion",
    "TV",
    "Cameras",
    "Wearables",
    "Gaming",
    "Home & Kitchen",
    "Beauty",
    "Sports",
  ];

  const getRealCategory = (department) => {
    const found = products.find(
      (product) =>
        String(product.category || "")
          .toLowerCase()
          .includes(department.toLowerCase())
    );

    return found?.category || department;
  };

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-[100] h-full w-[340px] max-w-[90vw] bg-white shadow-2xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-950 px-6 py-5 text-white">
          <div onClick={()=>navigate('/admin')}>
            <p  className="text-xs text-slate-400">
              SHOP<span className="text-orange-500">
                X
              </span>
            </p>

            <h2 className="text-lg font-black">
              All Departments
            </h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 transition hover:bg-white/10"
          >
            <X />
          </button>
        </div>

        {/* Departments */}
        <div className="p-4">
          {departments.map((department) => (
            <button
              key={department}
              onClick={() => {
                setQuery(
                  getRealCategory(department)
                );
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {department}

              <ChevronRight
                size={17}
                className="text-slate-400"
              />
            </button>
          ))}
        </div>

        {/* Help */}
        <div className="mx-4 mt-2 rounded-2xl bg-slate-100 p-5">
          <p className="text-xs font-bold uppercase text-orange-500">
            Need help?
          </p>

          <h3 className="mt-1 font-black text-slate-900">
            Explore all our services
          </h3>

          <button className="mt-3 text-sm font-bold text-orange-500">
            Customer Service →
          </button>
        </div>
      </aside>
    </>
  );
};

/* =========================================================
   HERO
========================================================= */

const HeroCarousel = ({ products, setQuery }) => {
  const [current, setCurrent] = useState(0);

  const heroSlides = [
    {
      title: "The Future Is Here",
      subtitle:
        "Discover the latest technology at unbeatable prices.",
      button: "Shop Electronics",
      search: "electronics",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1800",
    },
    {
      title: "Upgrade Your Lifestyle",
      subtitle:
        "Premium products. Better prices. Faster delivery.",
      button: "Explore Deals",
      search: "",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1800",
    },
    {
      title: "Style Meets Performance",
      subtitle:
        "Fresh fashion collections for every occasion.",
      button: "Shop Fashion",
      search: "fashion",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (prev) =>
          (prev + 1) % heroSlides.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="relative h-[420px] sm:h-[500px] lg:h-[570px]">
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[1500px] items-center px-6 lg:px-10">
          <div className="max-w-xl text-white">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
              <Zap
                size={14}
                className="text-orange-400"
              />

              LIMITED TIME OFFER
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
              {slide.title}
            </h1>

            <p className="mt-5 max-w-lg text-base text-slate-200 sm:text-lg">
              {slide.subtitle}
            </p>

            <button
              onClick={() =>
                setQuery(slide.search)
              }
              className="mt-7 flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-orange-500/30"
            >
              {slide.button}

              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Previous */}
        <button
          onClick={() =>
            setCurrent(
              (current - 1 + heroSlides.length) %
                heroSlides.length
            )
          }
          className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 sm:block"
        >
          <ChevronLeft />
        </button>

        {/* Next */}
        <button
          onClick={() =>
            setCurrent(
              (current + 1) % heroSlides.length
            )
          }
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 sm:block"
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   GREETING
========================================================= */

const Greeting = ({
  cartCount,
  isLoggedIn,
}) => {
  return (
    <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1450px] rounded-3xl border border-white/20 bg-white/90 p-5 shadow-2xl backdrop-blur-xl md:p-7">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-medium text-slate-500">
              {isLoggedIn
                ? "Welcome back 👋"
                : "Welcome to ShopX 👋"}
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-950">
              {isLoggedIn
                ? "Good evening, Shopper"
                : "Start Shopping Today"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Discover amazing products at great prices.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">

            <div className="rounded-xl bg-slate-50 px-4 py-3 text-center">
              <Package
                className="mx-auto mb-1 text-orange-500"
                size={19}
              />

              <p className="text-xs text-slate-400">
                Products
              </p>

              <p className="font-black text-slate-900">
                Shop
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-3 text-center">
              <Heart
                className="mx-auto mb-1 text-red-500"
                size={19}
              />

              <p className="text-xs text-slate-400">
                Wishlist
              </p>

              <p className="font-black text-slate-900">
                Save
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-3 text-center">
              <ShoppingCart
                className="mx-auto mb-1 text-blue-500"
                size={19}
              />

              <p className="text-xs text-slate-400">
                Cart
              </p>

              <p className="font-black text-slate-900">
                {cartCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   CATEGORY SECTION
========================================================= */

const CategorySection = ({
  products,
  setQuery,
}) => {
  const categoryData = useMemo(() => {
    const unique = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return unique.slice(0, 8).map((name) => {
      const product = products.find(
        (item) => item.category === name
      );

      return {
        name,
        image: product?.image,
      };
    });
  }, [products]);

  return (
    <section className="py-10">

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            Explore Categories
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Everything you need, all in one place.
          </p>
        </div>

        <button
          onClick={() => setQuery("")}
          className="hidden items-center gap-1 text-sm font-bold text-orange-500 sm:flex"
        >
          View all
          <ArrowRight size={16} />
        </button>
      </div>

      {categoryData.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categoryData.map((category) => (
            <button
              key={category.name}
              onClick={() =>
                setQuery(category.name)
              }
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden bg-slate-100">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl">
                    📦
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-3">
                <span className="text-sm font-bold text-slate-800">
                  {category.name}
                </span>

                <ChevronRight
                  size={15}
                  className="text-slate-400 transition group-hover:translate-x-1"
                />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
          No categories available.
        </div>
      )}
    </section>
  );
};

/* =========================================================
   PRODUCT CARD
========================================================= */

const ProductCard = ({
  product,
  onAdd,
  cart,
  navigate,
}) => {
  const [liked, setLiked] = useState(false);

  const quantity = cart.find(
    (item) => item._id === product._id
  )?.quantity || 0;

  const oldPrice =
    Number(product.oldPrice) ||
    Number(product.discountPrice) ||
    null;

  const discount =
    oldPrice && Number(product.price) < oldPrice
      ? Math.round(
          ((oldPrice - Number(product.price)) /
            oldPrice) *
            100
        )
      : null;

  return (
    <div
      onClick={() =>
        navigate(`/products/${product._id}`)
      }
      className="group relative min-w-[245px] max-w-[245px] cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-md backdrop-blur transition hover:scale-110"
      >
        <Heart
          size={17}
          className={
            liked
              ? "fill-red-500 text-red-500"
              : "text-slate-600"
          }
        />
      </button>

      {/* Deal */}
      {(product.deal || discount >= 20) && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-md bg-red-500 px-2 py-1 text-[11px] font-bold text-white">
          <Zap size={12} />
          DEAL
        </div>
      )}

      {/* Image */}
      <div className="h-56 overflow-hidden bg-slate-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title || product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            📦
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">

        <p className="mb-1 text-xs font-medium text-slate-400">
          {product.category || "Product"}
        </p>

        <h3 className="line-clamp-2 min-h-[42px] text-sm font-semibold text-slate-900">
          {product.title || product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <span className="flex items-center gap-1 rounded bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">
            {product.rating || "4.5"}

            <Star
              size={10}
              className="fill-white"
            />
          </span>

          <span className="text-xs text-slate-400">
            {product.reviews
              ? Number(product.reviews).toLocaleString()
              : "100+"}{" "}
            reviews
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-black text-slate-950">
            {formatPrice(product.price)}
          </span>

          {oldPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>

        {discount && discount > 0 && (
          <p className="mt-1 text-xs font-bold text-emerald-600">
            {discount}% OFF
          </p>
        )}

        {/* Stock */}
        {Number(product.stock) <= 3 &&
          Number(product.stock) > 0 && (
            <div className="mt-2 flex items-center gap-1 text-xs font-bold text-red-500">
              <Clock3 size={13} />

              Only {product.stock} left in stock
            </div>
          )}

        {Number(product.stock) <= 0 && (
          <p className="mt-2 text-xs font-bold text-red-500">
            Out of stock
          </p>
        )}

        {/* Cart */}
        <div className="mt-4">
          {quantity === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(product, 1);
              }}
              disabled={Number(product.stock) <= 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <ShoppingCart size={16} />

              {Number(product.stock) > 0
                ? "Add to Cart"
                : "Out of Stock"}
            </button>
          ) : (
            <div
              onClick={(e) =>
                e.stopPropagation()
              }
              className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2"
            >
              <button
                onClick={() =>
                  onAdd(product, -1)
                }
                className="rounded-lg p-1 transition hover:bg-slate-100"
              >
                <Minus size={16} />
              </button>

              <span className="font-bold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  onAdd(product, 1)
                }
                disabled={
                  quantity >= Number(product.stock)
                }
                className="rounded-lg p-1 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PRODUCT SLIDER
========================================================= */

const ProductSlider = ({
  title,
  subtitle,
  items,
  onAdd,
  cart,
  navigate,
}) => {
  const sliderId = `slider-${title
    .replace(/\s/g, "-")
    .toLowerCase()}`;

  const scroll = (direction) => {
    const element =
      document.getElementById(sliderId);

    if (!element) return;

    element.scrollBy({
      left:
        direction === "left"
          ? -600
          : 600,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-8">

      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-950 md:text-2xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scroll("left")}
            className="rounded-full border border-slate-200 bg-white p-2 shadow-sm transition hover:bg-slate-100"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="rounded-full border border-slate-200 bg-white p-2 shadow-sm transition hover:bg-slate-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {items.length > 0 ? (
        <div
          id={sliderId}
          className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAdd={onAdd}
              cart={cart}
              navigate={navigate}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500">
          No products available.
        </div>
      )}
    </section>
  );
};

/* =========================================================
   DISCOVERY CARD
========================================================= */

const DiscoveryCard = ({
  title,
  products,
  navigate,
}) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-950">
          {title}
        </h3>

        <button className="text-sm font-bold text-orange-500 transition hover:text-orange-600">
          View all
        </button>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product._id}
              onClick={() =>
                navigate(
                  `/products/${product._id}`
                )
              }
              className="group cursor-pointer overflow-hidden rounded-xl bg-slate-50"
            >
              <div className="aspect-square overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={
                      product.title ||
                      product.name
                    }
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl">
                    📦
                  </div>
                )}
              </div>

              <div className="p-2">
                <p className="line-clamp-1 text-xs font-semibold text-slate-700">
                  {product.title ||
                    product.name}
                </p>

                <p className="mt-1 text-xs font-bold text-orange-500">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-sm text-slate-400">
          No products
        </div>
      )}
    </div>
  );
};

/* =========================================================
   BENEFITS
========================================================= */

const Benefits = () => {
  const benefits = [
    {
      icon: Package,
      title: "Fast Delivery",
      text: "Quick and reliable shipping",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      text: "Your payments are protected",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      text: "Simple return experience",
    },
    {
      icon: Star,
      title: "Top Rated",
      text: "Quality products & service",
    },
  ];

  return (
    <section className="rounded-3xl bg-slate-950 py-7 text-white">
      <div className="grid grid-cols-2 gap-6 px-5 lg:grid-cols-4 lg:px-10">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="flex items-center gap-3 border-white/10 lg:border-r lg:px-5 lg:last:border-r-0"
            >
              <Icon
                className="shrink-0 text-orange-500"
                size={26}
              />

              <div>
                <h3 className="text-sm font-bold">
                  {benefit.title}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  {benefit.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* =========================================================
   HOME
========================================================= */

const Home = () => {
  const navigate = useNavigate();

  /* =======================================================
     STATES
  ======================================================= */

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    try {
      const savedCart =
        localStorage.getItem("cart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch {
      return [];
    }
  });

  const [query, setQuery] = useState("");

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      !!localStorage.getItem("token")
    );

  /* =======================================================
     FETCH PRODUCTS
  ======================================================= */

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/products");

      setProducts(
        response.data.products || []
      );
    } catch (error) {
      console.error(
        "Products fetch Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =======================================================
     SAVE CART
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    try {
      setLoading(true);

      const response =
        await api.post("/user/logout");

      if (response.data?.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);

        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setIsLoggedIn(false);

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     ADD / REMOVE CART
  ======================================================= */

  const addToCart = (
    product,
    change = 1
  ) => {
    const productId = product._id;

    if (
      change > 0 &&
      Number(product.stock) <= 0
    ) {
      alert("Product is out of stock");
      return;
    }

    setCart((prevCart) => {
      const existingProduct =
        prevCart.find(
          (item) =>
            item._id === productId
        );

      /* ---------------------------------------------
         Product already in cart
      --------------------------------------------- */

      if (existingProduct) {
        const nextQuantity =
          existingProduct.quantity +
          change;

        /* Remove */
        if (nextQuantity <= 0) {
          return prevCart.filter(
            (item) =>
              item._id !== productId
          );
        }

        /* Stock limit */
        if (
          nextQuantity >
          Number(product.stock)
        ) {
          alert(
            "Maximum available stock reached"
          );

          return prevCart;
        }

        return prevCart.map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity:
                  nextQuantity,
                stock: product.stock,
              }
            : item
        );
      }

      /* ---------------------------------------------
         New product
      --------------------------------------------- */

      if (change <= 0) {
        return prevCart;
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

  /* =======================================================
     CART COUNT
  ======================================================= */

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  /* =======================================================
     CART TOTAL
  ======================================================= */

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  /* =======================================================
     SEARCH FILTER
  ======================================================= */

  const filteredProducts = useMemo(() => {
    const text = query
      .toLowerCase()
      .trim();

    if (!text) {
      return products;
    }

    return products.filter((product) => {
      const title = String(
        product.title ||
          product.name ||
          ""
      ).toLowerCase();

      const description = String(
        product.description || ""
      ).toLowerCase();

      const category = String(
        product.category || ""
      ).toLowerCase();

      const brand = String(
        product.brand || ""
      ).toLowerCase();

      return (
        title.includes(text) ||
        description.includes(text) ||
        category.includes(text) ||
        brand.includes(text)
      );
    });
  }, [products, query]);

  /* =======================================================
     DEAL PRODUCTS
  ======================================================= */

  const deals = useMemo(() => {
    return products.filter((product) => {
      const price = Number(
        product.price || 0
      );

      const oldPrice = Number(
        product.oldPrice ||
          product.discountPrice ||
          0
      );

      if (!oldPrice) {
        return false;
      }

      const discount =
        ((oldPrice - price) /
          oldPrice) *
        100;

      return discount >= 10;
    });
  }, [products]);

  /* =======================================================
     RECOMMENDED
  ======================================================= */

  const recommended = useMemo(() => {
    return [...products].reverse();
  }, [products]);

  /* =======================================================
     BEST SELLERS
  ======================================================= */

  const bestSellers = useMemo(() => {
    return [...products].sort(
      (a, b) =>
        Number(b.rating || 0) -
        Number(a.rating || 0)
    );
  }, [products]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900">

      {/* ===================================================
          HEADER
      =================================================== */}

      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        query={query}
        setQuery={setQuery}
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        loading={loading}
        navigate={navigate}
      />

      {/* ===================================================
          SIDE MENU
      =================================================== */}

      <SideMenu
        open={menuOpen}
        setOpen={setMenuOpen}
        products={products}
        setQuery={setQuery}
      />

      {/* ===================================================
          HERO
      =================================================== */}

      <HeroCarousel
        products={products}
        setQuery={setQuery}
      />

      {/* ===================================================
          GREETING
      =================================================== */}

      <Greeting
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
      />

      <main className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">

        {/* =================================================
            SEARCH RESULT
        ================================================= */}

        {query && (
          <section className="pt-10">
            <div className="mb-5">
              <h2 className="text-2xl font-black">
                Search results for "{query}"
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredProducts.length} products found
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {filteredProducts.map(
                  (product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAdd={addToCart}
                      cart={cart}
                      navigate={navigate}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                <Search
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 font-black">
                  No products found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try searching for another product.
                </p>

                <button
                  onClick={() => setQuery("")}
                  className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
        )}

        {/* =================================================
            CATEGORY
        ================================================= */}

        <CategorySection
          products={products}
          setQuery={setQuery}
        />

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <>
            <section className="py-8">
              <div className="mb-5">
                <div className="h-8 w-52 animate-pulse rounded bg-slate-200" />

                <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-200" />
              </div>

              <div className="flex gap-5 overflow-hidden">
                {[1, 2, 3, 4, 5].map(
                  (item) => (
                    <div
                      key={item}
                      className="min-w-[245px] overflow-hidden rounded-2xl bg-white"
                    >
                      <div className="h-56 animate-pulse bg-slate-200" />

                      <div className="space-y-3 p-4">
                        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

                        <div className="h-10 animate-pulse rounded bg-slate-200" />

                        <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

                        <div className="h-10 animate-pulse rounded bg-slate-200" />
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* =============================================
                DISCOVERY CARDS
            ============================================= */}

            <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              <DiscoveryCard
                title="Keep Shopping"
                products={products.slice(
                  0,
                  4
                )}
                navigate={navigate}
              />

              <DiscoveryCard
                title="Trending Now"
                products={products.slice(
                  4,
                  8
                )}
                navigate={navigate}
              />

              <DiscoveryCard
                title="Top Picks"
                products={products.slice(
                  2,
                  6
                )}
                navigate={navigate}
              />

              <DiscoveryCard
                title="Fresh Arrivals"
                products={products.slice(
                  6,
                  10
                )}
                navigate={navigate}
              />
            </section>

            {/* =============================================
                DEALS
            ============================================= */}

            <ProductSlider
              title="Deals of the Day"
              subtitle="Limited-time prices on popular products"
              items={deals.length > 0
                ? deals
                : products.slice(0, 6)}
              onAdd={addToCart}
              cart={cart}
              navigate={navigate}
            />

            {/* =============================================
                BANNER
            ============================================= */}

            <section className="relative my-8 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 p-7 text-white md:p-10">

              <div className="relative z-10 max-w-xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-100">
                  Weekend Special
                </p>

                <h2 className="mt-2 text-3xl font-black md:text-5xl">
                  Save big on selected products
                </h2>

                <p className="mt-3 max-w-md text-sm text-orange-50 md:text-base">
                  Upgrade your everyday essentials with exclusive offers.
                </p>

                <button
                  onClick={() =>
                    setQuery("")
                  }
                  className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-black text-orange-500 shadow-lg transition hover:bg-slate-50"
                >
                  Shop the Sale
                </button>
              </div>

              <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            </section>

            {/* =============================================
                RECOMMENDED
            ============================================= */}

            <ProductSlider
              title="Inspired by Your Browsing"
              subtitle="Products you may love"
              items={recommended}
              onAdd={addToCart}
              cart={cart}
              navigate={navigate}
            />

            {/* =============================================
                BEST SELLERS
            ============================================= */}

            <ProductSlider
              title="Best Sellers"
              subtitle="Popular products shoppers are buying right now"
              items={bestSellers.slice(
                0,
                8
              )}
              onAdd={addToCart}
              cart={cart}
              navigate={navigate}
            />

            {/* =============================================
                SHOP BY CATEGORY
            ============================================= */}

            <section className="py-8">
              <div className="mb-5">
                <h2 className="text-2xl font-black">
                  Shop by Category
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Find exactly what you're looking for.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                {[
                  ...new Set(
                    products
                      .map(
                        (product) =>
                          product.category
                      )
                      .filter(Boolean)
                  ),
                ]
                  .slice(0, 6)
                  .map((category) => {
                    const product =
                      products.find(
                        (item) =>
                          item.category ===
                          category
                      );

                    return (
                      <button
                        key={category}
                        onClick={() =>
                          setQuery(category)
                        }
                        className="group relative h-44 overflow-hidden rounded-2xl"
                      >
                        {product?.image ? (
                          <img
                            src={product.image}
                            alt={category}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-4xl">
                            📦
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4 text-left">
                          <h3 className="font-black text-white">
                            {category}
                          </h3>

                          <span className="mt-1 flex items-center gap-1 text-xs font-bold text-orange-300">
                            Explore
                            <ArrowRight
                              size={12}
                            />
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </section>

            {/* =============================================
                BENEFITS
            ============================================= */}

            <Benefits />

            {/* =============================================
                FOOTER
            ============================================= */}

            <footer className="mt-10 border-t border-slate-200 py-10">

              <div className="grid gap-8 md:grid-cols-4">

                {/* Brand */}
                <div>
                  <button
                    onClick={() =>
                      navigate("/")
                    }
                    className="text-2xl font-black"
                  >
                    Shop
                    <span className="text-orange-500">
                      X
                    </span>
                  </button>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
                    Your modern destination for electronics,
                    fashion, lifestyle and everyday essentials.
                  </p>
                </div>

                {/* Know Us */}
                <div>
                  <h3 className="font-black">
                    Get to Know Us
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <button className="block transition hover:text-orange-500">
                      About ShopX
                    </button>

                    <button className="block transition hover:text-orange-500">
                      Careers
                    </button>

                    <button className="block transition hover:text-orange-500">
                      Press
                    </button>

                    <button className="block transition hover:text-orange-500">
                      Contact
                    </button>
                  </div>
                </div>

                {/* Support */}
                <div>
                  <h3 className="font-black">
                    Customer Support
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <button
                      onClick={() =>
                        navigate("/profile")
                      }
                      className="block transition hover:text-orange-500"
                    >
                      Your Account
                    </button>

                    <button className="block transition hover:text-orange-500">
                      Orders
                    </button>

                    <button className="block transition hover:text-orange-500">
                      Returns
                    </button>

                    <button className="block transition hover:text-orange-500">
                      Help Center
                    </button>
                  </div>
                </div>

                {/* Seller */}
                <div>
                  <h3 className="font-black">
                    Make Money With Us
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <button className="block transition hover:text-orange-500">
                      Sell on ShopX
                    </button>

                    <button className="block transition hover:text-orange-500">
                      Become an Affiliate
                    </button>

                    <button className="block transition hover:text-orange-500">
                      Advertise Products
                    </button>

                    <button className="block transition hover:text-orange-500">
                      Become a Partner
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
                ©{" "}
                {new Date().getFullYear()}{" "}
                ShopX. All rights reserved.
              </div>
            </footer>
          </>
        )}
      </main>

      {/* ===================================================
          FLOATING CART
      =================================================== */}

      {cartCount > 0 && (
        <div className="fixed bottom-5 left-1/2 z-40 w-[92%] max-w-md -translate-x-1/2">
          <button
            onClick={() => navigate("/cart")}
            className="flex w-full items-center justify-between rounded-2xl bg-orange-500 px-5 py-4 text-white shadow-2xl shadow-orange-900/30 transition hover:bg-orange-600 active:scale-95"
          >
            <div className="flex items-center gap-3">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <ShoppingCart size={21} />
              </span>

              <div className="text-left">
                <p className="font-black">
                  {cartCount}{" "}
                  {cartCount === 1
                    ? "Item"
                    : "Items"}
                </p>

                <p className="text-xs text-orange-100">
                  View your cart
                </p>
              </div>
            </div>

            <span className="text-lg font-black">
              {formatPrice(cartTotal)}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

