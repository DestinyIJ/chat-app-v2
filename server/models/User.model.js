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
    avatar: {
        type: String
    },
    email:{
        type:String,
        required: [true, "email is required"],
        unique: [true, "This user email already exist"],
        match: [emailRegex, 'Please enter a valid email address'],
    },
    password:{
        type:String,
        required: [true, "User password is required"],
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
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
    
    next()
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now() + process.env.PASSWORD_RESET_TOKEN_EXPIRES // 10 minutes
    return resetToken
}

module.exports = model('User', userSchema);