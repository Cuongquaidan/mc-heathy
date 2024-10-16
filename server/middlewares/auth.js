// export default async function Auth(req, res, next) {
//     try {
//         // access authorize header to validate request
//         const token = req.headers.authorization.split(" ")[1];

//         // retrive the user details fo the logged in user
//         const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

//         req.user = decodedToken;

//         next();
//     } catch (error) {
//         res.status(401).json({ error: "Authentication Failed!" });
//     }
// }
export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false,
    };
    next();
}
// Kiểm tra access token có hợp lệ hay đã hết hạn
export function verifyAccessToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res
            .status(401)
            .json({ message: "Authorization header is missing" });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    try {
        // Giải mã và kiểm tra token với secret key
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Nếu token hợp lệ, lưu thông tin người dùng vào request và chuyển tiếp middleware
        req.user = decodedToken;
        next();
    } catch (error) {
        // Nếu token hết hạn hoặc không hợp lệ
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ message: "Access token has expired" });
        } else {
            return res.status(401).json({ message: "Invalid access token" });
        }
    }
}
