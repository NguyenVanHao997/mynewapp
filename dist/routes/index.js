"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProducts = exports.routerUser = exports.routerAuth = void 0;
const auth_route_1 = __importDefault(require("./auth.route"));
exports.routerAuth = auth_route_1.default;
const products_route_1 = __importDefault(require("./products.route"));
exports.routerProducts = products_route_1.default;
const user_route_1 = __importDefault(require("./user.route"));
exports.routerUser = user_route_1.default;
