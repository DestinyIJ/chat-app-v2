const asyncHandler = require("express-async-handler")

const User = require("../models/User.model")
const validateMongodbId = require("../utils/validateMongodbId")

exports.updateUserSelf = asyncHandler(async (req, res) => {
    const { _id: id } = req.user
    validateMongodbId(id)

    try {
        let user = await User.findByIdAndUpdate(id, {
            email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            about: req.body.about,
            avatar: req.body.avatar
        }, { new: true, validateModifiedOnly: true })
        res.status(200).json({
            status: "success", 
            message: "User Profile Updated",
            data : { user } })
    } catch (error) {
        res.statusCode(500)
        throw new Error(error)
    }
})