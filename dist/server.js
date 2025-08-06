"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
// Middlewares
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const redisClient_1 = require("./redisClient");
const redisRateLimiter_middleware_1 = require("./middlewares/redisRateLimiter.middleware");
// Routers
const app = (0, express_1.default)();
const port = process.env.PORT;
// ---------------------------
// 1. Kết nối MongoDB
// ---------------------------
(0, db_1.default)();
// ---------------------------
// 2. Middleware cơ bản
// ---------------------------
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
app.use("/uploads", express_1.default.static("uploads"));
// Nếu bị lỗi không tìm thấy file => kiểm tra lại đường dẫn thật sự sau khi build
// ---------------------------
// 4. Route public (auth không cần login)
// ---------------------------
app.use("/api/auth", redisRateLimiter_middleware_1.authRateLimiter, routes_1.routerAuth);
// ---------------------------
// 5. Middleware xác thực
// ---------------------------
app.use(middlewares_1.authMiddleware);
// ---------------------------
// 6. Route cần đăng nhập
// ---------------------------
app.use("/api/users", middlewares_1.redisRateLimiter, routes_1.routerUser);
// Route cho product
app.use("/api/products", middlewares_1.redisRateLimiter, routes_1.routerProducts);
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
app.use(middlewares_1.errorHandler);
(0, redisClient_1.connectRedis)();
// ---------------------------
// 9. Khởi động server
// ---------------------------
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
