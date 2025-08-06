"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Apply to all requests
exports.globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // Tối đa 100 request mỗi 15 phút
    message: {
        success: false,
        message: "Bạn đã gửi quá nhiều request. Vui lòng thử lại sau.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
