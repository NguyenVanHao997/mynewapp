import { Router } from "express";
import { getAllProducts, getProductByCategory } from "../controllers";

const routerProducts = Router();

routerProducts.get("/", getAllProducts);
routerProducts.get("/category", getProductByCategory);

export default routerProducts;
