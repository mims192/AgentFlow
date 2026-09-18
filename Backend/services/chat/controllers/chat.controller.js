import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const conversation = await Conversation.create({
            userId: userId
        })
        return res.status(200).json(conversation)
    }
    catch (err) {
        return res.status(500).json({ message: `error creating conversation ${err}` })
    }
}


export const getConversations = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const conversations = await Conversation.find({
            userId: userId
        }).sort({ updatedAt: -1 })
        return res.status(200).json(conversations)
    }
    catch (err) {
        return res.status(500).json({ message: `error creating conversation ${err}` })
    }
}

export const updateConversation = async (req, res) => {
    try {
        const {id,title}=req.body;
        const conversation = await Conversation.findByIdAndUpdate(id,{title})
        return res.status(200).json(conversation)
    }
    catch (err) {
        return res.status(500).json({ message: `error updating conversation ${err}` })
    }
}


export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content,images } = req.body;
        const message = await Message.create({
            conversationId,
            role,
            content,
            images
        })
        return res.status(200).json(message)
    }
    catch (err) {
        return res.status(500).json({ message: `save msg error ${err}` })
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId:req.params.conversationId
        })
        return res.status(200).json(messages)
    }
    catch (err) {
        return res.status(500).json({ message: `get msg error ${err}` })
    }
}
