import { User } from "../models";

export const searchUsersQuery = (keyword: string, sort: string) => {
  const filter = {
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  };

  const sortObj: Record<string, number> = {};
  if (sort.startsWith("-")) {
    sortObj[sort.slice(1)] = -1;
  } else {
    sortObj[sort] = 1;
  }

  return { filter, sortObj };
};

export const UserRepository = {
  findByEmail: async (email: string) => {
    return await User.findOne({ email });
  },

  createUser: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    return await User.create(userData);
  },
};
