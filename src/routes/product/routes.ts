import { ProductController } from "./controller";
import { Router } from "express";

const productController = new ProductController()
const route = Router()

route.get("/", productController.getProduct)

export default route