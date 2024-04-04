import { Request, Response } from "express"
import { prisma } from "../../lib/prisma"

export class ProductController {
  async getProduct(req: Request, res: Response) {
    const getProduct = await prisma.product.findMany({})
  
    return res.status(200).json({ content: getProduct })
  }
}


