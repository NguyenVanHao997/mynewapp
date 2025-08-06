// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "../utils/tokenBlacklist";

const secret = process.env.JWT_SECRET || "your_secret_key";
const REFRESH_TOKEN_SECRET = "your_refresh_secret";

const authMiddleware: RequestHandler = async (req, res, next) => {
  const publicPaths = ["/api/auth/login", "/api/auth/register"];
  if (publicPaths.includes(req.path) || req.path.startsWith("/uploads")) {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ") || !token) {
    return res
      .status(401)
      .json({ message: "Không có token hoặc sai định dạng" });
  }

  if (await isTokenBlacklisted(token)) {
    return res.status(401).json({ message: "Token has been revoked" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

export default authMiddleware;
