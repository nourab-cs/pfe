const express = require("express");

const router = express.Router();


router.post("/create" ,require('../controllers/quiz.controller').create)
router.get("/all" ,require('../controllers/quiz.controller').all)






module.exports = router;
