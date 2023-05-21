const User = require("../models/User.model")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const { verifyAccessToken } = require("../config/jwt.config")


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

    const { decoded, accessToken } = await verifyAccessToken(token)

    const user = await User.findById(decoded?.userId, { refreshTokenExpiration: refreshTokenExpiresAt })

    if(!user || user.changedPasswordAfter(decoded?.iat)) {
        res.statusCode(400)
        throw new Error("Invalid authorization token or password has been changed recently. Please sign-in again") 
    } 

    req.user = user
    req.accessToken = accessToken
    next()
})


