const asyncHandler = require("express-async-handler")

const User = require("../models/User.model")
const validateMongodbId = require("../utils/validateMongodbId")

exports.getUsers = asyncHandler(async (req, res) => {
    const userId = req.user._id
    try {
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

exports.getFriends = asyncHandler(async (req, res) => {
    const userId = req.user._id
    try {
        let friends =  await User.findById(userId, 
            { emailVerified: true })
            .select("friends")
            .populate("friends", "_id firstName lastName avatar");

        res.status(200).json({
            status: "success",
            message: `Found ${friends.length} friends`,
            friends
        })
    } catch (error) {
        throw new Error(error)
    }
})

exports.getFriendRequests = asyncHandler(async (req, res) => {
    const userId = req.user._id
  
    try {
      const user = await User.findById(userId)
            .select('friendRequests')
            .populate('friendRequests.friend', '_id firstName lastName avatar');
  
      if (user) {
        const friendRequests = user.friendRequests;
        res.status(200).json(friendRequests);
      } else {
        res.status(404)
        throw new Error("User not found")
      }
    } catch (error) {
      throw new Error(error)
    }
})

exports.searchUsers = asyncHandler(async (req, res) => {
    const { firstName, lastName } = req.query;

    try {
        let users;

        if (firstName && lastName) {
        users = await User.find({ firstName, lastName, emailVerified: true  }).select('_id firstName lastName avatar');
        } else if (firstName) {
        users = await User.find({ firstName, emailVerified: true  }).select('_id firstName lastName avatar');
        } else if (lastName) {
        users = await User.find({ lastName, emailVerified: true  }).select('_id firstName lastName avatar');
        } else {
        users = [];
        }

        if (users.length > 0) {
        res.status(200).json({
            status: "success",
            message: `Found ${users.length} users`,
            users
        });
        } else {
            res.status(404)
            throw new Error("No Users found")
        }
    } catch (error) {
        throw new Error(error)
    }
})

exports.getUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        let user = await User.findById(id, { emailVerified: true }).select("_id firstName lastName avatar")
        res.status(200).json(user)
    } catch (error) {
        res.statusCode(404)
        throw new Error("Invalid user id or user not found")
    }
})

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
        res.status(500)
        throw new Error(error)
    }
})