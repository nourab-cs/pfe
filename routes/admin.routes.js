const express = require("express");

const router = express.Router();


router.get("/private-admin",   require("../controllers/admin.controller").privateAdmin);

router.get("/all-users", require("../controllers/admin.controller").allUsers);
router.post("/assign-role", require("../controllers/admin.controller").assignRole);


module.exports = router;
