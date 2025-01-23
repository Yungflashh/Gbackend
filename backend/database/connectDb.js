import mongoose from "mongoose"
import dotenv from "dotenv";



dotenv.config();



export const connectDB = async () => {
    try {
     
      if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not defined in the environment");
      }
  
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("DB connected successfully");
    } catch (error) {
      console.error("DB connection failed", error.message);
      process.exit(1);
    }
  };

