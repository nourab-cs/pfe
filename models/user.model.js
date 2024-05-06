const mongoose = require("mongoose");

const schema =  new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    resetPasswordToken: String, // Champ pour le token de réinitialisation
    resetPasswordExpires: Date, // Champ pour la date d'expiration du token
    role: {
      type: String,
      required: true,
      default: "user",
    },
    avatar: {
      url: String,
      public_id: String,
    },
  });
const User = mongoose.model("User", schema);


module.exports = User
 