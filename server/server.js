const http = require("node:http")

require("dotenv").config()
const { Server } = require("socket.io")

const app = require("./app")
const dbConnect = require("./config/db.config")
const FriendRequest = require("./models/FriendRequest.model")
const User = require("./models/User.model")

const PORT = process.env.PORT || 8000

process.on("uncaughtException", (error) => {
    console.log(error)
    process.exit(1)
})




const server = http.createServer(app)
dbConnect()
const io = new Server(server, {
    cors: {
        origin: `${process.env.APP_FRONTEND_URL}`,
        methods: ["GET", "POST"]
    }
})

io.on("connection", async (socket) => {
    const userId = socket.handshake.query("userId")
    const socketId = socket.id

    console.log(`User connected - ${socketId}`)

    if(Boolean(userId)) {
        try {
            await User.findByIdAndUpdate(userId, { 
                socketId,
                online: true 
            })
        } catch (error) {
            io.emit("error", error)
        }
    }

    socket.on("friend_request", async (from) => {
        try {
            const recipient = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { friendRequests: { friend: from, type: "incoming" } } },
                { new: true, validateModifiedOnly: true }
            );

            const sender = await User.findOneAndUpdate(
                { _id: recipient._id },
                { $push: { friendRequests: { friend: recipient._id, type: "outgoing" } } },
                { new: true, validateModifiedOnly: true }
            );
            
            if(!recipient || !sender) {
                throw new error("Could not complete friend request")
            }

            io.to(recipient.socket_id).emit("new_friend_request", { 
                from: sender._id,
                message: `New Friend Request from ${sender.firstName} ${sender.lastName}`
            })
            io.to(sender.socket_id).emit("friend_request_sent", { 
                message: `Friend Request sent to ${recipient.firstName} ${recipient.lastName}`
            })

        } catch (error) {
            io.emit("error", error)
        }
    })

    socket.on("accept_friend_request", async (from) => {
        try {
            const recipient = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { friends: from } },
                { $del: { friendRequests: { friend: from, type: "incoming" } } },
                { new: true, validateModifiedOnly: true }
            );

            const sender = await User.findOneAndUpdate(
                { _id: from },
                { $push: { friends: to_user.id } },
                { $del: { friendRequests: { friend: to_user.id } } },
                { new: true, validateModifiedOnly: true }
            );

            io.to(recipient.socket_id).emit("friend_request_accepted", { 
                message: `You have accepted a friend Request from ${sender.firstName} ${sender.lastName}`
            })
            io.to(sender.socket_id).emit("friend_request_accepted", { 
                message: `Your friend Request to ${recipient.firstName} ${recipient.lastName} has been accepted`
            })
        } catch (error) {
            io.emit("error", error)
        }
    })

    socket.on("decline_friend_request", async (from) => {
        try {
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { friends: from } },
                { $del: { friendRequests: { friend: from, type: "incoming" } } },
                { new: true, validateModifiedOnly: true }
            );

            await User.findOneAndUpdate(
                { _id: from },
                { $del: { friendRequests: { friend: userId } } },
                { new: true, validateModifiedOnly: true }
            );
        } catch (error) {
            io.emit("error", error)
        }
    })

    socket.on("end", function () {
        console.log("Closing connection")
        socket.disconnect(0)
    })
});

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:8000`)
})

process.on("unhandledRejection", (error) => {
    console.log(error)
    server.close(() => {
        process.exit(1)
    })
})