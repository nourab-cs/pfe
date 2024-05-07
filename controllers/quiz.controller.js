const Quiz = require("../models/quiz.model")



const create  = async (req,res)=>{
    try {
        require("../database")
        const created = await Quiz.create(req.body)
        res.status(200).json(created)
        
    } catch (error) {
        
        res.status(500).json(error)

    }
}



module.exports = {create}