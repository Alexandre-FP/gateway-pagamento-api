import { Request, Response } from "express"
import { prisma } from "../../lib/prisma"

export class OrderController {
  async orderById(req: Request, res: Response) {
    const { params } = req
  
    const order = await prisma.order.findUnique({
      where: {
        id: String(params.id)
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
  
    if(!order){
      return res.status(404).json({ message: 'Recurso não encontrado' })
    }
  
    return res.status(200).json({ content: order })
  }
}