const crypto = require("node:crypto")

const { Schema, model } = require("mongoose")


const conversationSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            sender: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }, 
            recipient: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            type: {
                type: String,
                default: "Text",
                enum: ["Text", "Media", "Document", "Link"]
            },
            date: {
                type: Date,
                default: Date.now,
            },
            text: {
                type: String,
            },
            file: {
                type: String
            }
        }
    ]
}, {
    validateBeforeSave: true,
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})


module.exports = model('Conversation', conversationSchema);