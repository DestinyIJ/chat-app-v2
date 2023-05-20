const crypto = require("node:crypto")

const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const User = require("../models/User.model")
const validateMongodbId = require("../utils/validateMongodbId")
const generateRefreshToken = require("../config/refreshToken.config")
const generateToken = require("../config/jwt.config")


exports.register = asyncHandler(async (req, res) => {
    if(Object.keys(req.body).length === 0) {
        res.statusCode(400)
        throw new Error("Request must contain body")
    }

    const { email } = req.body
    let user = await User.findOne({email})
    if(user) throw new Error("User already exists")
    
    try {
        user = await User.create({
            ...req.body
        })

        
        res.status(200).json(user)
    } catch (error) {
        throw new Error(error?.message)
    } 
})

exports.login = asyncHandler(async (req, res) => {
    if(Object.keys(req.body).length === 0) {
        res.statusCode(400)
        throw new Error("Email and Password are required")
    }

    const { email, password } = req.body

    let user = await User.findOne({ email }).select('-password')

    if(user && (await user.isPasswordMatched(password))) {
        const refreshToken = generateRefreshToken(user._id)

        user = await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                id: user?._id,
                firstname: user?.firstName,
                lastname: user?.lastName,
                email: user?.email,
                token: generateToken(user._id)
            }
        })
    } else {
        res.statusCode(400)
        throw new Error("Invalid user credentials")
    } 
})

exports.updatePassword = asyncHandler(async (req, res) => {
    const { _id: id } = req.user
    validateMongodbId(id)
    const { password } = req.body

    try {
        const user = await User.findById(id)
        if(password) {
            user.password = password
            const updatedPassword = user.save()
            res.status(200).json(updatedPassword)
        }
    } catch (error) {
        throw new Error(error)
    }
})


exports.forgotPassword = asyncHandler(async(req, res) => {
    const { email } = req.body
    

    try {
        const user = await User.findOne({ email })

        if(!user) {
            res.statusCode(404)
            throw new Error("User not found for this email")
        }

        const token = await user.createPasswordResetToken()
        await user.save()
        const resetURL = `${process.env.APP_FRONTEND_URL}/reset-password/${token}`
        const html = buildTemplateView("email/forgot-password", { resetURL })
        const option = {
            from: process.env.APP_EMAIL_ADDRESS,
            to: email,
            subject: 'Forgot Password',
            text: `Hello, ${user.fullname}`,
            html
          };
        
        mailControllerUsingNodemailer(option)
            .then((info) => {
                res.status(200).json({ message: `Reset link sent - ${info.response}`})
            })
            .catch((error) => {
                console.error(`Error sending email: ${error.message}`);
                throw new Error(error)
            });
        
    } catch (error) {
        throw new Error(error)
    }
})

exports.resetPassword = asyncHandler(async(req, res) => {
    const { token, password } = req.body

    const hashedToken = crypto.createHash('sha256').update(token).digest("hex")
   
    try {
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
         })

        if(!user) {
            res.statusCode(400)
            throw new Error("Token is invalid or has expired. Try requesting for another")
        }

        user.password = password
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        await user.save()
        res.status(200).json({ message: "Password reset successful"})

    } catch (error) {
        res.statusCode(500)
        throw new Error(error)
    }

    
})

exports.handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if(!cookie?.refreshToken) throw new Error("No refresh token in cookies")

    const refreshToken = cookie.refreshToken

    const user = await User.findOne({ refreshToken })
    if(!user) throw new Error("Invalid refresh token")
    const JWT_SECRET = process.env.JWT_SECRET
    try {
        jwt.verify(refreshToken, JWT_SECRET)
        const accessToken = jwt.sign(user._id)
        res.status(200).json({ accessToken })
    } catch (error) {
        throw new Error(error)
    }
    
})

exports.logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if(!cookie?.refreshToken) throw new Error("No refresh token in cookies")
    const refreshToken = cookie.refreshToken

    try {
        await User.findOneAndUpdate(refreshToken, {
            refreshToken: ""
        })
    
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        })
        res.sendStatus(204)
    } catch (error) {
        throw new Error(error)
    }  
})