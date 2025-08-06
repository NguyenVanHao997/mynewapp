"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRateLimiter = exports.redisRateLimiter = void 0;
const redisClient_1 = __importDefault(require("../redisClient"));
const RATE_LIMITS = {
    CUSTOMER: 100,
    ADMIN: 1000,
    SUPER_ADMIN: 10000,
};
const WINDOW_SECONDS = 60 * 15;
const LOGIN_LIMIT = 10; // 10 requests
const LOGIN_WINDOW = 60 * 10; // 10 phút
const redisRateLimiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Ưu tiên userId từ JWT (đã xác thực), fallback dùng IP
        const user = req.user;
        const role = (user === null || user === void 0 ? void 0 : user.role) || "CUSTOMER";
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || req.ip;
        const key = `rate_limit:${userId}`;
        const maxRequests = RATE_LIMITS[role] || RATE_LIMITS.CUSTOMER;
        const requests = yield redisClient_1.default.incr(key);
        if (requests === 1) {
            yield redisClient_1.default.expire(key, WINDOW_SECONDS);
        }
        if (requests > maxRequests) {
            return res.status(429).json({
                message: `Bạn đã gửi quá nhiều yêu cầu. Giới hạn cho vai trò ${role}: ${maxRequests} request mỗi 15 phút.`,
            });
        }
        next();
    }
    catch (error) {
        console.error("Rate limiter error:", error);
        // Trong trường hợp Redis bị lỗi, vẫn cho phép request (fail-open)
        next();
    }
});
exports.redisRateLimiter = redisRateLimiter;
const authRateLimiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ip = req.ip;
        const key = `auth_rate_limit:${ip}`;
        const attempts = yield redisClient_1.default.incr(key);
        if (attempts === 1) {
            yield redisClient_1.default.expire(key, LOGIN_WINDOW);
        }
        if (attempts > LOGIN_LIMIT) {
            return res.status(429).json({
                message: "Bạn đã thử đăng nhập/quá nhiều lần. Vui lòng thử lại sau.",
            });
        }
        next();
    }
    catch (err) {
        console.error("Auth rate limiter error:", err);
        next(); // fail-open nếu Redis lỗi
    }
});
exports.authRateLimiter = authRateLimiter;
