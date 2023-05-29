const asyncHandler = require("express-async-handler")
const Conversation = require("../models/Conversation.model")

const User = require("../models/User.model")
const validateMongodbId = require("../utils/validateMongodbId")

exports.getConversations = asyncHandler(async (req, res) => {
    const userId = req.user._id

    try {
        const conversations = await Conversation.find(
            {participants: userId },
            { participants: { $ne: userId } }
            )
        .populate("participants")
        .sort("updatedAt desc")
        .exec()
        let users =  await User.find({ _id: { $ne: userId }, emailVerified: true }).select('_id firstName lastName avatar');
        
        res.status(200).json({
            status: "success",
            message: `Found ${users.length} users`,
            users
        })
    } catch (error) {
        throw new Error(error)
    }
})
