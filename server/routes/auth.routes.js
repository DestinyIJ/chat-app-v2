const { Router } = require('express')
const authController = require('../controllers/Auth.controller')
const { authMiddleware } = require("../middlewares/auth.middleware")

const router = Router()


router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.post("/forgot-password", authController.forgotPassword)
router.post("/send-otp", authController.sendOTP)
router.post("/reset-password", authController.resetPassword)
router.post("/verify-otp", authController.verifyOTP)
router.get('/refresh', authController.handleRefreshToken)

router.put("/update-password", authMiddleware, authController.updatePassword)


module.exports = router