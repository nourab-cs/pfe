const express = require("express");

const router = express.Router();

router.post("/send-email", require("../controllers/auth.controller").sendEmail);
router.post(
  "/verify-email",
  require("../controllers/auth.controller").verifyEmail
);

router.post("/register", require("../controllers/auth.controller").register);

router.post("/login", require("../controllers/auth.controller").login);
router.get("/logout", require("../controllers/auth.controller").logout);
router.get("/oauth", require("../controllers/auth.controller").oauth);
router.get("/code", require("../controllers/auth.controller").code);



module.exports = router;
