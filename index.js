const express = require("express");
const app = express();
const cookie = require("cookie-parser");



const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:4173", credentials: true }));

// setting up the express to send and recive json data
app.use(express.json({ limit: "50mb" }));
app.use(cookie());

const auth = require("./routes/auth.route");
const user = require("./routes/user.route");
const offre = require("./routes/offre.route");

const candidature = require("./routes/candidature.route");


const admin = require("./routes/admin.routes");

app.use(auth);
app.use(user);
app.use("/offre", offre);



const quiz = require("./routes/quiz.routes")

app.use("/quiz", quiz)
app.use("/postuler", candidature);


app.use("/admin", require("./middleware").checkAuth, require("./middleware").checkAdmin, admin);

// /api route

// runing
app.listen(3000, () => {
  console.log("server listening on port 3000");
});

// app.post('/forgot-password', (req, res) => {
//   const { email } = req.body;
//   User.findOne({ email: email })
//     .then(user => {
//       if (!user) {
//         return res.send({ Status: "User not existed" })
//       }
//       const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" })
//       var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'youremail@gmail.com',
//           pass: 'your password'
//         }
//       });

//       var mailOptions = {
//         from: 'youremail@gmail.com',
//         to: 'user email@gmail.com',
//         subject: 'Reset Password Link',
//         text: `http://localhost:5173/reset_password/${user._id}/${token}`
//       };

//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           return res.send({ Status: "Success" })
//         }
//       });
//     })
// })
// app.post('/reset-password/:id/:token', (req, res) => {
//   const { id, token } = req.params
//   const { password } = req.body

//   jwt.verify(token, "jwt_secret_key", (err, decoded) => {
//     if (err) {
//       return res.json({ Status: "Error with token" })
//     } else {
//       bcrypt.hash(password, 10)
//         .then(hash => {
//           User.findByIdAndUpdate({ _id: id }, { password: hash })
//             .then(u => res.send({ Status: "Success" }))
//             .catch(err => res.send({ Status: err }))
//         })
//         .catch(err => res.send({ Status: err }))
//     }
//   })
// })