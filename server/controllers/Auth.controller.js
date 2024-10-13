import connect from "../database/conn.js";
import UserModel from "../models/User.model.js";

export const verifyEmail = async (req, res, next) => {
    await connect();
    try {
        const { email: userEmail } = req.body;

        const userExisted = await UserModel.findOne({ email: userEmail });

        if (userExisted) {
            return res.status(404).json({ message: "Email is already in use" });
        }

        next();
    } catch (error) {
        console.error("Error verifying email:", error);
        return res
            .status(500)
            .json({ message: "Server error. Please try again later." });
    }
};
