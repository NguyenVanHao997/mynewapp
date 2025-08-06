type PrismaModel = {
  findMany: Function;
  count: Function;
};

export const paginatePrisma = async (
  model: PrismaModel,
  {
    page = 1,
    limit = 5,
    where = {},
    include = {},
  }: {
    page?: number;
    limit?: number;
    where?: any;
    include?: any;
  }
) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({ where, skip, take: limit, include }),
    model.count({ where }),
  ]);

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};
