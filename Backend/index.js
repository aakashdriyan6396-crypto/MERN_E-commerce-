import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import connectDB from "./config/db.js";
import UserRouter from "./routes/user.route.js";
import ProductRouter from "./routes/products.route.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();
const port = process.env.PORT || 7778;
app.use(cors());
//app.use(express.json())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',UserRouter)

app.use('/api/products',ProductRouter)


connectDB();
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
