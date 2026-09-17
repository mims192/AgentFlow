import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/auth.routes.js";
import cors from "cors";
dotenv.config();

const port=process.env.PORT || 3000;

const app=express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json());
app.use("/",router)
app.get("/",(req,res)=>{
    res.send("Hello from Auth");
})

app.listen(port,()=>{
    console.log(`AUth is running on port ${port}`);
    connectDb();
})

