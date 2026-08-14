import express from "express";
import {
  addProducts,
  updateProducts,
  getProducts,
  deleteProducts,
  getProductById
} from "../controllers/products.controller.js";

const ProductRouter = express.Router();

ProductRouter.post("/add-products", addProducts);
ProductRouter.put("/update-product/:id", updateProducts);
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id",getProductById)
ProductRouter.delete("/delete-product/:id", deleteProducts);

export default ProductRouter;
