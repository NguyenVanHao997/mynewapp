import { Info } from "../../interfaces";

interface UpdateInfoPayload {
  gender?: string;
  address?: string;
  birthday?: string;
}

export const updateUserInfoService = async (
  email: string,
  payload: UpdateInfoPayload
) => {
  const updatedInfo = await Info.findOneAndUpdate(
    { email },
    { $set: payload },
    { new: true, upsert: true, strict: true }
  );

  return updatedInfo;
};
