const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    console.log("AUTH MIDDLEWARE HIT")

    const authHeader = req.headers.authorization

    console.log("AUTH HEADER:", authHeader)

    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied"
        })
    }

    const token = authHeader.split(' ')[1]

    console.log("TOKEN:", token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded)

        next()
    } catch (error) {
        console.log("JWT ERROR:", error.message)

        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware