const { Router } = require('express')
const userController = require('../controllers/User.controller')
const { authMiddleware } = require("../middlewares/auth.middleware")

const router = Router()

router.get('/', authMiddleware, userController.getUsers) 
router.get('/:id', authMiddleware, userController.getUser) 
router.get('/search', authMiddleware, userController.searchUsers) 
router.get('/friends', authMiddleware, userController.getFriends)
router.get('/friend-requests', authMiddleware, userController.getFriendRequests)
router.patch("/update", authMiddleware, userController.updateUserSelf)

module.exports = router