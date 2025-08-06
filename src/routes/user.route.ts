import express from "express";
import { clearUserCache, isSuperAdmin, upload } from "../middlewares";
import {
  getAllUsers,
  getUserProfile,
  searchUsers,
  updateInfoByEmail,
  updateUserName,
  uploadUserAvatar,
} from "../controllers";
import { updateUserRole } from "../controllers/user.controller";

const routerUser = express.Router();

routerUser.get("/", getAllUsers);
routerUser.put("/update-name", clearUserCache, updateUserName);
routerUser.get("/search", searchUsers);
routerUser.post(
  "/avatar",
  upload.single("avatar"),
  clearUserCache,
  uploadUserAvatar
);
routerUser.get("/profile/:email", getUserProfile);
routerUser.put("/infos/:email", clearUserCache, updateInfoByEmail);
routerUser.patch("/role/:email", isSuperAdmin, clearUserCache, updateUserRole);

export default routerUser;
