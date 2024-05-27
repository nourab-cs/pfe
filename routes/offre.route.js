const express = require("express");

const router = express.Router();


router.post("/create" ,require('../controllers/offre.controller').create)


router.get("/all" , require('../controllers/offre.controller').all)
router.get("/get-one" , require('../controllers/offre.controller').GetOne)
router.put("/add-quiz/:offre_id" , require('../controllers/offre.controller').addQuiz)
router.get("/get-quiz" , require('../controllers/offre.controller').getQuizOffre)
router.delete("/delete/:id" , require('../controllers/offre.controller').deleteOffre)
router.put("/update/:id", require('../controllers/offre.controller').updateOffre);

router.get("/get-offre-quizzes" , require('../controllers/offre.controller').GetOffreQuizzes)




module.exports = router;
