const express = require("express");

const router = express.Router();


router.post("/create" ,require('../controllers/candidature.controller').create)
router.get("/candidate-per-offre/:id" ,require('../controllers/candidature.controller').offre_candidates)

router.put("/score/:id" ,require('../controllers/candidature.controller').score)


router.get("/all" ,require('../controllers/candidature.controller').all)

router.post("/set-candidature" ,require('../controllers/candidature.controller').setCandidature)

router.post("/get-candidates-by-email" ,require('../controllers/candidature.controller').GetCandiaturePerUser)

router.get("/get-one/:id" , require('../controllers/candidature.controller').GetOne)




module.exports = router;
