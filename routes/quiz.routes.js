const express = require("express");

const router = express.Router();


router.post("/create" ,require('../controllers/quiz.controller').create)





module.exports = router;
