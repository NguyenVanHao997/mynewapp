"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const user_controller_1 = require("../controllers/user.controller");
const routerUser = express_1.default.Router();
routerUser.get("/", controllers_1.getAllUsers);
routerUser.put("/update-name", middlewares_1.clearUserCache, controllers_1.updateUserName);
routerUser.get("/search", controllers_1.searchUsers);
routerUser.post("/avatar", middlewares_1.upload.single("avatar"), middlewares_1.clearUserCache, controllers_1.uploadUserAvatar);
routerUser.get("/profile/:email", controllers_1.getUserProfile);
routerUser.put("/infos/:email", middlewares_1.clearUserCache, controllers_1.updateInfoByEmail);
routerUser.patch("/role/:email", middlewares_1.isSuperAdmin, middlewares_1.clearUserCache, user_controller_1.updateUserRole);
exports.default = routerUser;
