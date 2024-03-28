const User = require("../models/user.model");
const Prom = require("../models/promise.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      .json(prom);
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

const login = async (req, res) => {
  try {
    require("../database");
    const isUser = await User.findOne({ email: req.body.email });
    if (!isUser) {
      return res.status(400).json({ message: "user not found" });
    }
    const match = await bcrypt.compare(req.body.password, isUser.password);
    if (!match) {
      return res.status(401).json({ message: "wrong password" });
    }
    const exp = Date.now() + 1000 * 60 * 60;
    const token = jwt.sign(
      { id: isUser._id, exp, role: isUser.role },
      process.env.SECRET_KEY
    );
    res
      .cookie("Authorization", token)
      .status(200)
      .json({
        user: {
          email: isUser.email,
          username: isUser.username,
          _id: isUser._id,
          role: isUser.role,
          avatar: isUser.avatar || null,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.status(200).json({ message: "logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const oauth = async (req, res) => {
  try {
    const {google} = require('googleapis');
console.log(req);

           const oauth2Client = new google.auth.OAuth2(
     process.env.GOOGLE_ID,
     process.env.GOOGLE_SECRET,
     process.env.GOOGLE_REDIRECT
    );
    
  
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile"
    ];
    


    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',


      scope: scopes,


      include_granted_scopes: true
    });
    res.status(200).json({ authorizationUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
}

const forgotPassword  = async (req, res) => {
  {/*const {email} = req.body;
  
 const user=await UserModel.findOne({email: email})
  console.log(user);
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'youremail@gmail.com',
            pass: 'your password'
          }
        });
        
        var mailOptions = {
          from: 'youremail@gmail.com',
          to: 'user email@gmail.com',
          subject: 'Reset Password Link',
          text: `http://localhost:5173/reset_password/${user._id}/${token}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });*/}

  
};

const resetPassword = async(req, res) => {
  // const {id, token} = req.params
  // const {password} = req.body

  // jwt.verify(token, "jwt_secret_key", (err, decoded) => {
  //     if(err) {
  //         return res.json({Status: "Error with token"})
  //     } else {
  //         bcrypt.hash(password, 10)
  //         .then(hash => {
  //             UserModel.findByIdAndUpdate({_id: id}, {password: hash})
  //             .then(u => res.send({Status: "Success"}))
  //             .catch(err => res.send({Status: err}))
  //         })
  //         .catch(err => res.send({Status: err}))
  //     }
  // })
};

module.exports = {
  sendEmail,
  verifyEmail,
  register,
  login,
  logout,
  oauth,
  forgotPassword,
  resetPassword,
 
};
