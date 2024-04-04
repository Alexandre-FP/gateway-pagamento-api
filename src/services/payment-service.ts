import { Customer, Order, OrderStatus } from "@prisma/client";
import { PaymentData } from "../interfaces/payment-data";
import { api } from "../lib/api";

export class PaymentService {
  async process(order: Order, customer: Customer, payment: PaymentData): Promise<{transactionId: string, status: OrderStatus }> {
    try {

      const customerId = await this.creatCustomer(customer)

      const transaction = await this.createTransaction(String(customerId), order, customer, payment)

      return {
        transactionId: transaction.transactionId,
        status: OrderStatus.PAID 
      }
    } catch (error) {
      console.error("error payment:", JSON.stringify(error, null, 2))
      return {
        transactionId: "",
        status: OrderStatus.CANCELED
      }
    }
  }

  private async creatCustomer(customer: Customer): Promise<Customer> {
    const customerResponse = await api.get(`/customers?email=${customer.email}`)

    if (customerResponse.data?.data?.length > 0) {
      return customerResponse.data?.data[0]?.id
    }

    const customerParams = {
      name: customer.fullName,
      email: customer.email,
      mobilePhone: customer.mobile,
      cpfCnpj: customer.document,
      postalCode: customer.zipCode,
      address: customer.street,
      addressNumber: customer.number,
      complement: customer.complement,
      province: customer.neighborhood,
      notificationDisabled: true, 
    }

    const res = await api.post("/customers", customerParams)

    return res.data?.id
  }

  private async createTransaction(customerId: string, order: Order, customer: Customer, payment: PaymentData): Promise<{ transactionId: string, gatewayStatus: string }> {
    const paymentParams = {
      customer: customerId,
      billingType: "CREDIT_CARD", 
      dueDate: new Date().toISOString(),
      value: order.total,
      description: `Pedido #${order.id}`,
      externalReference: order.id.toString(),
      creditCard: {
        holderName: payment.creditCardHolder,
        number: payment.creditCardNumber,
        expiryMonth: payment.creditCardExpiration?.split("/")[0],
        expiryYear: payment.creditCardExpiration?.split("/")[1],
        ccv: payment.creditCardSecurityCode,
      },
      creditCardHolderInfo: { 
        name: customer.fullName,
        email: customer.email,
        cpfCnpj: customer.document,
        postalCode: customer.zipCode,
        addressNumber: customer.number,
        addressComplement: customer.complement,
        mobilePhone: customer.mobile,
      },
    }

    const response = await api.post("/payments", paymentParams)

    console.log(paymentParams)

    return {
      transactionId: response.data?.id,
      gatewayStatus: response.data?.status,
    }
  }
}