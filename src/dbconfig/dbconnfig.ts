import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Function to connect to MongoDB
export const Database = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/Nextoperation", {
    } as mongoose.ConnectOptions);

    console.log("🚀 Database connected successfully.");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Database connection error:", err.message);
    } else {
      console.error("❌ Unknown database connection error:", err);
    }
  }
};
