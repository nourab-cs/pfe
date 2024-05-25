
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  lieu: {
    type: String,
    required: true,
  },
  dureeStage: {
    type: Number,
    required: true,
  },
  nombreStagiaires: {
    type: Number,
    required: true,
  },
  dateLimite: {
    type: Date,
    required: true,
  },
  profil: {
    type: String,
    required: true,
  },
  mission: {
    type: [String],
    required: true,
  },
  competences: {
    type: [String],
    required: true,
  },
  domaine: {
    type: String,
    required: true,
  },
  quizzes_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  }],
});

const Offre = mongoose.model("Offre", schema);

module.exports = Offre;
