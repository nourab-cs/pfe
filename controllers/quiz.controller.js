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

const deleteQuiz =  async(req,res)=>{
    try {
        require("../database");
      const deleted = await Quiz.findByIdAndDelete(req.params.id)
        res.status(201).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const updateQuestions = async (req, res) => {
    try {
        require("../database");
        const { quizId } = req.params;
        const { questions } = req.body;
        
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            quizId,
            { questions },
            { new: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(200).json(updatedQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { create, all, deleteQuiz ,updateQuestions }