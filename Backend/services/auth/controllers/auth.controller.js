import { getAuth } from "firebase-admin/auth";
import {app} from "../config/firebase.js";
import User from "../model/user.model.js";
import redis from "../../../shared/redis.js";
import crypto from "crypto";
export const login=async(req,res)=>{
    try{
        const {token}=req.body;
        const decoded=await getAuth(app).verifyIdToken(token)
        let user=await User.findOne({
            firebaseUid:decoded.uid
        })
        if(!user){
            user=await User.create({
                firebaseUid:decoded.uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture
            })
        }
        const sessionId=crypto.randomUUID()
        await redis.set(`session:${sessionId}`,JSON.stringify   //key, data store as string, options
        ({ 
            userId:user._id,
            email:user.email,
            name:user.name,
            avatar:user.avatar
        }),
        
            "EX",60*60*24*7
        )

        res.cookie("session",sessionId,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:1000*60*60*24*7
        })
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(500).json({
            message:`login failed ${err.message}`,
            
        })
    }
}

export const logout=async(req,res)=>{
    try{
        const sessionId=req.cookies.session;
        await redis.del(`session:${sessionId}`);

        res.clearCookie("session");
        return res.status(200).json({
            message:"logout successful"
        })
    }
    catch(err){
        return res.status(500).json({
            message:`logout failed ${err.message}`,
        })
    }
}