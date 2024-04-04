import express, { Express, json } from "express"
import { product, order, checkout } from "./routes/index"

export const app: Express = express()

app.use(json())

app.use("/api/product", product)
app.use("/api/order/", order)
app.use("/api/checkout", checkout) 