const Candidature = require("../models/candidature.model")

const cloudinary = require("cloudinary").v2;



const create = async(req,res)=>{
    try {
        require("../database");
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_KEY,
            api_secret: process.env.CLOUD_SECRET,
            secure: true,
          });

          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              req.body.data.cv,
              { folder: "cvs", resource_type: "auto" },
              function (error, result) {
                if (error) {
                  console.log(error);
                  reject(error);
                }
                resolve(result);
              }
            );
          });
        const newCandidature = await Candidature.create(req.body.data)
        console.log(req.body)
        res.status(201).json({result:true})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const   offre_candidates = async(req,res)=>{
    try {
        require("../database");
        const newCandidature = await Candidature.find({offre_id:req.params.id})
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