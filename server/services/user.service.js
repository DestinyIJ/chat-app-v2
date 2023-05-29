const User = require('../models/User');

// Get all users
exports.getAllUsers = async () => {
  const users = await User.find();
  return users;
};

// Get user by ID
exports.getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

// Create a new user
exports.createUser = async (username, password) => {
  const newUser = new User({ username, password });
  await newUser.save();
  return newUser;
};
