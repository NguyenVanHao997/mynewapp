// routes/auth.route.ts
import express, { NextFunction } from "express";
import { register } from "../controllers";
import { logout } from "../controllers/auth.controller";
import { clearUserCache, validate } from "../middlewares";
import { login } from "../controllers/auth.controller";
import { registerSchema } from "../validators";

const routerAuth = express.Router();

routerAuth.post(
  "/register",
  validate(registerSchema),
  clearUserCache,
  register
);
routerAuth.post("/login", login);
routerAuth.post("/logout", logout);

export default routerAuth;
