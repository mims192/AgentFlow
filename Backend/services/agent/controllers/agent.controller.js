import axios from "axios";
import { graph } from "../graph/graph.js";

export const agent=async(req,res)=>{
    try{
        const {prompt,conversationId}=req.body;
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:"user",content:prompt
        })
        const result=await graph.invoke({
            prompt,conversationId
        })
        const response=result.aiResponse
            await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:"assistant",content:response
        })
        return res.status(200).json(response)
    }
  catch (err) {
    console.error("Agent Error:", err.response?.data || err.message);

    return res.status(500).json({
        message: "Agent Error",
        error: err.response?.data || err.message
    });
}
}