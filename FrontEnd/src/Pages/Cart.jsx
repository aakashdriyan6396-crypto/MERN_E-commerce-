import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();

  // =========================
  // Cart State
  // =========================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
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

        // Don't exceed stock
        if (item.quantity >= item.stock) {
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
  // Remove Product
  // =========================

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== productId)
    );
  };

  // =========================
  // Clear Cart
  // =========================

  const clearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (!confirmClear) return;

    setCart([]);
  };

  // =========================
  // Cart Calculations
  // =========================

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;

  const total = subtotal + shipping;

  // =========================
  // Empty Cart
  // =========================

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="sticky top-0 lg:px-50 z-50 flex items-center justify-between bg-blue-600 px-5 py-4 text-white shadow-lg md:px-10 ">
          <h1
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-extrabold"
          >
            🛍️ ShopEase
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="rounded-xl bg-white px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            👨‍💻 Login
          </button>
        </nav>

        {/* Empty Cart */}
        <div className="flex min-h-[80vh] items-center justify-center px-5">
          <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-lg">

            <div className="mb-5 text-7xl">
              🛒
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900">
              Your Cart is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-7 rounded-xl bg-blue-600 px-7 py-3 font-bold text-white transition hover:bg-blue-700 active:scale-95"
            >
              ← Continue Shopping
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          Navbar
      ========================== */}

      <nav className="sticky top-0 z-50 flex items-center justify-between bg-blue-600 px-5 py-4 text-white shadow-lg md:px-10 lg:px-20">

        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-extrabold"
        >
          🛍️ ShopEase
        </h1>

        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-white px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            🏠 Shop
          </button>

          <button
            onClick={() => navigate("/login")}
            className="rounded-xl bg-white px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            👨‍💻 Login
          </button>

        </div>
      </nav>

      {/* =========================
          Main
      ========================== */}

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">

        {/* Header */}

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              🛒 Shopping Cart
            </h1>

            <p className="mt-2 text-gray-500">
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"}{" "}
              in your cart
            </p>
          </div>

          {/* Clear Cart */}

          <button
            onClick={clearCart}
            className="rounded-xl border border-blue-200 px-5 py-2.5 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            🗑️ Clear Cart
          </button>

        </div>

        {/* =========================
            Cart Layout
        ========================== */}

        <div className="grid gap-8 lg:grid-cols-3">

          {/* =========================
              Cart Products
          ========================== */}

          <div className="space-y-5 lg:col-span-2">

            {cart.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
              >

                <div className="flex flex-col gap-5 p-5 sm:flex-row">

                  {/* Image */}

                  <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-40">

                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />

                  </div>

                  {/* Product Info */}

                  <div className="flex flex-1 flex-col justify-between">

                    <div>

                      <div className="flex items-start justify-between gap-4">

                        <h2 className="text-xl font-bold text-gray-900">
                          {product.title}
                        </h2>

                        {/* Remove */}

                        <button
                          onClick={() =>
                            removeFromCart(
                              product._id
                            )
                          }
                          className="text-xl text-gray-400 transition hover:text-blue-600"
                          title="Remove"
                        >
                          ✕
                        </button>

                      </div>

                      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                        {product.description}
                      </p>

                    </div>

                    {/* Bottom */}

                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      {/* Price */}

                      <div>
                        <p className="text-sm text-gray-400">
                          Price
                        </p>

                        <p className="text-xl font-bold text-blue-600">
                          ₹
                          {Number(
                            product.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      {/* Quantity */}

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              product._id
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-xl font-bold transition hover:bg-gray-300"
                        >
                          −
                        </button>

                        <span className="flex h-10 min-w-12 items-center justify-center rounded-lg bg-blue-50 px-3 font-bold text-blue-600">
                          {product.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              product
                            )
                          }
                          disabled={
                            product.quantity >=
                            product.stock
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* Product Total */}

                    <div className="mt-4 flex items-center justify-between border-t pt-4">

                      <span className="text-sm text-gray-500">
                        Product Total
                      </span>

                      <span className="text-lg font-bold text-gray-900">
                        ₹
                        {(
                          Number(product.price) *
                          product.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}

            <button
              onClick={() => navigate("/")}
              className="rounded-xl border-2 border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              ← Continue Shopping
            </button>

          </div>

          {/* =========================
              Order Summary
          ========================== */}

          <div className="lg:col-span-1">

            <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-lg">

              <h2 className="mb-6 text-2xl font-extrabold text-gray-900">
                Order Summary
              </h2>

              {/* Items */}

              <div className="space-y-4 border-b pb-5">

                <div className="flex justify-between text-gray-600">
                  <span>
                    Items ({totalItems})
                  </span>

                  <span className="font-semibold text-gray-900">
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                {/* Shipping */}

                <div className="flex justify-between text-gray-600">
                  <span>
                    Shipping
                  </span>

                  <span className="font-semibold text-green-600">
                    FREE
                  </span>
                </div>

              </div>

              {/* Total */}

              <div className="flex items-center justify-between py-5">

                <span className="text-xl font-bold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-extrabold text-blue-600">
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              {/* Checkout */}

              <button
                onClick={() => {
                  alert(
                    "Checkout functionality coming soon!"
                  );
                }}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-blue-700 active:scale-95"
              >
                Proceed to Checkout →
              </button>

              {/* Secure */}

              <p className="mt-4 text-center text-xs text-gray-400">
                🔒 Secure checkout
              </p>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Cart;