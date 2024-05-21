const mongoose = require('mongoose');

const stagiaireSchema = new mongoose.Schema({
 
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  universite: { type: String, required: true },
  specialite: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  
});

const stagiaire = mongoose.model('stagiaire', stagiaireSchema);

module.exports = stagiaire;
