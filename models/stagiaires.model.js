const mongoose = require('mongoose');

const stagiaireSchema = new mongoose.Schema({
 
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
 
  datedebut: {
    type: Date,
    required: true,
  },
  datefin: {
    type: Date,
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

const Stagiaire = mongoose.model('stagiaire', stagiaireSchema);

module.exports = stagiaire;
