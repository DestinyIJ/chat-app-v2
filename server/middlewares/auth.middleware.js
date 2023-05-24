const User = require("../models/User.model")
const asyncHandler = require("express-async-handler")
const { verifyToken } = require("../config/jwt.config")


exports.authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    } else if(req.cookies.refreshToken) {
        token = req.cookies?.refreshToken
    } else {
        res.statusCode(400)
        throw new Error("Valid authorization headers is required to perform this operation")
    }

    const decoded = await verifyToken(token)

    const user = await User.findById(decoded?.userId)

    if(!user || user.changedPasswordAfter(decoded?.iat)) {
        res.statusCode(400)
        throw new Error("Invalid authorization token or password has been changed recently. Please sign-in again") 
    } 

    req.user = user

    next()
})


