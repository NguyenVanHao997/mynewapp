import rateLimit from "express-rate-limit";

// Apply to all requests
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Tối đa 100 request mỗi 15 phút
  message: {
    success: false,
    message: "Bạn đã gửi quá nhiều request. Vui lòng thử lại sau.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
