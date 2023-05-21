const router = require('express').Router()

const authRoute = require("./auth.routes")
const userRoute = require("./User.routes")


router.use("/auth", authRoute)
router.use("/user", userRoute)

module.exports = router