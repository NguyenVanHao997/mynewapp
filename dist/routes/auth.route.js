"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.route.ts
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_controller_1 = require("../controllers/auth.controller");
const middlewares_1 = require("../middlewares");
const auth_controller_2 = require("../controllers/auth.controller");
const validators_1 = require("../validators");
const routerAuth = express_1.default.Router();
routerAuth.post("/register", (0, middlewares_1.validate)(validators_1.registerSchema), middlewares_1.clearUserCache, controllers_1.register);
routerAuth.post("/login", auth_controller_2.login);
routerAuth.post("/logout", auth_controller_1.logout);
exports.default = routerAuth;
