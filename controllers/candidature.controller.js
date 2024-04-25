const Candidature = require("../models/candidature.model")

const cloudinary = require("cloudinary").v2;



const create = async (req, res) => {
  try {
    require("../database");
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
      secure: true,
    });
    let candidtature = {

      qualite: req.body.data.qualite,
      cin: req.body.data.cin,
      nom: req.body.data.nom,
      prénom: req.body.data.prénom,
      datedenaissance: req.body.data.datedenaissance,
      sexe: req.body.data.sexe,
      telephone: req.body.data.telephone,
      region: req.body.data.region,
      email: req.body.data.email,
      diplome: req.body.data.diplome,
      universite: req.body.data.universite,
      domaine: req.body.data.domaine,
      offre_id: req.body.data.offer_id

    }
    console.log(candidtature);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        req.body.data.cv,
        { folder: "cvs", resource_type: "raw" },
        function (error, result) {
          if (error) {
            console.log(error);
            reject(error);
          }
          console.log(result)
          candidtature.cv = result.secure_url
          resolve(result);
        }
      );
    });
    const newCandidature = await Candidature.create(candidtature)
    res.status(201).json(newCandidature)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}
const offre_candidates = async (req, res) => {
  try {
    require("../database");
    const newCandidature = await Candidature.find({ offre_id: req.params.id })
    res.status(201).json(newCandidature)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}


module.exports = {
  create,
  offre_candidates
}