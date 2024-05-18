const express = require("express");

const router = express.Router();




router.post("/create" ,require('../controllers/stagiaire.controller').create)


router.get("/all" , require('../controllers/stagiaire.controller').all)


router.get("/get-one" , require('../controllers/stagiaire.controller').GetOne)

router.delete("/delete/:id" , require('../controllers/stagiaire.controller').deleteStagiaire)


module.exports = router;
