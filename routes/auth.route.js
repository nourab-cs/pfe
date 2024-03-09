const express = require("express");

const router = express.Router();

router.post(
  "/send-email",
  require("../controllers/auth.controller").sendEmail
);
router.post(
  "/verify-email",
  require("../controllers/auth.controller").verifyEmail
);

router.post(
  "/register",
  require("../controllers/auth.controller").register
);




module.exports = router;
