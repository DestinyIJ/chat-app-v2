const crypto = require("node:crypto")

const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt");

const emailRegex = /^[\w.+]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    about: String,
    avatar: String,
    email:{
        type:String,
        required: [true, "email is required"],
        unique: [true, "This user email already exist"],
        match: [emailRegex, 'Please enter a valid email address'],
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password:{
        type:String,
        required: [true, "User password is required"],
        select: false
    },
    socketId: String,
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    friendRequests: [
        {
            friend: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            date: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    online: {
        type: Boolean,
        default: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiresAt: Date,
    otp: String,
    otpExpires: Date
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

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) this.password = await bcrypt.hash(this.password, 10)
    if(this.isModified("otp")) this.otp = await bcrypt.hash(this.otp, 10)
    if(this.isModified("access_token")) this.accessTokenExpires = Date.now()
    
    next()
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.isOTPMatched = function (enteredOTP) {
    return bcrypt.compare(enteredOTP, this.otp)
}

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.passwordResetExpiresAt = Date.now() + (10*60*1000) // 10 minutes
    return resetToken
}

userSchema.methods.changedPasswordAfter = async function (timestamp) {
    return timestamp < this.passwordChangedAt
}

module.exports = model('User', userSchema);