import { Request, Response } from "express"
import { CustomerData } from "../../interfaces/customer-data"
import { PaymentData } from "../../interfaces/payment-data"
import { ProductData } from "../../interfaces/product-data"
import { CheckoutService } from "../../services/checkout-services"

interface CheckoutRequest extends Request {
  body: {
    products: ProductData[]
    customer: CustomerData 
    payment: PaymentData
  }
}

export class CheckoutController {
  async checkout(req: CheckoutRequest, res: Response) {  
    const { products, customer, payment } = req.body
  
    const checkoutService = new CheckoutService()  
  
    const orderCreated = await checkoutService.process(products, customer, payment)
  
    return res.send(orderCreated)  
  }
}