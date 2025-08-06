import { RequestHandler } from "express";
import redisClient from "../redisClient";

const RATE_LIMITS = {
  CUSTOMER: 100,
  ADMIN: 1000,
  SUPER_ADMIN: 10000,
};

type Role = keyof typeof RATE_LIMITS;

const WINDOW_SECONDS = 60 * 15;

const LOGIN_LIMIT = 10; // 10 requests
const LOGIN_WINDOW = 60 * 10; // 10 phút

export const redisRateLimiter: RequestHandler = async (req, res, next) => {
  try {
    // Ưu tiên userId từ JWT (đã xác thực), fallback dùng IP
    const user = (req as any).user;
    const role: Role = (user?.role as Role) || "CUSTOMER";
    const userId = (req as any).user?.id || req.ip;
    const key = `rate_limit:${userId}`;
    const maxRequests = RATE_LIMITS[role] || RATE_LIMITS.CUSTOMER;

    const requests = await redisClient.incr(key);

    if (requests === 1) {
      await redisClient.expire(key, WINDOW_SECONDS);
    }

    if (requests > maxRequests) {
      return res.status(429).json({
        message: `Bạn đã gửi quá nhiều yêu cầu. Giới hạn cho vai trò ${role}: ${maxRequests} request mỗi 15 phút.`,
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    // Trong trường hợp Redis bị lỗi, vẫn cho phép request (fail-open)
    next();
  }
};

export const authRateLimiter: RequestHandler = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `auth_rate_limit:${ip}`;

    const attempts = await redisClient.incr(key);

    if (attempts === 1) {
      await redisClient.expire(key, LOGIN_WINDOW);
    }

    if (attempts > LOGIN_LIMIT) {
      return res.status(429).json({
        message: "Bạn đã thử đăng nhập/quá nhiều lần. Vui lòng thử lại sau.",
      });
    }

    next();
  } catch (err) {
    console.error("Auth rate limiter error:", err);
    next(); // fail-open nếu Redis lỗi
  }
};
