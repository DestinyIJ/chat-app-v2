// Example logic for authService.js
const bcrypt = require('bcrypt');
const User = require("../models/User.model");

// Registration service
exports.register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  return newUser;
};

// Login service
exports.login = async (email, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid username or password');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }
  const token = generateAuthToken(user._id); // Generate JWT token
  return token;
};
