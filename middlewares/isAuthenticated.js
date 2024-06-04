const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(`Token===>${token}`);
    if (!token) {
        return res.status(401).json({ message: "Token not found, Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);   
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = isAuthenticated;