const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // No Authorization header
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                code: "NO_TOKEN",
                message: "No token provided"
            });
        }

        // Expect format: "Bearer TOKEN"
        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            return res.status(401).json({
                status: false,
                code: "INVALID_TOKEN_FORMAT",
                message: "Token format is invalid"
            });
        }

        const token = parts[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                code: "TOKEN_MISSING",
                message: "Token missing"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data to request
        req.user = decoded;

        next();

    } catch (err) {
        //  Handle expired token separately
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                status: false,
                code: "TOKEN_EXPIRED",
                message: "Token expired. Please login again."
            });
        }

        // Invalid token (tampered or wrong secret)
        return res.status(401).json({
            status: false,
            code: "INVALID_TOKEN",
            message: "Invalid token"
        });
    }
};

module.exports = verifyToken;