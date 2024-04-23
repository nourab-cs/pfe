const express = require("express");

const router = express.Router();







router.get("/private", require("../middleware").checkAuth , require("../controllers/user.controller").private);



module.exports = router;
