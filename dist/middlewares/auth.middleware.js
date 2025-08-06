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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenBlacklist_1 = require("../utils/tokenBlacklist");
const secret = process.env.JWT_SECRET || "your_secret_key";
const REFRESH_TOKEN_SECRET = "your_refresh_secret";
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const publicPaths = ["/api/auth/login", "/api/auth/register"];
    if (publicPaths.includes(req.path) || req.path.startsWith("/uploads")) {
        return next();
    }
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!authHeader || !authHeader.startsWith("Bearer ") || !token) {
        return res
            .status(401)
            .json({ message: "Không có token hoặc sai định dạng" });
    }
    if (yield (0, tokenBlacklist_1.isTokenBlacklisted)(token)) {
        return res.status(401).json({ message: "Token has been revoked" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res
            .status(403)
            .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
});
exports.default = authMiddleware;
