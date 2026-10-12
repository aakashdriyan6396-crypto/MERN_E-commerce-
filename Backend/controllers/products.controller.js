import mongoose from "mongoose";
import Product from "../models/Product.js";

// Get single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("Get Product By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};




export const getProducts = async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 5)
    );

    const search = String(req.query.search || "").trim();

    const filter = {};

    if (search) {
      const escapedSearch = search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const regex = new RegExp(escapedSearch, "i");

      filter.$or = [
        { title: regex },
        { name: regex },
        { description: regex },
        { category: regex },
        { brand: regex },
      ];
    }

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const safePage = totalPages > 0 ? Math.min(page, totalPages) : 1;

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      products,
      pagination: {
        currentPage: safePage,
        totalPages,
        totalProducts,
        limit,
      },
    });
  } catch (error) {
    console.error("Get products error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const addProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    message: error.message;
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      price,
      category,
      stock,
      image,
    } = req.body;

    // Validate product ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
      });
    }

    if (price === undefined || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid price",
      });
    }

    if (stock === undefined || Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid stock",
      });
    }

    // Find and update product
    const product = await Product.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description?.trim() || "",
        price: Number(price),
        category,
        stock: Number(stock),
        image: image?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Product doesn't exist
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Product updated:", product);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting product:", id);

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
