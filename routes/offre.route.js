const express = require("express");

const router = express.Router();


router.post("/create" , async(req,res)=>{
    try {
        const Offre = require("../models/offre.model")


        const newOffre = await Offre.create(req.body)
        res.status(201).json(newOffre)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;
