import connect from "../database/conn.js";
import TopicModel from "../models/Topic.model.js";

export async function AddTopic(req, res) {
    await connect();
    try {
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
export async function getAll(req, res) {
    await connect();
    try {
        const page = parseInt(req.query.page) || 1; // Nếu không có `page` thì mặc định là 1
        const limit = parseInt(req.query.limit) || 10; // Nếu không có `limit` thì mặc định là 10
        const offset = (page - 1) * 20; // Mặc định 1 trang có 20 lịch

        const topics = await TopicModel.find()
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .lean();
        const total = await TopicModel.countDocuments();
        return res.status(200).json({ topics, total });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}
export async function getById(req, res) {
    await connect();
    try {
        const topicId = req.query.topicId;
        const topic = await TopicModel.findById(topicId);
        if (!topic) return res.status(404).send({ message: "Topic not found" });
        return res.status(200).json(topic);
    } catch (error) {
        return res.status(500).send(error);
    }
}
