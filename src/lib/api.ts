import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

export const api = axios.create({
  baseURL: process.env.ASSAS_API_URL,
  headers: {
    access_token: process.env.ASSAS_API_ACCESS_TOKEN
  }
})