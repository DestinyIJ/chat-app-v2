const { Router } = require('express')
const userController = require('../controllers/User.controller')
const { authMiddleware } = require("../middlewares/auth.middleware")

const router = Router()

router.patch("/update", authMiddleware, userController.updateUserSelf)

module.exports = router