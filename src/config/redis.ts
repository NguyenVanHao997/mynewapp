// src/config/redis.ts
import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => console.error("Redis Client Error", err));

const connectRedis = async () => {
  await redisClient.connect();
};

connectRedis();

export default redisClient;
