import connect from "../database/conn.js";
import TopicModel from "../models/Topic.model.js";

export async function AddTopic(req, res) {
    await connect();
    try {
        const existingTopic = await TopicModel.findOne({
            email: req.body.title,
        });
        if (existingTopic) {
            return res.status(400).json({
                message: "Title already exists. Please use a different title.",
            });
        }

        const newTopic = new TopicModel({ ...req.body });
        await newTopic.save();

        return res.status(201).json({
            message: "Topic added successfully",
            Topic: newTopic,
        });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}
