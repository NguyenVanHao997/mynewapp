import { User } from "../../models";

export const updateUserRoleService = async (email: string, role: string) => {
  const user = await User.findOneAndUpdate({ email }, { role }, { new: true });

  if (!user) {
    throw new Error("Không tìm thấy người dùng");
  }

  return user;
};
