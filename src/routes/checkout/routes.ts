import { CheckoutController } from "./controller";
import { Router } from "express";

const checkoutController = new CheckoutController()
const route = Router()

route.post("/", checkoutController.checkout)

export default route
