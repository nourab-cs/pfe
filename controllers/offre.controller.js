const Offre = require("../models/offre.model")


const create = async(req,res)=>{
    try {
        console.log(req.body)
        require("../database");
        const newOffre = await Offre.create(req.body)
        res.status(201).json(newOffre)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}



const all =  async(req,res)=>{
    try {
        require("../database");

        const all = await Offre.find()
        res.status(201).json(all)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const GetOne =  async(req,res)=>{
    try {
        require("../database");

        const offre = await Offre.findById(req.query.id)
        res.status(201).json(offre)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


module.exports = {
    all,create,GetOne,
}