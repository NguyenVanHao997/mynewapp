import { Info } from "../../interfaces";
import { User } from "../../models";

export const getUserProfileByEmail = async (email: string) => {
  const user = await User.findOne({ email }).select("-password");
  const info = await Info.findOne({ email });

  if (!user) return null;

  return {
    ...user.toObject(),
    info,
  };
};
