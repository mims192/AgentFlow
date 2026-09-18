import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessages } from "../config/memory.js";

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId } = req.body;

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId, role: "user", content: prompt
        })
        const result = await graph.invoke({
            prompt,
            conversationId
        })
        console.log("GRAPH RESULT:", result);


        const response = result.aiResponse
        console.log("AI RESPONSE:", response);
        console.log("AI RESPONSE TYPE:", typeof response);

        await addMessages(conversationId, "user", prompt)

        await addMessages(conversationId, "assistant", response)

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId, role: "assistant", content: response
        })
        return res.status(200).json(response)
    }
    catch (err) {
        console.error("AGENT ERROR:", err);
        console.error("ERROR MESSAGE:", err.message);
        console.error("ERROR STACK:", err.stack);

        return res.status(500).json({
            message: "Agent Error",
            error: err.message
        });
    }

}