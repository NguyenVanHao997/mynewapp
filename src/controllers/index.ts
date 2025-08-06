import { login, register } from "./auth.controller";
import { getAllProducts, getProductByCategory } from "./product.controller";
import {
  getAllUsers,
  getUserProfile,
  searchUsers,
  updateInfoByEmail,
  updateUserName,
  uploadUserAvatar,
} from "./user.controller";

export {
  getAllUsers,
  updateUserName,
  uploadUserAvatar,
  searchUsers,
  register,
  login,
  getUserProfile,
  updateInfoByEmail,
  getAllProducts,
  getProductByCategory,
};
