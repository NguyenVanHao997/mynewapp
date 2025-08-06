// middlewares/clearUserCache.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import redisClient from "../redisClient";

export const clearUserCache: RequestHandler = async (req, res, next) => {
  try {
    const keys = await redisClient.keys("users:page:*");
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log("🧹 Cleared user cache");
    }
  } catch (error) {
    console.error("❌ Failed to clear user cache:", error);
  }
  next();
};
