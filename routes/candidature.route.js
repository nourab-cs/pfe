const express = require("express");

const router = express.Router();


router.post("/create" ,require('../controllers/candidature.controller').create)




module.exports = router;
