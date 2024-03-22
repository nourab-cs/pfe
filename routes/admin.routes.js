const express = require("express");

const router = express.Router();


router.get("/private-admin",   require("../controllers/admin.controller").privateAdmin);

router.get("/all-users", require("../controllers/admin.controller").allUsers);


module.exports = router;
