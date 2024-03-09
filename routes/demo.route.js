const express = require("express");

const router = express.Router();

router.post(
  "/create",
  require("../controllers/demo.controller").myControllerFunction
);

router.get("/two", (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

module.exports = router;
