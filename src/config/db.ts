// src/config/db.ts
import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       process.env.MONGO_URI ||
//         "mongodb://mongo:mnQObcoYGHaLmYJmLuKoAOsbNLhwJedd@mongodb.railway.internal:27017"
//     );
//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1);
//   }
// };
const connectDB = async () => {
  const mongoURI =
    process.env.MONGO_URI ||
    "mongodb://mongo:mnQObcoYGHaLmYJmLuKoAOsbNLhwJedd@mongodb.railway.internal:27017/your-db-name";

  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
