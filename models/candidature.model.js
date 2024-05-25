const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
  qualite: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prénom: {
    type: String,
    required: true,
  },
  sexe: {
    type: String,
    required: true,
  },
  datedenaissance: {
    type: Date,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  diplome: {
    type: String,
    required: true,
  },
  universite: {
    type: String,
    required: true,
  },
  domaine: {
    type: String,
    required: true,
  },
  cv: {
    type: String, // Adding cv field as String
    required: true,
  },
  offre_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offre'
  },
  is_accepted : {
    type: String,
    required: false ,
    default : ""

  },
  quiz_score:{
    type: Number,
    default: -1

  },
  interview : Date
});

const Candidature = mongoose.model('Candidature', candidatureSchema);

module.exports = Candidature;
