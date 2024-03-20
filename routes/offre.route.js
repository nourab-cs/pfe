const express = require("express");

const router = express.Router();


router.post("/create" ,require('../controllers/offre.controller').create)


router.get("/all" , require('../controllers/offre.controller').all)




module.exports = router;
