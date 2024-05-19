const express = require("express");

const router = express.Router();


router.post("/create" ,require('../controllers/quiz.controller').create)
router.get("/all" ,require('../controllers/quiz.controller').all)
router.delete("/delete/:id" , require('../controllers/quiz.controller').deleteQuiz)






module.exports = router;
