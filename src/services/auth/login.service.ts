import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../Repository/userRepository";

export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; token?: string; message?: string }> => {
  const user = await UserRepository.findByEmail(email);

  if (!user) {
    return { success: false, message: "Sai email hoặc mật khẩu" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: "Sai email hoặc mật khẩu" };
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "1d" }
  );

  return { success: true, token };
};
