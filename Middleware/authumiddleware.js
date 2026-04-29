const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "No token provided"
            });
        }

        // Split "Bearer TOKEN"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // userId, role

        next();

    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyToken;