const Candidature = require("../models/candidature.model")


const create = async(req,res)=>{
    try {
        console.log(req.body)
        require("../database");
        const newCandidature = await Candidature.create(req.body)
        res.status(201).json(newCandidature)
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