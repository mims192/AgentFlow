import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import  getCurrentUser  from "./controllers/user.controller.js";
import protect from "./middleware/auth.middleware.js";
import { proxywithHeaders } from "./utils/proxywithHeaders.js";
import morgan from "morgan";
dotenv.config();

const port=process.env.PORT || 3000;

const app=express();
app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use("/api/auth",proxy(process.env.AUTH_SERVICE_URL));
app.use("/api/chat",protect,proxywithHeaders(process.env.CHAT_SERVICE_URL));
app.use("/api/agent",protect,proxywithHeaders(process.env.AGENT_SERVICE_URL));

app.get("/api/current-user", protect, getCurrentUser);
app.get("/",(req,res)=>{
    res.send("Hello from Gateway");
})

app.listen(port,()=>{
    console.log(`Gateway is running on port ${port}`);
})

