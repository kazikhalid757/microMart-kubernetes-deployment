// controllers/userController.js
const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};
