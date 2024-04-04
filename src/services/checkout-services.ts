import { ProductData } from "../interfaces/product-data";
import { CustomerData } from "../interfaces/customer-data";
import { PaymentData } from "../interfaces/payment-data";
import { Customer, Order, PrismaClient } from "@prisma/client";
import { PaymentService } from "./payment-service";

export class CheckoutService { // puxa os dados de produtos do bd -> registrar os dados do client no bd -> criar uma ordem -> processar o pagamento
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async process(products: ProductData[], customer: CustomerData, payment: PaymentData): Promise<{ id: string, transactionId: string, status: string }> {
    const product = await this.prisma.product.findMany({
      where: {
        id: {
          in: products.map((product) => product.id)
        }
      }
    }) 

    const productInOrderItem = product.map<ProductData>((product) => ({
      ...product,
      price: Number(product.price),
      quantity: products.find((item) => item.id === product.id)?.quantity!,
      subTotal: products.find((item) => item.id === product.id)?.quantity! * Number(product.price),
    }))

    const customerCreated = await this.createCustomer(customer)

    let orderCreated = await this.creatOrder(productInOrderItem, customerCreated)

    const { transactionId, status } = await new PaymentService().process(orderCreated, customerCreated, payment)

    orderCreated = await this.prisma.order.update({
      where: { id: orderCreated.id },
      data: {
        transactionId,
        status,
      }
    })
 
    console.log(orderCreated)

    return {
      id: orderCreated.id,
      transactionId: orderCreated.transactionId!,
      status: orderCreated.status
    }

  }

  private async createCustomer(customer: CustomerData): Promise<Customer> {
    const customerCreated = await this.prisma.customer.upsert({
      where: { email: customer.email },
      update: customer,
      create: customer
    })

    return customerCreated
  }

  private async creatOrder(productInOrderItem: ProductData[], customer: Customer): Promise<Order> {
    const total = productInOrderItem.reduce((acc, product) => acc + product.subTotal, 0)

    const orderCreated = await this.prisma.order.create({
      data: {
        total,
        customer: {
          connect: { id: customer.id }
        },
        orderItems: {
          createMany: {
            data: productInOrderItem.map((products) => ({
              productId: products.id,
              quantity: products.quantity,
              subTotal: products.subTotal
            }))
          }
        }
      },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true
          }
        }
      }
    })

    return orderCreated
  }
} 