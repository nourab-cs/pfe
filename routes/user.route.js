const express = require("express");

const router = express.Router();






router.post("/create" ,require('../controllers/profil.controller').create)
router.get("/getprofil" ,require('../controllers/profil.controller').getprofil)

router.get("/private", require("../middleware").checkAuth , require("../controllers/user.controller").private);



module.exports = router;
