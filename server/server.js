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

    if(userId) {
        await User.findByIdAndUpdate(userId, { 
            socketId,
            online: true 
        })
    }

    socket.on("friend_request", async (data) => {
        try {
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { friendRequests: { friend: to._id } } },
                { new: true }
            );
            const to = await User.findById(data.to)
            io.to(to.socket_id).emit("new_friend_request", { from: userId })
        } catch (error) {
            io.emit("error", error)
        }

       
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