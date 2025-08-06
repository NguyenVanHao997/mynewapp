import { User } from "../../models";

export const uploadUserAvatarService = async (
  email: string,
  imagePath: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Không tìm thấy user với email này");
  }

  user.avatarImg = imagePath;
  await user.save();

  return user;
};
