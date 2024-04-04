import { app } from "./app";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3001 
app.listen({
  port: PORT
}, () => console.log(`Servidor rodando na porta ${PORT}`)) 