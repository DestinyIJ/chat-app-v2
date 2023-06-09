const router = require('express').Router()

const authRoute = require("./auth.routes")
const userRoute = require("./User.routes")


router.use("/auth", authRoute)
router.use("/users", userRoute)

module.exports = router