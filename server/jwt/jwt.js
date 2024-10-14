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
