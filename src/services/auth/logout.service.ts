import { blacklistToken } from "../../utils/tokenBlacklist";

export const logoutUser = async (token: string): Promise<void> => {
  await blacklistToken(token, 86400);
};
