import jwt from "jsonwebtoken";

const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export function createAccessToken(user) {
    return jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_LIFE,
        }
    );
}
export function createRefreshToken(user) {
    return jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_LIFE,
        }
    );
}
export function refreshAccessToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is required" });
    }

    try {
        // Kiểm tra refresh token có hợp lệ hay không
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Nếu refresh token hợp lệ, tạo lại access token mới
        const newAccessToken = jwt.sign(
            {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                role: decoded.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_LIFE } // Thời gian sống của access token
        );

        // Trả về access token mới
        return res.status(200).json({
            accessToken: newAccessToken,
            message: "Access token refreshed successfully",
        });
    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
}
