const Profil = require("../models/profil.model");

const cloudinary = require("cloudinary").v2;

const create = async (req, res) => {
  try {
    console.log(req.body);
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
      secure: true,
    });
    let profil = {
      qualite: req.body.data.qualite,
      cin: req.body.data.cin,
      nom: req.body.data.nom,
      prénom: req.body.data.prénom,
      password: req.body.data.password,
      username: req.body.data.username,
      datedenaissance: req.body.data.datedenaissance,
      sexe: req.body.data.sexe,
      telephone: req.body.data.telephone,
      region: req.body.data.region,
      email: req.body.data.email,
      diplome: req.body.data.diplome,
      universite: req.body.data.universite,
      domaine: req.body.data.domaine,
    };
    require("../database");
    const isProfile = await Profil.findOne({ email: req.body.search });
    console.log(isProfile)
    if (!isProfile) {
      await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          req.body.data.cv,
          { folder: "cvs", resource_type: "auto" },
          function (error, result) {
            if (error) {
              console.log(error);
              reject(error);
            }
            console.log(result);
            profil.cv = result.secure_url;
            resolve(result);
          }
        );
      });
      const newProfil = await Profil.create(profil);
      return res.status(201).json(newProfil);
    }
    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        req.body.data.cv,
        { folder: "cvs", resource_type: "auto" },
        function (error, result) {
          if (error) {
            console.log(error);
            reject(error);
          }
          console.log(result);
          profil.cv = result.secure_url;
          resolve(result);
        }
      );
    });
    const updated = await Profil.findOneAndUpdate(
      { email: req.body.search },
      profil
    );

    res.status(201).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};






const getprofil = async (req, res) => {
 try{
  require ("../database");
  const Profile = await Profil.findOne({ email: req.body.search });
  console.log(Profile)
  return res.status(201).json(getprofil);


}
   catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = {
  create,getprofil
};
