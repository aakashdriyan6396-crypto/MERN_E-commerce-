
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Heart,
  Minus,
  Package,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
  User,
  X,
  Zap,
} from "lucide-react";
import api from "../api/axios";

const ProductCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  // =========================================
  // FETCH SINGLE PRODUCT
  // =========================================

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/products/${id}`);

      setProduct(response.data.product);
      setQuantity(1);
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

  // =========================================
  // FETCH ALL PRODUCTS
  // =========================================

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

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {
    fetchProduct();
    fetchProducts();
  }, [id]);

  // =========================================
  // HELPERS
  // =========================================

  const getTitle = (item) =>
    item?.title || item?.name || "Product";

  const getImage = (item) =>
    item?.image ||
    item?.images?.[0] ||
    "https://via.placeholder.com/600x600?text=Product";

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(price) || 0);
  };

  const originalPrice = Number(
    product?.price || 0
  );

  const salePrice = Number(
    product?.discountPrice || product?.price || 0
  );

  const discount =
    originalPrice > salePrice
      ? Math.round(
          ((originalPrice - salePrice) /
            originalPrice) *
            100
        )
      : 0;

  // =========================================
  // ADD TO CART
  // =========================================

  const addToCart = (item, selectedQuantity = 1) => {
    if (!item || item.stock <= 0) {
      alert("Product is out of stock");
      return;
    }

    const oldCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = oldCart.find(
      (cartItem) => cartItem._id === item._id
    );

    let updatedCart;

    if (existingProduct) {
      if (
        existingProduct.quantity + selectedQuantity >
        item.stock
      ) {
        alert("You cannot add more than available stock");
        return;
      }

      updatedCart = oldCart.map((cartItem) =>
        cartItem._id === item._id
          ? {
              ...cartItem,
              quantity:
                cartItem.quantity + selectedQuantity,
            }
          : cartItem
      );
    } else {
      if (selectedQuantity > item.stock) {
        alert("Requested quantity is not available");
        return;
      }

      updatedCart = [
        ...oldCart,
        {
          ...item,
          quantity: selectedQuantity,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  // =========================================
  // QUANTITY
  // =========================================

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // =========================================
  // SEARCH
  // =========================================

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  // =========================================
  // RELATED PRODUCTS
  // =========================================

  const finalProducts = useMemo(() => {
    if (!product) return [];

    const related = products
      .filter((item) => item._id !== product._id)
      .filter((item) => {
        if (!product.category) return true;

        return (
          item.category?.toLowerCase() ===
          product.category?.toLowerCase()
        );
      });

    if (related.length >= 4) {
      return related.slice(0, 8);
    }

    return products
      .filter((item) => item._id !== product._id)
      .slice(0, 8);
  }, [products, product]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <nav className="border-b border-white/10 bg-slate-950/95 px-5 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="h-8 w-32 animate-pulse rounded-lg bg-white/10" />

            <div className="hidden h-10 max-w-xl flex-1 animate-pulse rounded-xl bg-white/10 md:mx-10 md:block" />

            <div className="h-9 w-24 animate-pulse rounded-lg bg-white/10" />
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid animate-pulse gap-10 lg:grid-cols-2">
            <div className="h-[500px] rounded-3xl bg-white/10" />

            <div className="space-y-6 py-10">
              <div className="h-5 w-24 rounded bg-white/10" />
              <div className="h-16 w-4/5 rounded bg-white/10" />
              <div className="h-24 w-full rounded bg-white/10" />
              <div className="h-12 w-40 rounded bg-white/10" />
              <div className="h-14 w-full rounded bg-white/10" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <Package size={38} />
          </div>

          <h2 className="text-3xl font-black">
            Product Not Found
          </h2>

          <p className="mt-3 text-slate-400">
            {error || "We couldn't find this product."}
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-orange-400"
          >
            <ArrowLeft size={18} />
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =========================================
          TOP HEADER
      ========================================= */}

      <header className="sticky top-0 z-50 bg-slate-950 text-white shadow-xl">

        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 md:px-8">

          {/* LOGO */}

          <button
            onClick={() => navigate("/")}
            className="group shrink-0"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-slate-950 transition group-hover:rotate-6">
                <ShoppingBag size={20} strokeWidth={2.5} />
              </div>

              <span className="hidden text-xl font-black tracking-tight sm:block">
                Shop<span className="text-orange-500">X</span>
              </span>
            </div>
          </button>

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="hidden min-w-0 flex-1 md:block"
          >
            <div className="mx-auto flex max-w-2xl overflow-hidden rounded-xl bg-white">

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="min-w-0 flex-1 px-4 py-3 text-sm text-slate-900 outline-none"
              />

              <button
                type="submit"
                className="flex w-14 items-center justify-center bg-orange-500 text-slate-950 transition hover:bg-orange-400"
              >
                <Search size={19} />
              </button>

            </div>
          </form>

          {/* RIGHT ACTIONS */}

          <div className="ml-auto flex items-center gap-2">

            <button
              onClick={() => navigate("/login")}
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-white/10 sm:flex"
            >
              <User size={19} />
              Login
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-2 text-sm font-black text-slate-950 transition hover:bg-orange-400"
            >
              <ShoppingCart size={19} />

              <span className="hidden sm:inline">
                Cart
              </span>
            </button>

          </div>
        </div>

        {/* SECONDARY NAV */}

        <div className="hidden border-t border-white/10 md:block">
          <div className="mx-auto flex max-w-7xl items-center gap-7 px-8 py-3 text-sm font-semibold text-slate-300">

            <button
              onClick={() => navigate("/")}
              className="transition hover:text-orange-400"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/")}
              className="transition hover:text-orange-400"
            >
              All Products
            </button>

            <button
              onClick={() => navigate("/")}
              className="transition hover:text-orange-400"
            >
              Deals
            </button>

            <button
              onClick={() => navigate("/")}
              className="transition hover:text-orange-400"
            >
              Best Sellers
            </button>

            <span className="ml-auto flex items-center gap-2 text-orange-400">
              <Zap size={16} fill="currentColor" />
              Today's Deals
            </span>

          </div>
        </div>

      </header>

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">

        {/* BREADCRUMB */}

        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate-500">

          <button
            onClick={() => navigate("/")}
            className="transition hover:text-orange-500"
          >
            Home
          </button>

          <ChevronRight size={15} />

          {product.category && (
            <>
              <span>{product.category}</span>
              <ChevronRight size={15} />
            </>
          )}

          <span className="line-clamp-1 font-semibold text-slate-900">
            {getTitle(product)}
          </span>

        </div>

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate(-1)}
          className="mb-7 flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-orange-500"
        >
          <ArrowLeft size={17} />
          Back to Products
        </button>

        {/* =========================================
            PRODUCT SECTION
        ========================================= */}

        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">

          <div className="grid lg:grid-cols-2">

            {/* PRODUCT IMAGE */}

            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-slate-100 p-8 md:min-h-[620px]">

              {/* Background decoration */}

              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-300/30 blur-3xl" />

              {/* Discount */}

              {discount > 0 && (
                <div className="absolute left-6 top-6 z-10 rounded-xl bg-orange-500 px-4 py-2 text-sm font-black text-slate-950 shadow-lg">
                  {discount}% OFF
                </div>
              )}

              {/* Wishlist */}

              <button
                onClick={() => setLiked(!liked)}
                className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
              >
                <Heart
                  size={21}
                  className={
                    liked
                      ? "fill-red-500 text-red-500"
                      : "text-slate-600"
                  }
                />
              </button>

              <img
                src={getImage(product)}
                alt={getTitle(product)}
                className="relative z-10 max-h-[520px] w-full object-contain drop-shadow-2xl transition duration-700 hover:scale-105"
              />

            </div>

            {/* PRODUCT INFORMATION */}

            <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14">

              {/* BRAND / CATEGORY */}

              <div className="mb-4 flex flex-wrap items-center gap-3">

                {product.category && (
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-orange-600">
                    {product.category}
                  </span>
                )}

                {product.brand && (
                  <span className="text-sm font-semibold text-slate-500">
                    {product.brand}
                  </span>
                )}

              </div>

              {/* TITLE */}

              <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
                {getTitle(product)}
              </h1>

              {/* RATING */}

              <div className="mt-5 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-1.5">
                  <Star
                    size={16}
                    className="fill-orange-500 text-orange-500"
                  />

                  <span className="font-black text-orange-600">
                    4.5
                  </span>
                </div>

                <span className="text-sm text-slate-500">
                  128 ratings
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span className="text-sm font-semibold text-slate-500">
                  500+ bought recently
                </span>

              </div>

              {/* DESCRIPTION */}

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                {product.description ||
                  "Premium quality product designed to give you an excellent shopping experience."}
              </p>

              {/* DIVIDER */}

              <div className="my-7 h-px bg-slate-200" />

              {/* PRICE */}

              <div>

                <p className="mb-1 text-xs font-black uppercase tracking-widest text-slate-400">
                  Special Price
                </p>

                <div className="flex flex-wrap items-end gap-3">

                  <span className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                    {formatPrice(salePrice)}
                  </span>

                  {discount > 0 && (
                    <>
                      <span className="mb-1 text-lg text-slate-400 line-through">
                        {formatPrice(originalPrice)}
                      </span>

                      <span className="mb-1 font-black text-green-600">
                        {discount}% off
                      </span>
                    </>
                  )}

                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Inclusive of all taxes
                </p>

              </div>

              {/* STOCK */}

              <div className="mt-7 flex items-center gap-3">

                {product.stock > 0 ? (
                  <>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Check size={17} strokeWidth={3} />
                    </div>

                    <div>
                      <p className="font-bold text-green-600">
                        In Stock
                      </p>

                      <p className="text-xs text-slate-500">
                        {product.stock} units available
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <X size={17} />
                    </div>

                    <p className="font-bold text-red-600">
                      Currently Out of Stock
                    </p>
                  </>
                )}

              </div>

              {/* QUANTITY */}

              {product.stock > 0 && (
                <div className="mt-7">

                  <p className="mb-2 text-sm font-bold text-slate-700">
                    Quantity
                  </p>

                  <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200">

                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="flex h-12 w-12 items-center justify-center transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="flex h-12 w-14 items-center justify-center border-x border-slate-200 font-black">
                      {quantity}
                    </span>

                    <button
                      onClick={increaseQuantity}
                      disabled={
                        quantity >= product.stock
                      }
                      className="flex h-12 w-12 items-center justify-center transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="text-xl">
                        +
                      </span>
                    </button>

                  </div>

                </div>
              )}

              {/* ACTIONS */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">

                <button
                  onClick={() =>
                    addToCart(product, quantity)
                  }
                  disabled={product.stock <= 0}
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 font-black text-slate-950 shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                >
                  {added ? (
                    <>
                      <Check size={20} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    navigate("/cart");
                  }}
                  disabled={product.stock <= 0}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 px-5 py-4 font-black text-slate-900 transition hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
                >
                  <Zap size={19} />
                  Buy Now
                </button>

              </div>

              {/* DELIVERY INFO */}

              <div className="mt-8 space-y-3 rounded-2xl bg-slate-50 p-5">

                <div className="flex items-center gap-3">

                  <Truck
                    size={20}
                    className="text-orange-500"
                  />

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Free & Fast Delivery
                    </p>

                    <p className="text-xs text-slate-500">
                      Fast delivery to your doorstep
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <ShieldCheck
                    size={20}
                    className="text-orange-500"
                  />

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Secure Payment
                    </p>

                    <p className="text-xs text-slate-500">
                      100% secure checkout
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <RotateCcw
                    size={20}
                    className="text-orange-500"
                  />

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Easy Returns
                    </p>

                    <p className="text-xs text-slate-500">
                      Hassle-free return experience
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
            PRODUCT HIGHLIGHTS
        ========================================= */}

        <section className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <Truck
              size={24}
              className="mb-4 text-orange-500"
            />

            <h3 className="font-black text-slate-900">
              Fast Delivery
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Quick delivery right to your door.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <ShieldCheck
              size={24}
              className="mb-4 text-orange-500"
            />

            <h3 className="font-black text-slate-900">
              Secure Shopping
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your data and payment are protected.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <RotateCcw
              size={24}
              className="mb-4 text-orange-500"
            />

            <h3 className="font-black text-slate-900">
              Easy Returns
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Simple and convenient returns.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <CreditCard
              size={24}
              className="mb-4 text-orange-500"
            />

            <h3 className="font-black text-slate-900">
              Safe Payments
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Multiple secure payment options.
            </p>

          </div>

        </section>

        {/* =========================================
            RELATED PRODUCTS
        ========================================= */}

        <section className="mt-16">

          <div className="mb-7 flex items-end justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <span className="h-1 w-8 rounded-full bg-orange-500" />

                <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                  Recommended
                </p>

              </div>

              <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                Customers also viewed
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Products you may also love
              </p>

            </div>

            <button
              onClick={() => navigate("/")}
              className="hidden items-center gap-1 text-sm font-black text-orange-500 transition hover:text-orange-600 sm:flex"
            >
              See all
              <ArrowRight size={17} />
            </button>

          </div>

          {productsLoading ? (

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="h-52 bg-slate-100" />

                  <div className="space-y-3 p-5">
                    <div className="h-3 w-20 rounded bg-slate-200" />
                    <div className="h-5 w-full rounded bg-slate-200" />
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                    <div className="h-10 w-full rounded bg-slate-200" />
                  </div>
                </div>
              ))}

            </div>

          ) : finalProducts.length === 0 ? (

            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

              <Package
                size={38}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 font-semibold text-slate-500">
                No other products available.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

              {finalProducts.map((item) => {

                const itemPrice = Number(
                  item.discountPrice ||
                    item.price ||
                    0
                );

                const itemOriginalPrice = Number(
                  item.price || 0
                );

                const itemDiscount =
                  itemOriginalPrice > itemPrice
                    ? Math.round(
                        ((itemOriginalPrice -
                          itemPrice) /
                          itemOriginalPrice) *
                          100
                      )
                    : 0;

                return (
                  <article
                    key={item._id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/60"
                  >

                    {/* IMAGE */}

                    <div
                      onClick={() =>
                        navigate(
                          `/products/${item._id}`
                        )
                      }
                      className="relative h-48 cursor-pointer overflow-hidden bg-slate-100 sm:h-56"
                    >

                      {itemDiscount > 0 && (
                        <span className="absolute left-3 top-3 z-10 rounded-lg bg-orange-500 px-2.5 py-1 text-[10px] font-black text-slate-950">
                          {itemDiscount}% OFF
                        </span>
                      )}

                      <span
                        className={`absolute right-3 top-3 z-10 rounded-lg px-2.5 py-1 text-[10px] font-black ${
                          item.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.stock > 0
                          ? `${item.stock} left`
                          : "Sold Out"}
                      </span>

                      <img
                        src={getImage(item)}
                        alt={getTitle(item)}
                        className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-110"
                      />

                    </div>

                    {/* DETAILS */}

                    <div className="p-4 sm:p-5">

                      {item.category && (
                        <p className="mb-1 text-[10px] font-black uppercase tracking-wider text-orange-500">
                          {item.category}
                        </p>
                      )}

                      <h3 className="line-clamp-1 text-sm font-black text-slate-900 sm:text-base">
                        {getTitle(item)}
                      </h3>

                      <p className="mt-2 line-clamp-2 min-h-[38px] text-xs leading-5 text-slate-500 sm:text-sm">
                        {item.description ||
                          "Premium quality product."}
                      </p>

                      {/* PRICE */}

                      <div className="mt-4 flex flex-wrap items-center gap-2">

                        <span className="text-lg font-black text-slate-950">
                          {formatPrice(itemPrice)}
                        </span>

                        {itemDiscount > 0 && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatPrice(
                              itemOriginalPrice
                            )}
                          </span>
                        )}

                      </div>

                      {/* RATING */}

                      <div className="mt-2 flex items-center gap-1">

                        <Star
                          size={13}
                          className="fill-orange-400 text-orange-400"
                        />

                        <span className="text-xs font-bold text-slate-600">
                          4.5
                        </span>

                        <span className="text-xs text-slate-400">
                          (128)
                        </span>

                      </div>

                      {/* BUTTON */}

                      <button
                        onClick={() =>
                          addToCart(item)
                        }
                        disabled={item.stock <= 0}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-3 text-xs font-black text-white transition hover:bg-orange-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                      >
                        <ShoppingCart size={16} />

                        {item.stock > 0
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>

          )}

        </section>

      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="mt-20 bg-slate-950 px-5 py-12 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-4">

            <div className="md:col-span-2">

              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-slate-950">
                  <ShoppingBag size={20} />
                </div>

                <h3 className="text-xl font-black">
                  Shop<span className="text-orange-500">
                    X
                  </span>
                </h3>

              </div>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                Discover quality products, amazing deals,
                and a premium shopping experience — all in
                one place.
              </p>

            </div>

            <div>

              <h4 className="font-black">
                Quick Links
              </h4>

              <div className="mt-4 space-y-3 text-sm text-slate-400">

                <button
                  onClick={() => navigate("/")}
                  className="block transition hover:text-orange-400"
                >
                  Home
                </button>

                <button
                  onClick={() => navigate("/cart")}
                  className="block transition hover:text-orange-400"
                >
                  Cart
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="block transition hover:text-orange-400"
                >
                  Login
                </button>

              </div>

            </div>

            <div>

              <h4 className="font-black">
                Shopping
              </h4>

              <div className="mt-4 space-y-3 text-sm text-slate-400">

                <p>Fast Delivery</p>
                <p>Secure Payments</p>
                <p>Easy Returns</p>
                <p>Premium Products</p>

              </div>

            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © 2026 ShopX. All rights reserved.
          </div>

        </div>

      </footer>

    </div>
  );
};

export default ProductCard;

