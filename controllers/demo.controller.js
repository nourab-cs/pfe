const User = require("../models/user.model");
const db = require("../database")

const myControlregisterlerFunction = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: "User created!", data: user })
  } catch (error) {
    res.status(500).json({ message: "error", error: error })

  }
}

module.exports = {
  myControllerFunction,
};
