const express = require("express");

const router = express.Router();


router.post("/create" ,require('../controllers/candidature.controller').create)
router.get("/candidate-per-offre/:id" ,require('../controllers/candidature.controller').offre_candidates)




module.exports = router;
