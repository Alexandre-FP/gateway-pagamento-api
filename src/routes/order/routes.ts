import { OrderController } from "./controller";
import { Router } from "express";

const orderController = new OrderController()
const route = Router()

route.get("/:id", orderController.orderById)

export default route