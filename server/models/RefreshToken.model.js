const jwt = require("jsonwebtoken")

const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt");


const refreshTokenSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        required: true 
    },
    token: { 
        type: String, 
        required: true },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 7 * 24 * 60 * 60 * 1000 
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})



refreshTokenSchema.methods.verify = function (enteredOTP) {
    return bcrypt.compare(enteredOTP, this.otp)
}
module.exports = model('RefreshToken', refreshTokenSchema);