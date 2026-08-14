// config/db.js

import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected Successfully");
  } catch (error) {
    console.log("MongoDB Error : ", error);
  }
};

//models/Product.js

import mongoose from "mongoose";
import Product from "./models/Product";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);

// controllers/productController.js

const createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category, image } = req.body;
    if (!allFilled) {
      res.status(404).json({
        success: false,
        message: "All fields required",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product Created SuccessFully",
      product,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { allFilled } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, {
      allFilled,
    });
    res.json({ success: true, message: "Product Updated", product });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  const product = await Product.find();
  res.json(product);
};

//routes/productRoutes.js

import express from 'express'

import {
  updateProduct,
  createProduct,
  deleteProduct,
  getProducts,
} from "./controllers/productController";
const router=express.Router()

router.get('/',getProducts)
router.put('/update/:id',updateProduct)
router.delete('delete/:id',deleteProduct)
router.post('/add',createProduct)

export default router

//server.js

import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import dns from "dns"

dns.setServers(["1.1.1.1","8.8.8.8"])
dotenv.config();

const app=express();
const port=process.env.PORT || 4002

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)

connectDB()
app.listen(port,()=>{
  console.log("Server Is Running On Port :",port);  
})

