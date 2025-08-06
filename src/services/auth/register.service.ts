import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRepository } from "../../Repository/userRepository";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterDTO): Promise<{
  success: boolean;
  message?: string;
  token?: string;
}> => {
  const existing = await UserRepository.findByEmail(email);
  if (existing) {
    return { success: false, message: "Email đã tồn tại" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserRepository.createUser({
    name,
    email,
    password: hashedPassword,
    role: "CUSTOMER",
  });
  const token = jwt.sign(
    {
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "1d" }
  );
  return { success: true, token };
};
