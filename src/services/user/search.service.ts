import {
  getCachedSearchUser,
  setCachedSearchUser,
} from "../../cache/userCache";
import { User } from "../../models";
import { searchUsersQuery } from "../../Repository/userRepository";
import { paginate } from "../../utils/paginate";

export const searchUsersService = async (
  keyword: string,
  page: string,
  limit: string,
  sort: string
) => {
  // ⚡️ Redis cache
  const cached = await getCachedSearchUser(keyword, page, limit, sort);
  if (cached) return cached;

  const { filter, sortObj } = searchUsersQuery(keyword, sort);

  const result = await paginate(User, {
    page: parseInt(page),
    limit: parseInt(limit),
    filter,
    query: filter,
    sort: sortObj,
  });

  await setCachedSearchUser(keyword, page, limit, sort, result);
  return result;
};
