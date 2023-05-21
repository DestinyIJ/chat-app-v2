const crypto = require("node:crypto")

const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const otpGenerator = require('otp-generator');
require("dotenv").config()

const User = require("../models/User.model")
const validateMongodbId = require("../utils/validateMongodbId")
const generateRefreshToken = require("../config/refreshToken.config")
const generateToken = require("../config/jwt.config");
const buildTemplateView = require("../utils/buildTemplateView");
const mailer = require("../services/mailer.service");


exports.register = asyncHandler(async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        res.statusCode(400)
        throw new Error("Request must contain body")
    }

    req.body = filterReqBody(req.body, "firstName", "lastName", "password", "email")

    const { email, firstName, lastName, password } = req.body
    let user = await User.findOne({email})

    if(user && user.emailVerified) {
        res.statusCode(400)
        throw new Error("Email provided is already registered, please Login.")
    } else if(user) {
        try {
            user = await User.findOneAndUpdate(
                { email }, 
                { email, firstName, lastName, password }, 
                { new: true, validateModifiedOnly: true })

            req.user = user
            next()
        } catch (error) {
            throw new Error(error?.message)
        } 
    }

    
    try {
        user = await User.create({ email, firstName, lastName, password })

        req.user = user
        next()
    } catch (error) {
        throw new Error(error?.message)
    } 
})

exports.sendOTP = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user

    const otp = otpGenerator.generate(6, 
        { 
            digits: true, 
            alphabets: false, 
            upperCase: false, 
            specialChars: false 
        });
    const otp_expiry_time = Date.now() + (10 * 60 * 1000) // 10 minutes later
    
    const user = await User.findByIdAndUpdate(userId, {
        otp,
        otpExpires: otp_expiry_time
    }, { validateModifiedOnly: true })

    if(!user) {
        res.statusCode(404)
        throw new Error("Email not found. Try registering again.")
    }

    const html = buildTemplateView("email/send-otp", { otp })
    const options = {
        from: process.env.APP_EMAIL_ADDRESS,
        to: user.email,
        subject: 'Complete your registeration',
        html
    };

    mailer.sendMail(options).then((info) => {
        res.status(200).json({ message: `Email sent - ${info.response}`})
    })
    .catch((error) => {
        console.error(`Error sending email: ${error.message}`);
        throw new Error(error)
    });

    res.status(200).json({
        status: "success",
        message: "OTP sent to user email to complete registeration",
        data: user
    })
})

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body
    const user = await User.findOne({
        email,
        otpExpires: {$gt: Date.now()}
    })

    if(!user) {
        res.statusCode(400)
        throw new Error("Email is invalid or OTP has expired")
    }

    if(!(await user.isOTPMatched(otp))) {
        res.statusCode(400)
        throw new Error("OTP invalid!")
    }

    try {
        user.emailVerified = true
        user.otp = undefined

        user = await user.save({ new: true })

        const html = buildTemplateView("email/register-complete", { user })
        const options = {
            from: process.env.APP_EMAIL_ADDRESS,
            to: user.email,
            subject: 'Registeration Complete',
            html
        };

        mailer.sendMail(options).then((info) => {
            res.status(200).json({ message: `email sent - ${info.response}`})
        })
        .catch((error) => {
            console.error(`Error sending email: ${error.message}`);
            throw new Error(error)
        });

        res.status(200).json({
            status: "success",
            message: "OTP is verified",
            data: {...user, token: generateToken(user._id)}
        })
    } catch (error) {
        throw new Error(error?.message)
    }
})

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.statusCode(400)
        throw new Error("Email and Password are required")
    }

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

    const user = await User.findOne({ email })

    if(!user) {
        res.statusCode(404)
        throw new Error("User not found for this email")
    }

    try {
        const token = await user.createPasswordResetToken()

        await user.save()
        const resetURL = `${process.env.APP_FRONTEND_URL}/auth/reset-password?token=${token}`

        const html = buildTemplateView("email/forgot-password", { resetURL })
        const options = {
            from: process.env.APP_EMAIL_ADDRESS,
            to: user.email,
            subject: 'Forgot Password?',
            html
        };

        mailer.sendMail(options).then((info) => {
            res.status(200).json({ message: `Reset link has been sent - ${info.response}`})
        })
        .catch((error) => {
            console.error(`Error sending email: ${error.message}`);
            throw new Error(error)
        });
        
        res.status(200).json({
            status: "success",
            message: "Reset Password Link sent to email",
            data: {
                token
            }
        })
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: true })
        throw new Error(error)
    }
})

exports.resetPassword = asyncHandler(async(req, res) => {
    const { token, password } = req.body

    const hashedToken = crypto.createHash('sha256').update(token).digest("hex")

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
     })

    if(!user) {
        res.statusCode(400)
        throw new Error("Token is invalid or has expired.")
    }

    try {
        user.password = password
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        await user.save()
        res.status(200).json({ 
            status: "success",
            message: "Password reset successful",
            data: {...user, token: generateToken(user._id)}
        })

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