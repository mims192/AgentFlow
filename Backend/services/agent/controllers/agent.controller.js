import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessages } from "../config/memory.js";

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId, agent } = req.body;

        console.log("REQUEST:", {
            prompt,
            conversationId,
            agent
        });

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId,
            role: "user",
            content: prompt
        });

        console.log("BEFORE GRAPH");

        const result = await graph.invoke({
            prompt,
            conversationId,
            agent
        });

        console.log("GRAPH RESULT:", result);

        const response = result?.aiResponse;
        const images = result?.images || [];

        console.log("AI RESPONSE:", response);
        console.log("IMAGES:", images);

        if (!response) {
            throw new Error("Graph did not return aiResponse");
        }

        await addMessages(
            conversationId,
            "user",
            prompt
        );

        await addMessages(
            conversationId,
            "assistant",
            response
        );

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId,
            role: "assistant",
            content: response,
            images
        });

        return res.status(200).json({
            answer: response,
            images
        });

    } catch (err) {
        console.error("========== AGENT ERROR ==========");
        console.error("MESSAGE:", err.message);
        console.error("STACK:", err.stack);
        console.error("FULL ERROR:", err);
        console.error("=================================");

        return res.status(500).json({
            message: "Agent Error",
            error: err.message
        });
    }
};