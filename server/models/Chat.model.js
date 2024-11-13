import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true,
    }
);

const ChatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default ChatModel;
