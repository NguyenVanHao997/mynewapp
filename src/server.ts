// src/server.ts
import express from "express";
import path from "path";
import connectDB from "./config/db";
import cors from "cors";
import helmet from "helmet";

// Middlewares
import { routerAuth, routerProducts, routerUser } from "./routes";
import { authMiddleware, errorHandler, redisRateLimiter } from "./middlewares";
import { connectRedis } from "./redisClient";
import { authRateLimiter } from "./middlewares/redisRateLimiter.middleware";

// Routers

const app = express();
const port = process.env.PORT;

// ---------------------------
// 1. Kết nối MongoDB
// ---------------------------
connectDB();

// ---------------------------
// 2. Middleware cơ bản
// ---------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: ["https://your-frontend.com"], // hoặc origin: true nếu dynamic
//     credentials: true, // nếu dùng cookie / token
//   })
// );

// app.use(helmet());

// ---------------------------
// 3. Static public folder (upload ảnh)
// ---------------------------
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/uploads", express.static("uploads"));

// Nếu bị lỗi không tìm thấy file => kiểm tra lại đường dẫn thật sự sau khi build

// ---------------------------
// 4. Route public (auth không cần login)
// ---------------------------
app.use("/api/auth", authRateLimiter, routerAuth);

// ---------------------------
// 5. Middleware xác thực
// ---------------------------
app.use(authMiddleware);

// ---------------------------
// 6. Route cần đăng nhập
// ---------------------------
app.use("/api/users", redisRateLimiter, routerUser);

// Route cho product
app.use("/api/products", redisRateLimiter, routerProducts);

// ---------------------------
// 7. Route kiểm tra server
// ---------------------------
app.get("/", (_req, res) => {
  res.send("Hello from Express + MongoDB!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy route" });
});

// ---------------------------
// 8. Middleware xử lý lỗi cuối cùng
// ---------------------------
app.use(errorHandler);

connectRedis();

// ---------------------------
// 9. Khởi động server
// ---------------------------
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
