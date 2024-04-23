// const mongoose = require("mongoose");

// const schema = new mongoose.Schema({
//     subject:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     tech:{
//         type:[String],
//         required:true
//     }, 
//         duration :{
//         type:Number,
//             required:true
//     },
//     places :{
//         type:Number,
//             required:true
// },

// });

//     const Offre = mongoose.model("Offre", schema);


// module.exports = Offre




const mongoose = require('mongoose');

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
     type: String,
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
});

const Offre = mongoose.model('Offre', schema);

module.exports = Offre;