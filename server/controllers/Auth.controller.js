const crypto = require("node:crypto")

const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const otpGenerator = require('otp-generator');
require("dotenv").config()

const User = require("../models/User.model")
const validateMongodbId = require("../utils/validateMongodbId")
const { generateTokens, verifyToken, signToken } = require("../config/jwt.config");
const buildTemplateView = require("../utils/buildTemplateView");
const mailer = require("../services/mailer.service");


// const authService = require('../services/authService');

// // Registration logic
// exports.register = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const newUser = await authService.register(username, password);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.register = asyncHandler(async (req, res, next) => {

    if(Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error("Request must contain body")
    }

    const { email, firstName, lastName, password } = req.body
    let user = await User.findOne({email})

    if(user && user.emailVerified) {
        res.status(400)
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
    } else {
        try {
            user = await User.create({ email, firstName, lastName, password })
    
            req.user = user
            next()
        } catch (error) {
            throw new Error(error?.message)
        } 
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
        res.status(404)
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
        res.status(200).json({
            status: "success",
            message: `OTP sent to user email to complete registeration - ${info.response}`,
            user
        })
    })
    .catch((error) => {
        console.error(`Error sending email: ${error.message}`);
        throw new Error(error)
    });
})

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body
    let user = await User.findOne({
        email,
        otpExpires: {$gt: Date.now()}
    })

    if(!user || !user.isOTPMatched(otp)) {
        res.status(400)
        throw new Error("Email is invalid or OTP has expired")
    }


    try {

        user.emailVerified = true
        user = await user.save({ new: true })

        const { accessToken } = await generateTokens(user)
        
        const html = buildTemplateView("email/register-complete", 
            { 
                firstName: user.firstName, 
                lastName: user.lastName 
            })
        const options = {
            from: process.env.APP_EMAIL_ADDRESS,
            to: user.email,
            subject: 'Registeration Complete',
            html
        };

        await mailer.sendMail(options)
        res.status(200).json({
            status: "success",
            message: `OTP is verified. You can log in now with your email address`,
            user: {...user, accessToken }
        })
    } catch (error) {
        throw new Error(error?.message)
    }
})

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error("Email and Password are required")
    }

    let user = await User.findOne({ email }).select('+password')

    if(user && (await user.isPasswordMatched(password))) {
        const { refreshToken, accessToken } = await generateTokens(user)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })


        res.status(200).json({
            status: "success",
            message: "Login successful",
            accessToken,
            user
        })
    } else {
        res.status(400)
        throw new Error("Invalid user credentials")
    } 
})

exports.updatePassword = asyncHandler(async (req, res) => {
    const { _id: id } = req.user
    const accessToken = req.accessToken
    
    validateMongodbId(id)
    const { password } = req.body
    if(!password) { throw new Error("Password is required") }
    try {
        const user = await User.findById(id)
        user.password = password
        await user.save()
        res.status(200).json({
            accessToken
        })
    } catch (error) {
        throw new Error(error)
    }
})


exports.forgotPassword = asyncHandler(async(req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if(!user) {
        res.status(404)
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
            res.status(200).json({
                status: "success",
                message: "Reset Password Link sent to email",
                token
            })
        })
        .catch((error) => {
            throw new Error(error)
        });
        
        
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpiresAt = undefined
        await user.save({ validateBeforeSave: true })
        throw new Error(error)
    }
})

exports.resetPassword = asyncHandler(async(req, res) => {
    const { token, password } = req.body

    const hashedToken = crypto.createHash('sha256').update(token).digest("hex")


    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpiresAt: { $gt: Date.now() }
     })

    if(!user) {
        res.status(400)
        throw new Error("Token is invalid or has expired.")
    }

    try {
        user.password = password
        user.passwordResetToken = undefined
        user.passwordResetExpiresAt = undefined
        user.passwordChangedAt = Date.now()

        await user.save()

        const html = buildTemplateView("email/reset-password")
        const options = {
            from: process.env.APP_EMAIL_ADDRESS,
            to: user.email,
            subject: 'Password reset successful',
            html
        };

        mailer.sendMail(options).then((info) => {
            res.status(200).json({ 
                status: "success",
                message: "Password reset successful"
            })
        })
        .catch((error) => {
            console.error(`Error sending email: ${error.message}`);
            throw new Error(error)
        });
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }  
})

exports.handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if(!cookie?.refreshToken) throw new Error("No refresh token in cookies")

    const refreshToken = cookie.refreshToken

    const decoded = await verifyToken(refreshToken)

    const user = await User.findById(decoded?.userId)

    if(!user) throw new Error("Invalid refresh token")

    const accessToken = await signToken(decoded)

    res.status(200).json({ 
        status : "success",
        data: {
            accessToken
        }
     })
    
})


exports.logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies
   
    if(!cookies?.refreshToken) throw new Error("No refresh token in cookies")
    const refreshToken = cookies.refreshToken

    try {
        await User.findOneAndUpdate({refreshToken}, {
            refreshToken: ""
        })
    
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        })
        res.status(204).json({
            status: "success",
            message: "Logut successfull"
        })
    } catch (error) {
        throw new Error(error)
    }  
})
