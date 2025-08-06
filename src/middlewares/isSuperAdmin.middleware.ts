import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../models";

export const isSuperAdmin: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const tokenUserEmail = req.user?.email;
  const tokenUserRole = req.user?.role;
  const targetEmail = req.params?.email;

  if (!tokenUserEmail || !targetEmail) {
    return res.status(401).json({ message: "Không xác thực được người dùng" });
  }

  if (tokenUserRole !== "SUPER_ADMIN" && tokenUserEmail !== targetEmail) {
    return res
      .status(403)
      .json({ message: "Bạn không có quyền truy cập thông tin người khác" });
  }

  next();
};
