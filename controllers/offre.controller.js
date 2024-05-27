const Offre = require("../models/offre.model");

const Candidature = require("../models/candidature.model");

const create = async (req, res) => {
  try {
    console.log(req.body);
    require("../database");
    const newOffre = await Offre.create(req.body);
    res.status(201).json(newOffre);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const all = async (req, res) => {
  try {
    require("../database");
    const all = await Offre.find({ quizzes_id: { $exists: true, $ne: [] } });
    res.status(201).json(all);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const GetOne = async (req, res) => {
  try {
    require("../database");

    const offre = await Offre.findById(req.query.id);
    res.status(201).json(offre);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const GetOffreQuizzes = async (req, res) => {
  try {
    require("../database");

    const offre = await Offre.findById(req.query.id);
    console.log(offre);
    const Quiz = require("../models/quiz.model");
    const found = await Quiz.find({ _id: { $in: offre.quizzes_id } });
    res.status(201).json(found);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
/// changé

const addQuiz = async (req, res) => {
  try {
    require("../database");

    const { offre_id } = req.params; // Utilisation de req.params.offre_id pour récupérer l'ID de l'offre depuis l'URL
    console.log(offre_id);
    const { quiz_ids } = req.body; // Tableau d'IDs de quiz à ajouter
    // Vérifier si l'offre existe
    const offre = await Offre.findById(offre_id);
    if (!offre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    // Ajouter les nouveaux quiz à l'offre
    offre.quizzes_id.push(...quiz_ids); // Modification ici pour utiliser le champ quizzes_id
    const updatedOffre = await offre.save();
    const Quiz = require("../models/quiz.model");
    const found = await Quiz.updateMany(
      { _id: { $in: offre.quizzes_id } },
      { $push: { offres_id:offre_id } }
    );

    res.status(201).json(found);
  } catch (error) {
    console.error("Error adding quizzes to offer:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'ajout des quiz à l'offre" });
  }
};

const getQuizOffre = async (req, res) => {
  try {
    require("../database");
    const Quiz = require("../models/quiz.model");
    console.log(req.query);
    const quiz = await Quiz.find({ offres_id: { $in: req.query.id } });

    console.log(quiz);
    res.status(201).json(quiz);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
/// changé
// const getQuizOffre = async (req, res) => {
//     try {
//         require("../database");
//         const Offre = require("../models/offre.model");

//         // Récupérer l'ID de l'offre à partir des paramètres de requête
//         const offreId = req.query.id;

//         // Rechercher l'offre par son ID
//         const offre = await Offre.findById(offreId).populate('quizzes_id');

//         // Vérifier si l'offre existe
//         if (!offre) {
//             return res.status(404).json({ message: "Offre non trouvée" });
//         }

//         // Extraire les quizzes associés à l'offre
//         const quizzes = offre.quizzes_id;

//         res.status(200).json({ quizzes });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// }

// suppression d'une offre et de tous les candidatures qui lui a associé
const deleteOffre = async (req, res) => {
  try {
    // Recherche de l'offre à supprimer
    const offre = await Offre.findById(req.params.id);
    if (!offre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    // Recherche et suppression des candidatures associées à cette offre
    await Candidature.deleteMany({ offre_id: req.params.id });

    // Suppression de l'offre
    const deleted = await Offre.findByIdAndDelete(req.params.id);
    res.status(201).json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateOffre = async (req, res) => {
  try {
    require("../database");
    const offre = await Offre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!offre) {
      return res.status(404).json({ message: "Offre introuvable" });
    }
    const updated = await Offre.findById(req.params.id);
    res.status(201).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  all,
  create,
  GetOne,
  addQuiz,
  getQuizOffre,
  deleteOffre,
  updateOffre,
  GetOffreQuizzes,
};
