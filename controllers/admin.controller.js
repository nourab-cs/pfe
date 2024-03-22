const User = require("../models/user.model");

const privateAdmin = async (req, res) => {
  try {
    res.status(200).json({ message: "admin role exist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const allUsers = async (req, res) => {
  try {
    require("../database");
    const users = await User.find({ role: { $in: ["user"] } });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};
module.exports = {
  allUsers,
  privateAdmin
};
