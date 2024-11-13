import connect from "../database/conn.js";
import ChatModel from "../models/Chat.model.js";
// create Chat
export async function createChat(req, res) {
    const { firstId, secondId } = req.body;
    await connect();
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [firstId, secondId] },
        });
        if (chat) return res.status(200).json(chat);

        const newChat = new ChatModel({
            members: [firstId, secondId],
        });
        const response = await newChat.save();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}
// findUserChats
export async function findUserChats(req, res) {
    const userId = req.params.userId;
    await connect();
    try {
        const chats = await ChatModel.find({
            members: { $in: [userId] },
        });
        return res.status(200).json(chats);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//find Chat
export async function findChat(req, res) {
    const { firstId, secondId } = req.params;
    await connect();
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [firstId, secondId] },
        });

        return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json(error);
    }
}
