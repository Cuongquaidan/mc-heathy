import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        chatId: String,
        senderId: String,
        text: String,
    },
    {
        timestamp: true,
    }
);
const MessageModel =
    mongoose.models.Massage || mongoose.model("Massage", messageSchema);
export default MessageModel;
