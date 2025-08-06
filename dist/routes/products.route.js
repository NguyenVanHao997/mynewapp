"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const routerProducts = (0, express_1.Router)();
routerProducts.get("/", controllers_1.getAllProducts);
routerProducts.get("/category", controllers_1.getProductByCategory);
exports.default = routerProducts;
