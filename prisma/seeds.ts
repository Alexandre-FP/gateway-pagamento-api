import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const products = [
  {
    product: "Energia Solar",
    name: "Basic",
    description:
      "basico da energia solar.",
    price: 8000,
    image: "https://imgur.com/a/pE4BxPR",
  },
  {
    product: "Energia Solar",
    name: "Médio",
    description:
      "médio da energia solar.",
    price: 9000,
    image: "https://imgur.com/a/pE4BxPR",
  },
  {
    product: "Energia Solar",
    name: "High End",
    description:
      "alto sofisticado energia solar.",
    price: 10000,
    image: "https://imgur.com/a/pE4BxPR",
  },
]

async function main() {
  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
