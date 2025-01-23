import express  from "express";
import {connectDB} from "./database/connectDb.js"
import dotenv from "dotenv"
import authRoutes from "./Router/authRoutes.js"
import adminRoutes from "./Router/adminRoutes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
// other import statement should go here

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: ['http://localhost:5173', 'https://giftpixel.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true, 
  };

app.use(cors(corsOptions))


connectDB()
const PORT = process.env.PORT || 5000

app.get("/", (req, res)=>{
    res.send("server is running")

})
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)

app.listen(PORT, console.log("our server is running", PORT))