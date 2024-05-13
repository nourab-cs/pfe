const mongoose = require('mongoose');

const profilSchema = new mongoose.Schema({
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
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: false },

  
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
 
});

const Profil = mongoose.model('Profil', profilSchema);

module.exports = Profil;
