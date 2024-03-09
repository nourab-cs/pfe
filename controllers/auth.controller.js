const User = require("../models/user.model");
const Prom = require("../models/promise.model");
const bcrypt = require("bcrypt")

const sendEmail = async (req, res) => {
  try {
    require("../database");
    const isUser = await User.findOne({ email: req.body.email });
    if (isUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    const Mailer = require("../lib/mailer");
    Mailer.sendEmail(
      req.body.email,
      "Email verification",
      `
      <p>Hello there!</p>
      <p>Your verification code is: <strong>${result}</strong></p>
      <p>Click the button below to verify your email:</p>
      <a href="http://localhost:5173/register?code=${result}">Production test</a>
      <a href="http://localhost:5173/register?code=${result}">dev link</a>
      <a href="http://localhost:3000/register?code=${result}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Verify Email</a>
    `
    );
     await Prom.create({
      email: req.body.email,
      username: req.body.username,
      code: result,
    });
    res.status(201).json({ message: "email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    require("../database");
    const prom = await Prom.findOne({ code: req.body.code });
    if (!prom) {
      return res.status(400).json({ message: "invalid verification link" });
    }
    // const isUser = await User.findOne({ email: prom.email });
    // if (isUser) {
    //   return res.status(400).json({ message: "user already exist" });
    // }

    res
      .status(200)
      .json({ data: prom, message: " congrat yoou verifed you email" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  try {
    require("../database");
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
     await Prom.deleteMany({ email: req.body.email });
    res.status(201).json({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};
module.exports = {
  sendEmail,
  verifyEmail,
  register,
};
