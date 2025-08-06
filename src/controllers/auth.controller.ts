// controllers/auth.controller.ts
import * as yup from "yup";
import { loginUser, logoutUser, registerUser } from "../services/auth";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { registerSchema } from "../validators";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerUser({ name, email, password });

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res
      .status(201)
      .json({ message: "Đăng ký thành công", token: result.token });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        errors: error.inner.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    console.error("Lỗi đăng ký:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

export const login = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }

    return res.json({ token: result.token });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    next(error);
    // return res.status(500).json({ message: "Lỗi server" });
  }
};
export const logout: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(400);

    const token = authHeader.split(" ")[1];

    await logoutUser(token);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Lỗi logout:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
