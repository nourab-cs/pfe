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
    let candidature = {

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

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        req.body.data.cv,
        { folder: "cvs", resource_type: "auto" },
        async function (error, result) {
          if (error) {
            console.log(error);
            reject(error);
            return res.status(500).json({ error: error })

          }
          console.log(result)
          candidature.cv = result.secure_url
          resolve(result);
          const newCandidature = await Candidature.create(candidature)
          return res.status(201).json(newCandidature)
        }
      );
    });
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
const score = async (req, res) => {
  try {
    require("../database");
    console.log(req.body)
    if (req.body.score < 50) {
      await Candidature.findByIdAndDelete(req.params.id)

      return res.status(200).json({ message: "Failed" })

    }
    const newCandidature = await Candidature.findByIdAndUpdate(req.params.id, { quiz_score: req.body.score }, { new: true })
    res.status(201).json({ newCandidature, message: "succeded" })
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}


const all = async (req, res) => {
  try {
    require("../database");

    const Candidatures = await Candidature.find()
    res.status(201).json({ Candidatures })
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}


const setCandidature = async (req, res) => {
  try {
    require("../database");

    const candidature = await Candidature.findByIdAndUpdate(req.body.id, { is_accepted: req.body.Status, interview: req.body.date }, { new: true })
    return res.status(201).json({ candidature })

  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}



const GetCandiaturePerUser = async (req, res) => {
  try {
    require("../database");
    const data = await Candidature.find({ email: req.body.email })
    console.log(data);
    res.status(201).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

const GetOne = async (req, res) => {
  try {
    require("../database");

    const candidature = await Candidature.findById(req.params.id)
    res.status(201).json(candidature)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}



module.exports = {
  create,
  offre_candidates, score, all, setCandidature, GetCandiaturePerUser, GetOne
}