const express = require("express");

const router = express.Router();







router.get("/private", require("../middleware").checkAuth , require("../controllers/user.controller").private);
router.put("/update", require("../middleware").checkAuth , require("../controllers/user.controller").updateProfile);



module.exports = router;
