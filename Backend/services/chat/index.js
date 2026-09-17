import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

import cors from "cors";
import router from "./routes/chat.routes.js";
dotenv.config();

const port=process.env.PORT ;

const app=express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json());
app.use('/',router)
app.get("/",(req,res)=>{
    res.send("Hello from Chat");
})

app.listen(port,()=>{
    console.log(`Chat is running on port ${port}`);
    connectDb();
})

