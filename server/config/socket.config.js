const path = require("node:path")

require("dotenv").config()
const { Server } = require("socket.io");
const User = require("../models/User.model");
const Conversation = require("../models/Conversation.model")

function configureSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: `${process.env.APP_FRONTEND_URL}`,
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", async (socket) => {
        const socketId = socket.id
        console.log(`User connected - ${socketId}`)
        
        const userId = socket.handshake.query.user_id

        if(Boolean(userId)) {
            try {
                await User.findByIdAndUpdate(userId, { 
                    socketId,
                    online: true 
                })
            } catch (error) {
                io.emit("error", "Could not connect to server. Try refreshing!")
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

                io.to(recipient.socket_id).emit("friend_request", { 
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
                const conversation = await Conversation.create({
                    particpants: [userId, from]
                })
                const recipient = await User.findOneAndUpdate(
                    { _id: userId },
                    { $push: { friends: from } },
                    { $push: { conversations: conversation._id } },
                    { $pull: { friendRequests: { friend: from } } },
                    { new: true, validateModifiedOnly: true }
                );

                const sender = await User.findOneAndUpdate(
                    { _id: from },
                    { $push: { friends: to_user.id } },
                    { $push: { conversations: conversation._id } },
                    { $pull: { friendRequests: { friend: to_user.id } } },
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

        // handle text and link messages
        socket.on("message", async (data) => {
            try {
                const conversation = decryptMessage
            } catch (error) {
                
            }
            io.to().emit()
        })



        socket.on("get_conversation", async (callback) => {
            const conversations = await Conversation.find(
                {participants: {$all: [userId]}},
                { participants: { $ne: userId } }
                )
            .populate("participants")
            .sort("updatedAt desc")
            .sort({ 'messages.date': 1 })
            .exec()
            
            callback(conversations)
        })

        socket.on("get_private_conversation", async (callback) => {
            const conversations = await Conversation.findOne(
                {participants: {$size: 2, $all: [userId]}},
                { participants: { $ne: userId } }
                )
                .populate("participants")
                .sort("updatedAt desc")
                .sort({ 'messages.date': 1 })
                .exec()
            
            callback(conversations)
        })

        socket.on('message_sent', (message) => {
            // Save the message to the database
            // ...
            
            // Broadcast the new message to all connected clients
            io.emit('message_received', message);
        });

        socket.on('message_received', (message) => {
            // Save the message to the database
            // ...
            
            // Broadcast the new message to all connected clients
            io.emit('message_sent', message);
        });

        socket.on("end", async () => {
            console.log("Closing connection")
            if(Boolean(userId)) {
                try {
                    await User.findByIdAndUpdate(userId, { 
                        socketId,
                        online: false 
                    })
                } catch (error) {
                    io.emit("error", error)
                }
            }
            socket.disconnect(0)
        })
    });
}

module.exports = configureSocket;
