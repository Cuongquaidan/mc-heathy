import MessageModel from "../models/Message.model.js";
import connect from "../database/conn.js";
// create message
export async function createMessage(req, res) {
    const { chatId, senderId, text } = req.body;
    await connect();
    try {
        const message = new MessageModel({
            chatId,
            senderId,
            text,
        });
        const response = await message.save();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// getMessages

export async function getMessages(req, res) {
    const { chatId } = req.params;
    await connect();
    try {
        const messages = await MessageModel.find({ chatId });

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json(error);
    }
}
