const express = require("express");

const router = express.Router();


router.post("/create" ,require('../controllers/offre.controller').create)


router.get("/all" , require('../controllers/offre.controller').all)


router.get("/get-one" , require('../controllers/offre.controller').GetOne)


module.exports = router;
