import connect from "../database/conn.js";
import { createAccessToken, createRefreshToken } from "../jwt/jwt.js";
import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
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
export async function register(req, res) {
    await connect();
    try {
        const { name, email, password, avatar, dob, phone, gender } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const salt = await bcrypt.genSalt(10); // Tạo salt với độ khó 10
        const hashedPassword = await bcrypt.hash(password, salt); // Mã hóa mật khẩu

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            avatar,
            dob,
            phone,
            gender,
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: savedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser)
            return res.status(404).send({ error: "Email not found" });

        UserModel.findOne({ email })
            .then((user) => {
                bcrypt
                    .compare(password, user.password)
                    .then(() => {
                        // create jwt token
                        const accessToken = createAccessToken(user);
                        const refreshToken = createRefreshToken(user);

                        return res.status(200).send({
                            message: "Login Successful...!",
                            username: user.email,
                            accessToken,
                            refreshToken,
                        });
                    })
                    .catch((error) => {
                        return res
                            .status(400)
                            .send({ error: "Password does not Match" });
                    });
            })
            .catch((error) => {
                return res.status(404).send({ error: "Username not Found" });
            });
    } catch (error) {
        return res.status(500).send({ error });
    }
}
export function getAccessToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is required" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = createAccessToken({ user });

        res.json({ accessToken: newAccessToken });
    });
}
