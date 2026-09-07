
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Heart,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  Truck,
  User,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";

/* =========================================================
   CART
========================================================= */

const Cart = () => {
  const navigate = useNavigate();

  // =========================
  // Cart State
  // =========================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // =========================
  // Save Cart
  // =========================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // Increase Quantity
  // =========================

  const increaseQuantity = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id !== product._id) {
          return item;
        }

        if (item.quantity >= item.stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
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
        .filter((item) => item.quantity > 0),
    );
  };

  // =========================
  // Remove Product
  // =========================

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== productId),
    );
  };

  // =========================
  // Clear Cart
  // =========================

  const clearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?",
    );

    if (!confirmClear) return;

    setCart([]);
  };

  // =========================
  // Calculations
  // =========================

  const totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  const shipping = subtotal > 0 ? 0 : 0;

  const total = subtotal + shipping;

  // =========================
  // Format Price
  // =========================

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(price || 0));
  };

  // =========================
  // Checkout
  // =========================

  const checkout = () => {
    if (!cart.length) {
      alert("Cart is empty.");
      return;
    }

    alert("Checkout functionality coming soon!");
  };

  // =========================
  // Empty Cart
  // =========================

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900">
        {/* =================================================
            HEADER
        ================================================== */}

        <header className="sticky top-0 z-[70] bg-slate-950 text-white shadow-xl">
          <div className="mx-auto max-w-[1500px] px-3">
            <div className="flex min-h-[70px] items-center justify-between gap-3">
              {/* Logo */}

              <button
                onClick={() => navigate("/")}
                className="text-2xl font-black tracking-tight"
              >
                Shop
                <span className="text-orange-500">X</span>
              </button>

              {/* Right */}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/")}
                  className="hidden rounded-xl px-3 py-2 text-sm font-bold transition hover:bg-white/10 sm:flex sm:items-center sm:gap-2"
                >
                  <ArrowLeft size={17} />
                  Continue Shopping
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-white/10"
                >
                  <User size={21} />

                  <span className="hidden text-sm font-bold sm:block">
                    Login
                  </span>
                </button>

                <div className="relative rounded-xl bg-white/10 p-2">
                  <ShoppingCart size={23} />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Nav */}

          <div className="border-t border-white/10 bg-slate-900">
            <div className="mx-auto flex max-w-[1500px] items-center gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold">
              <button
                onClick={() => navigate("/")}
                className="shrink-0 hover:text-orange-400"
              >
                Home
              </button>

              <button className="shrink-0 hover:text-orange-400">
                Today's Deals
              </button>

              <button className="shrink-0 hover:text-orange-400">
                Best Sellers
              </button>

              <button className="shrink-0 hover:text-orange-400">
                Electronics
              </button>

              <button className="shrink-0 hover:text-orange-400">
                Fashion
              </button>

              <button className="shrink-0 hover:text-orange-400">
                Customer Service
              </button>
            </div>
          </div>
        </header>

        {/* =================================================
            EMPTY CART
        ================================================== */}

        <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-[1500px] items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200 md:p-12">
            {/* Icon */}

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-orange-50">
              <ShoppingCart
                size={55}
                strokeWidth={1.5}
                className="text-orange-500"
              />
            </div>

            <div className="mt-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Your Shopping Cart
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Your Cart is Empty
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Looks like you haven't added anything to your
                cart yet. Discover amazing products and start
                shopping.
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-orange-500/30"
            >
              Start Shopping
              <ArrowRight size={18} />
            </button>

            {/* Trust */}

            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-slate-100 pt-7 md:grid-cols-4">
              <TrustItem
                icon={Truck}
                title="Fast Delivery"
              />

              <TrustItem
                icon={ShieldCheck}
                title="Secure Payment"
              />

              <TrustItem
                icon={RotateCcw}
                title="Easy Returns"
              />

              <TrustItem
                icon={Heart}
                title="Top Rated"
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ========================================================
  // MAIN CART
  // ========================================================

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-[70] bg-slate-950 text-white shadow-xl">
        <div className="mx-auto max-w-[1500px] px-3">
          <div className="flex min-h-[70px] items-center gap-3">
            {/* Logo */}

            <button
              onClick={() => navigate("/")}
              className="shrink-0 text-2xl font-black tracking-tight"
            >
              Shop
              <span className="text-orange-500">X</span>
            </button>

            {/* Search-like Cart Title */}

            <div className="hidden flex-1 md:block">
              <div className="mx-auto max-w-xl rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <ShoppingCart
                    size={18}
                    className="text-orange-500"
                  />

                  <span className="text-sm font-semibold text-slate-300">
                    Shopping Cart
                  </span>

                  <span className="ml-auto rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-black text-white">
                    {totalItems}{" "}
                    {totalItems === 1 ? "ITEM" : "ITEMS"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              {/* Shop */}

              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-bold transition hover:bg-white/10 sm:px-3"
              >
                <ArrowLeft size={18} />

                <span className="hidden sm:block">
                  Shop
                </span>
              </button>

              {/* Account */}

              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-white/10 sm:px-3"
              >
                <User size={21} />

                <div className="hidden text-left sm:block">
                  <p className="text-[10px] text-slate-400">
                    Hello, User
                  </p>

                  <p className="text-sm font-bold">
                    Account
                  </p>
                </div>
              </button>

              {/* Cart */}

              <div className="relative rounded-xl bg-white/10 p-2">
                <ShoppingCart size={24} />

                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black">
                  {totalItems}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Navigation */}

        <div className="border-t border-white/10 bg-slate-900">
          <div className="mx-auto flex max-w-[1500px] items-center gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold">
            <button
              onClick={() => navigate("/")}
              className="shrink-0 hover:text-orange-400"
            >
              Home
            </button>

            <button className="shrink-0 hover:text-orange-400">
              Today's Deals
            </button>

            <button className="shrink-0 hover:text-orange-400">
              New Arrivals
            </button>

            <button className="shrink-0 hover:text-orange-400">
              Best Sellers
            </button>

            <button className="shrink-0 hover:text-orange-400">
              Electronics
            </button>

            <button className="shrink-0 hover:text-orange-400">
              Fashion
            </button>

            <button className="shrink-0 hover:text-orange-400">
              Customer Service
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        {/* =================================================
            PAGE HEADER
        ================================================== */}

        <section className="mb-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
                Review Your Items
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Shopping Cart
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>

            <button
              onClick={clearCart}
              className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 sm:self-auto"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          </div>
        </section>

        {/* =================================================
            CART CONTENT
        ================================================== */}

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          {/* =================================================
              PRODUCTS
          ================================================== */}

          <section className="space-y-4">
            {cart.map((product) => {
              const productName =
                product.title ||
                product.name ||
                "Product";

              const productImage =
                product.image ||
                product.images?.[0] ||
                "https://via.placeholder.com/500";

              const productStock = Number(
                product.stock || 0,
              );

              const productQuantity = Number(
                product.quantity || 0,
              );

              const productPrice = Number(
                product.price || 0,
              );

              return (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="flex flex-col gap-5 p-4 sm:flex-row sm:p-5">
                    {/* ======================================
                        IMAGE
                    ======================================= */}

                    <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-44 sm:w-44">
                      <img
                        src={productImage}
                        alt={productName}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* Deal Badge */}

                      {product.discountPrice && (
                        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-red-500 px-2 py-1 text-[10px] font-black text-white">
                          <Zap size={11} />
                          DEAL
                        </div>
                      )}
                    </div>

                    {/* ======================================
                        PRODUCT DETAILS
                    ======================================= */}

                    <div className="flex min-w-0 flex-1 flex-col">
                      {/* Top */}

                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-400">
                            {product.category ||
                              "ShopEase Product"}
                          </p>

                          <h2 className="mt-1 line-clamp-2 text-lg font-black leading-tight text-slate-950 transition group-hover:text-orange-500 md:text-xl">
                            {productName}
                          </h2>
                        </div>

                        {/* Remove */}

                        <button
                          onClick={() =>
                            removeFromCart(product._id)
                          }
                          title="Remove from cart"
                          className="shrink-0 rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <X size={19} />
                        </button>
                      </div>

                      {/* Description */}

                      {product.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
                          {product.description}
                        </p>
                      )}

                      {/* Product Bottom */}

                      <div className="mt-auto pt-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                          {/* Price */}

                          <div>
                            <p className="text-xs text-slate-400">
                              Price
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-xl font-black text-slate-950">
                                {formatPrice(productPrice)}
                              </span>

                              {product.oldPrice && (
                                <span className="text-xs text-slate-400 line-through">
                                  {formatPrice(
                                    product.oldPrice,
                                  )}
                                </span>
                              )}
                            </div>

                            {product.discount && (
                              <p className="mt-1 text-xs font-bold text-emerald-600">
                                {product.discount}% OFF
                              </p>
                            )}
                          </div>

                          {/* Quantity */}

                          <div>
                            <p className="mb-2 text-xs text-slate-400">
                              Quantity
                            </p>

                            <div className="flex w-fit items-center rounded-xl border border-slate-200 bg-white p-1">
                              <button
                                onClick={() =>
                                  decreaseQuantity(
                                    product._id,
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-orange-500"
                              >
                                <Minus size={16} />
                              </button>

                              <span className="flex h-9 min-w-10 items-center justify-center px-2 text-sm font-black text-slate-900">
                                {productQuantity}
                              </span>

                              <button
                                onClick={() =>
                                  increaseQuantity(product)
                                }
                                disabled={
                                  productQuantity >=
                                  productStock
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Stock */}

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                          {productStock > 0 &&
                          productStock <= 3 ? (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                              <Clock3 size={14} />
                              Only {productStock} left
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                              <CheckCircle2 size={14} />
                              In stock
                            </div>
                          )}

                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-wider text-slate-400">
                              Product Total
                            </p>

                            <p className="text-lg font-black text-orange-500">
                              {formatPrice(
                                productPrice *
                                  productQuantity,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Continue Shopping */}

            <button
              onClick={() => navigate("/")}
              className="group mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-500"
            >
              <ArrowLeft
                size={17}
                className="transition group-hover:-translate-x-1"
              />
              Continue Shopping
            </button>
          </section>

          {/* =================================================
              ORDER SUMMARY
          ================================================== */}

          <aside className="lg:sticky lg:top-32">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              {/* Summary Header */}

              <div className="bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Checkout
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      Order Summary
                    </h2>
                  </div>

                  <div className="rounded-xl bg-orange-500 p-3">
                    <ShoppingCart size={22} />
                  </div>
                </div>
              </div>

              {/* Summary Body */}

              <div className="p-6">
                {/* Items */}

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Items ({totalItems})
                    </span>

                    <span className="font-bold text-slate-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Shipping
                    </span>

                    <span className="font-bold text-emerald-600">
                      FREE
                    </span>
                  </div>
                </div>

                {/* Free Shipping */}

                <div className="my-5 flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                    <Truck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-black text-emerald-700">
                      Free Delivery
                    </p>

                    <p className="mt-0.5 text-[10px] text-emerald-600">
                      Shipping charges are completely free.
                    </p>
                  </div>
                </div>

                {/* Divider */}

                <div className="border-t border-dashed border-slate-200" />

                {/* Total */}

                <div className="flex items-end justify-between py-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Total
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Final amount
                    </p>
                  </div>

                  <p className="text-2xl font-black text-slate-950">
                    {formatPrice(total)}
                  </p>
                </div>

                {/* Checkout Button */}

                <button
                  onClick={checkout}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-orange-500/30"
                >
                  Proceed to Checkout
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

                {/* Secure */}

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={15} />
                  Secure checkout
                </div>
              </div>
            </div>

            {/* =================================================
                BENEFITS
            ================================================== */}

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <BenefitRow
                icon={Truck}
                title="Fast Delivery"
                text="Quick and reliable shipping"
              />

              <BenefitRow
                icon={ShieldCheck}
                title="Secure Payments"
                text="Your payments are protected"
              />

              <BenefitRow
                icon={RotateCcw}
                title="Easy Returns"
                text="Simple return experience"
              />

              <BenefitRow
                icon={StarIcon}
                title="Top Rated"
                text="Millions of happy shoppers"
                last
              />
            </div>
          </aside>
        </div>

        {/* =================================================
            BOTTOM TRUST BAR
        ================================================== */}

        <section className="mt-10 overflow-hidden rounded-3xl bg-slate-950 py-7 text-white">
          <div className="grid grid-cols-2 gap-6 px-5 lg:grid-cols-4 lg:px-10">
            <TrustItem
              icon={Package}
              title="Fast Delivery"
              dark
            />

            <TrustItem
              icon={ShieldCheck}
              title="Secure Payments"
              dark
            />

            <TrustItem
              icon={RotateCcw}
              title="Easy Returns"
              dark
            />

            <TrustItem
              icon={Heart}
              title="Top Rated"
              dark
            />
          </div>
        </section>
      </main>
    </div>
  );
};

/* =========================================================
   BENEFIT ROW
========================================================= */

const BenefitRow = ({
  icon: Icon,
  title,
  text,
  last = false,
}) => {
  return (
    <div
      className={`flex items-center gap-3 p-4 ${
        !last ? "border-b border-slate-100" : ""
      }`}
    >
      <Icon
        size={23}
        className="shrink-0 text-orange-500"
      />

      <div>
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-0.5 text-xs text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   TRUST ITEM
========================================================= */

const TrustItem = ({
  icon: Icon,
  title,
  dark = false,
}) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        dark
          ? "border-white/10 lg:border-r lg:px-5 last:border-r-0"
          : ""
      }`}
    >
      <Icon
        size={25}
        className="shrink-0 text-orange-500"
      />

      <div>
        <h3
          className={`text-sm font-bold ${
            dark
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          {title}
        </h3>

        <p
          className={`mt-1 text-xs ${
            dark
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Trusted ShopX service
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   STAR ICON
========================================================= */

const StarIcon = ({ size = 23, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default Cart;

