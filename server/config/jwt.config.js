const jwt = require("jsonwebtoken")
const RefreshToken = require("../models/RefreshToken.model")

const JWT_SECRET = process.env.JWT_SECRET

exports.generateTokens = async (user) => {
    const accessToken = jwt.sign({ _id:  user._id }, JWT_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ _id:  user._id }, JWT_SECRET, { expiresIn: '7d' });

    const userToken = await RefreshToken.findOne({ userId: user._id });
    if (userToken) await userToken.deleteOne({ userId: user._id });

    try {
        await RefreshToken.create({ userId: user._id, token: refreshToken })
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(err);
    }

};

exports.verifyToken = async (token) => {
    const userToken = await RefreshToken.findOne({ token });

    if(!userToken) {
        throw new Error("Authorization Token not found")
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    
    return decoded; 
};

exports.signToken = async (decoded) => {
    const accessToken = jwt.sign({ _id:  decoded.userId }, JWT_SECRET, { expiresIn: '30m' });

    return accessToken
}

