import mongoose, { Schema, Types } from "mongoose";

const TopicSchema = new Schema(
    {
        title: { type: String, required: true },
        thumb: { type: String, required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const TopicModel =
    mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
export default TopicModel;
