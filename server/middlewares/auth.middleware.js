const User = require("../models/User.model")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const JWT_SECRET = process.env.JWT_SECRET

exports.authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]

    } else if(req.cookies.jwt) {
        token = req.cookies?.jwt
    } else {
        res.statusCode(400)
        throw new Error("No authorization token in headers.")
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded?.id)

    if(!user || user.changedPasswordAfter(decoded.iat)) {
        res.statusCode(400)
        throw new Error("Invalid authorization token. Please sign-in again") 
    } 

    req.user = user
    next()
})


