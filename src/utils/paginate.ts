// utils/paginate.ts

import { Model, FilterQuery } from "mongoose";

interface PaginateOptions {
  page?: number;
  limit?: number;
  filter?: any;
  sort?: any;
  query?: any;
}

export const paginate = async <T>(
  model: Model<T>,
  { page = 1, limit = 5, filter = {}, sort = {}, query = {} }: PaginateOptions
) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.find(filter).skip(skip).limit(limit),
    model.countDocuments(filter),
  ]);

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};
