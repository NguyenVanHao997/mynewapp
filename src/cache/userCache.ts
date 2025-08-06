// src/cache/userCache.ts

import redisClient from "../redisClient";

const buildSearchUserKey = (
  keyword: string,
  page: string,
  limit: string,
  sort: string
) => {
  return `users:search:${keyword}:page:${page}:limit:${limit}:sort:${sort}`;
};

export const getCachedSearchUser = async (
  keyword: string,
  page: string,
  limit: string,
  sort: string
) => {
  const key = buildSearchUserKey(keyword, page, limit, sort);
  const cached = await redisClient.get(key);
  return cached ? JSON.parse(cached) : null;
};

export const setCachedSearchUser = async (
  keyword: string,
  page: string,
  limit: string,
  sort: string,
  data: any
) => {
  const key = buildSearchUserKey(keyword, page, limit, sort);
  await redisClient.set(key, JSON.stringify(data), { EX: 300 }); // TTL: 60s
};

export const clearSearchUserCache = async () => {
  const keys = await redisClient.keys("users:search:*");
  if (keys.length > 0) {
    await redisClient.del(keys);
    console.log("🧹 Search user cache cleared");
  }
};
