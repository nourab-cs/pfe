const Stagiaire = require("../models/stagiaire.model")


const create = async(req,res)=>{
    try {
        console.log(req.body)
        require("../database");
        const newStagiaire = await Stagiaire.create(req.body)
        res.status(201).json(newStagiaire)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}



const all =  async(req,res)=>{
    try {
        require("../database");

        const all = await Stagiaire.find()
        res.status(201).json(all)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const GetOne =  async(req,res)=>{
    try {
        require("../database");

        const stagiaire = await Stagiaire.findById(req.query.id)
        res.status(201).json(stagiaire)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const deleteStagiaire =  async(req,res)=>{
    try {
        require("../database");
      const deleted = await Stagiaire.findByIdAndDelete(req.params.id)
        res.status(201).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


module.exports = {
    all,create,GetOne,deleteStagiaire
}