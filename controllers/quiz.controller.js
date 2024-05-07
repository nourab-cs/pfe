const Quiz = require("../models/quiz.model")



const create = async (req, res) => {
    try {
        require("../database")
        const created = await Quiz.create(req.body)
        res.status(201).json(created)

    } catch (error) {

        res.status(500).json(error)

    }
}


const all = async (req, res) => {
    try {
        require("../database")
        const list = await Quiz.find()
        res.status(200).json(list)

    } catch (error) {

        res.status(500).json(error)

    }
}




module.exports = { create, all }