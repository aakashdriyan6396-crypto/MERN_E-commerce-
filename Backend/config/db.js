import mongoose  from "mongoose";

const connectDB=async()=>{
try {
   await mongoose.connect(process.env.MONGO_URL)
      console.log("MONGODB connected successfully");
} catch (error) {
  console.log("Error Connecting to MongoDB",error);
  
}
}
export default connectDB;