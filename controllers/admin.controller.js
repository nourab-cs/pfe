const User = require("../models/user.model");

const privateAdmin = async (req, res) => {
  try {
    res.status(200).json({ message: "admin role exist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const assignRole = async (req, res) => {
  try {
    const update = await User.findByIdAndUpdate(req.body.id, {
      role: req.body.role,
    });

    res.status(200).json({ message: "updated ", data: update });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};
const allUsers = async (req, res) => {
  try {
    require("../database");
    const users = await User.find({ role: { $in: ["user","recruter"] } });
    let data = users.map((el) => {
      return {
        username: el.username,
        email: el.email,
        _id: el._id,
        role: el.role,
      };
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
module.exports = {
  allUsers,
  privateAdmin,
  assignRole,
  deleteUser
};
