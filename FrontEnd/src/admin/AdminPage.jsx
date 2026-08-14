import React from "react";
import { useNavigate } from "react-router";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          NAVBAR
      ========================== */}

      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-red-700 bg-red-600 px-5 py-4 text-white shadow-lg md:px-10 lg:px-20">

        {/* Logo */}

        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl shadow-md">
            🛍️
          </div>

          <div className="text-left">
            <h1 className="text-lg font-black md:text-2xl">
              ShopEase
            </h1>

            <p className="text-xs font-medium text-red-100">
              ADMIN PANEL
            </p>
          </div>
        </button>

        {/* Home Button */}

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-md transition-all duration-200 hover:bg-red-50 hover:shadow-lg md:px-5 md:py-2.5"
        >
          🏠
          <span className="hidden sm:block">
            Visit Store
          </span>
        </button>

      </nav>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:px-10">

        {/* Header */}

        <div className="mb-10">

          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-600"></span>

            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Admin Dashboard
            </p>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            Welcome back, Admin 👋
          </h2>

          <p className="mt-3 max-w-2xl text-gray-500">
            Manage your ShopEase store, products and inventory
            from one place.
          </p>

        </div>


        {/* =========================
            QUICK STATS
        ========================== */}

        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Products */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Product Management
                </p>

                <h3 className="mt-2 text-2xl font-black text-gray-900">
                  Products
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                📦
              </div>

            </div>

            <button
              onClick={() => navigate("/admin/products")}
              className="mt-5 text-sm font-bold text-red-600 hover:text-red-700"
            >
              View Products →
            </button>

          </div>


          {/* Add Product */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Store Management
                </p>

                <h3 className="mt-2 text-2xl font-black text-gray-900">
                  Add Product
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                ➕
              </div>

            </div>

            <button
              onClick={() => navigate("/admin/add-product")}
              className="mt-5 text-sm font-bold text-red-600 hover:text-red-700"
            >
              Add New Product →
            </button>

          </div>


          {/* Store */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Customer Store
                </p>

                <h3 className="mt-2 text-2xl font-black text-gray-900">
                  ShopEase
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                🛒
              </div>

            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-5 text-sm font-bold text-red-600 hover:text-red-700"
            >
              Open Store →
            </button>

          </div>

        </div>


        {/* =========================
            MANAGEMENT SECTION
        ========================== */}

        <div className="mb-5">

          <h3 className="text-2xl font-black text-gray-900">
            Quick Actions
          </h3>

          <p className="mt-1 text-gray-500">
            Quickly access your most important admin tools.
          </p>

        </div>


        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* =========================
              ADD PRODUCT
          ========================== */}

          <div
            onClick={() => navigate("/admin/add-product")}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-2xl"
          >

            <div className="h-2 bg-red-600"></div>

            <div className="p-7">

              <div className="mb-6 flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl transition group-hover:scale-110">
                  ➕
                </div>

                <span className="text-2xl text-gray-300 transition group-hover:translate-x-1 group-hover:text-red-500">
                  →
                </span>

              </div>

              <h4 className="text-2xl font-black text-gray-900">
                Add Product
              </h4>

              <p className="mt-3 leading-6 text-gray-500">
                Add a new product to your ShopEase store with
                price, stock, category and image information.
              </p>

              <div className="mt-6 inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition group-hover:bg-red-700">
                Add New Product
              </div>

            </div>

          </div>


          {/* =========================
              PRODUCTS
          ========================== */}

          <div
            onClick={() => navigate("/admin/products")}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-2xl"
          >

            <div className="h-2 bg-red-600"></div>

            <div className="p-7">

              <div className="mb-6 flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl transition group-hover:scale-110">
                  📦
                </div>

                <span className="text-2xl text-gray-300 transition group-hover:translate-x-1 group-hover:text-red-500">
                  →
                </span>

              </div>

              <h4 className="text-2xl font-black text-gray-900">
                Manage Products
              </h4>

              <p className="mt-3 leading-6 text-gray-500">
                View all your products and edit, update or
                delete products from your store.
              </p>

              <div className="mt-6 inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition group-hover:bg-red-700">
                View Products
              </div>

            </div>

          </div>


          {/* =========================
              STORE
          ========================== */}

          <div
            onClick={() => navigate("/")}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-2xl"
          >

            <div className="h-2 bg-red-600"></div>

            <div className="p-7">

              <div className="mb-6 flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl transition group-hover:scale-110">
                  🛒
                </div>

                <span className="text-2xl text-gray-300 transition group-hover:translate-x-1 group-hover:text-red-500">
                  →
                </span>

              </div>

              <h4 className="text-2xl font-black text-gray-900">
                Visit Store
              </h4>

              <p className="mt-3 leading-6 text-gray-500">
                Open the customer store and see how your
                products appear to customers.
              </p>

              <div className="mt-6 inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition group-hover:bg-red-700">
                Open Store
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            INFO BANNER
        ========================== */}

        <div className="mt-10 overflow-hidden rounded-3xl bg-red-600 p-7 text-white shadow-xl md:p-10">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-red-200">
                ShopEase Admin
              </p>

              <h3 className="mt-2 text-2xl font-black md:text-3xl">
                Keep your store up to date 🚀
              </h3>

              <p className="mt-2 max-w-xl text-red-100">
                Add new products, manage your inventory and
                keep your customer store looking fresh.
              </p>

            </div>

            <button
              onClick={() => navigate("/admin/add-product")}
              className="whitespace-nowrap rounded-xl bg-white px-6 py-3 font-bold text-red-600 shadow-md transition hover:bg-red-50 hover:shadow-lg"
            >
              + Add Product
            </button>

          </div>

        </div>

      </main>


      {/* =========================
          FOOTER
      ========================== */}

      <footer className="mt-10 border-t border-gray-200 bg-white px-5 py-6 text-center">

        <p className="text-sm font-medium text-gray-500">
          © 2026{" "}
          <span className="font-bold text-red-600">
            ShopEase
          </span>
          . Admin Panel.
        </p>

      </footer>

    </div>
  );
};

export default AdminPage;