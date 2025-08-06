import { User } from "../../models";
import redisClient from "../../redisClient";
import { paginate } from "../../utils/paginate";

export const getAllUsersService = async (page: number, limit: number) => {
  const cacheKey = `users:page:${page}:limit:${limit}`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("⚡ From Redis");
    return JSON.parse(cachedData);
  }

  const result = await paginate(User, {
    page,
    limit,
  });

  await redisClient.set(cacheKey, JSON.stringify(result), { EX: 300 });

  return result;
};
